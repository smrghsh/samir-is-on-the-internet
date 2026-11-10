import * as THREE from 'three'

// Classic domain warping (Inigo Quilez's fbm-of-fbm) as a fullscreen fragment
// shader — ported from the "Domain warp" channel of anything-can-happen
// (web/channels/04-three-domain-warp.js). Same construction: q -> r -> o,
// colour = (o, r.y, 1). The constants that were baked into that sketch are
// uniforms here, driven by the "open me!" lil-gui panel (top right).

const frag = /* glsl */ `
  precision highp float;
  uniform float uTime; uniform vec2 uRes;
  uniform float uOct;        // active octaves, fractional = fading the next one in
  uniform float uScale;      // feature size (1 = one noise cell per viewport height)
  uniform float uWarp;       // how far each layer displaces the next
  uniform float uContrast;
  uniform float uBrightness;
  uniform vec2 uOffset;      // where in the noise field we look (0 for the backdrop, random for the favicon)
  // Dave Hoskins' hash, no trig, stays stable in 16/24-bit float
  vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx + p3.yz) * p3.zy);
  }
  // 2D gradient noise in 0..1 with a quintic fade
  float gnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    float a = dot(hash22(i) * 2.0 - 1.0, f);
    float b = dot(hash22(i + vec2(1, 0)) * 2.0 - 1.0, f - vec2(1, 0));
    float c = dot(hash22(i + vec2(0, 1)) * 2.0 - 1.0, f - vec2(0, 1));
    float d = dot(hash22(i + vec2(1, 1)) * 2.0 - 1.0, f - vec2(1, 1));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 0.5 + 0.5;
  }
  // up to 5 octaves (uOct), then a contrast stretch: summed gradient noise hugs 0.5
  float noise(vec2 p) {
    float v = 0.0, amp = 0.5, tot = 0.0;
    for (int o = 0; o < 5; o++) {
      float w = clamp(uOct - float(o), 0.0, 1.0);
      v += amp * w * gnoise(p); tot += amp * w; p *= 2.0; amp *= 0.5;
    }
    return clamp((v / max(tot, 1e-4) - 0.5) * uContrast + 0.5, 0.0, 1.0);
  }
  void main() {
    vec2 p = gl_FragCoord.xy / uRes.y * uScale + uOffset;
    float t = uTime;                           // ms, wrapped on the CPU so it stays small
    vec2 q = vec2(noise(p + t * 0.00001), noise(p + vec2(5.2, 1.3) + t * 0.0001));
    vec2 r = vec2(noise(p + uWarp * q + vec2(1.7, 9.2)), noise(p + uWarp * q + vec2(8.3, 2.8)));   // the sketch's "- 0.00001 * t" drift on r.y is dropped: the green holds
    float o = noise(p + uWarp * r);
    gl_FragColor = vec4(vec3(o, r.y, 1.0) * uBrightness, 1.0);
  }`
const vert = /* glsl */ `void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`

// the sketch's 12-minute complexity cycle: 1 octave, +1 per minute up to 5,
// hold 3 minutes, -1 per minute back to 1, hold a minute, repeat
const cycleOctaves = (ms) => {
  const m = (ms / 60000) % 12
  return m < 4 ? 1 + m : m < 7 ? 5 : m < 11 ? 5 - (m - 7) : 1
}

export default class DomainWarp {
  constructor(canvas) {
    this.canvas = canvas
    this.params = {
      speed: 0.2,            // the sketch runs at 1; slowed to a drift behind the text
      scale: 1,
      warp: 4,
      octaves: 5,
      cycleOctaves: false,   // the sketch's slow 1→5→1 ramp instead of a fixed count
      contrast: 2.4,
      brightness: 0.55,      // the raw sketch is 1.0 — dimmed so white text reads over it
    }

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(1)
    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const o = this.params
    this.material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(1, 1) },
        uOct: { value: o.octaves },
        uScale: { value: o.scale },
        uWarp: { value: o.warp },
        uContrast: { value: o.contrast },
        uBrightness: { value: o.brightness },
        uOffset: { value: new THREE.Vector2(0, 0) },
      },
      depthTest: false,
      depthWrite: false,
    })
    this.geometry = new THREE.PlaneGeometry(2, 2)
    this.scene.add(new THREE.Mesh(this.geometry, this.material))

    this.resize = () => {
      const k = 0.5   // half of CSS pixels; the warp is soft, the stretch is invisible
      const w = Math.max(2, Math.round(window.innerWidth * k))
      const h = Math.max(2, Math.round(window.innerHeight * k))
      this.renderer.setSize(w, h, false)   // false: CSS size stays .topo-bg's 100vw × 100vh
      this.material.uniforms.uRes.value.set(w, h)
    }
    this.setFavicon()   // before the first backdrop frame; it borrows the canvas
    this.resize()
    window.addEventListener('resize', this.resize)

    this.t = 0          // warp time (ms), scaled by speed
    this.wall = 0       // unscaled elapsed ms, for the octave cycle
    let last = performance.now()
    this.renderer.setAnimationLoop(() => {
      const now = performance.now()
      const dt = Math.min(now - last, 100)   // don't leap after a backgrounded tab
      last = now
      const u = this.material.uniforms
      this.t = (this.t + dt * this.params.speed) % 6.0e6   // the slowest term wraps every 100 minutes
      this.wall += dt
      u.uTime.value = this.t
      u.uOct.value = this.params.cycleOctaves ? cycleOctaves(this.wall) : this.params.octaves
      this.renderer.render(this.scene, this.camera)
    })

    this.initGui()
  }

  // Every tab gets its own favicon: one 64px frame of the warp at a random spot
  // in the noise field, zoomed in and at full brightness so it reads at 16px.
  // Rendered synchronously on the backdrop canvas (nothing is presented in
  // between), then the uniforms go back. public/favicon.ico is the no-JS fallback.
  setFavicon() {
    const u = this.material.uniforms
    const o = this.params
    const N = 64
    this.renderer.setSize(N, N, false)
    u.uRes.value.set(N, N)
    u.uScale.value = 0.5
    u.uBrightness.value = 1
    u.uOffset.value.set(Math.random() * 50, Math.random() * 50)
    this.renderer.render(this.scene, this.camera)
    let url = null
    try { url = this.canvas.toDataURL('image/png') } catch { /* keep the static icon */ }
    u.uScale.value = o.scale
    u.uBrightness.value = o.brightness
    u.uOffset.value.set(0, 0)
    if (!url) return

    document.querySelectorAll('link[rel~="icon"]').forEach((l) => l.remove())
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/png'
    link.href = url
    document.head.appendChild(link)
  }

  // lil-gui is dynamic-imported so it never runs during SSR. It auto-places
  // itself top right; z-index/width are set in site.css.
  async initGui() {
    const { default: GUI } = await import('lil-gui')
    if (this.destroyed) return
    const p = this.params
    const u = this.material.uniforms
    const gui = new GUI({ title: 'open me!' })
    this.gui = gui

    const speed = gui.add(p, 'speed', 0, 8, 0.05)
    const scale = gui.add(p, 'scale', 0.2, 4, 0.01).onChange((v) => { u.uScale.value = v })
    const warp = gui.add(p, 'warp', 0, 10, 0.05).onChange((v) => { u.uWarp.value = v })
    const oct = gui.add(p, 'octaves', 1, 5, 0.05)
    gui.add(p, 'cycleOctaves').name('cycle octaves (12 min)').onChange((v) => oct.enable(!v))
    const contrast = gui.add(p, 'contrast', 0.5, 5, 0.05).onChange((v) => { u.uContrast.value = v })
    gui.add(p, 'brightness', 0, 1, 0.01).onChange((v) => { u.uBrightness.value = v })

    // randomize the look (not brightness — that one is about text legibility);
    // setValue fires each onChange and refreshes the sliders
    const rnd = (lo, hi) => lo + Math.random() * (hi - lo)
    const randomize = () => {
      speed.setValue(rnd(0.3, 3))
      scale.setValue(rnd(0.4, 2.5))
      warp.setValue(rnd(1.5, 8))
      oct.setValue(rnd(2, 5))
      contrast.setValue(rnd(1.5, 3.5))
    }
    gui.add({ randomize }, 'randomize')
    gui.add({ reset: () => gui.reset() }, 'reset')

    // Boot collapsed: just the "open me!" title bar shows (that's the joke).
    gui.close()
  }

  destroy() {
    this.destroyed = true
    window.removeEventListener('resize', this.resize)
    this.renderer.setAnimationLoop(null)
    this.gui?.destroy()
    this.geometry.dispose()
    this.material.dispose()
    this.renderer.dispose()
  }
}
