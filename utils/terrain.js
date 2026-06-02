// terrain.js — configurable port of Samir's topo.vue shader.
// Same FBM + ridge-noise heightfield and contour/index-line math as the live
// site, but wrapped so each redesign direction can give it its own palette,
// camera, scroll behavior, and live (lil-gui) parameters.

import * as THREE from 'three'

// ---- Palette presets ---------------------------------------------------
// Each palette: bg + 5 elevation colors (c0 low → c4 high) + line colors.
export const PALETTES = {
  // The live site's dark — black sky, teal valleys, green ridgelines.
  darkClassic: {
    bg: '#000000',
    c0: '#0a1018', c1: '#102634', c2: '#1b4d5b', c3: '#3a8a78', c4: '#7fd49a',
    line: '#5fd49a', indexLine: '#9be8b8',
  },
  // The live site's light — warm paper, sage valleys, deep-green ridges.
  lightClassic: {
    bg: '#f5f3ee',
    c0: '#ece5d3', c1: '#d6cdb2', c2: '#bdc89b', c3: '#7eaa78', c4: '#2ea36a',
    line: '#2e7a4d', indexLine: '#1a4a30',
  },
  // Deep bathymetric — for the "data surface" coral/ocean section.
  darkAbyss: {
    bg: '#03070d',
    c0: '#04121f', c1: '#0a2b44', c2: '#114e6b', c3: '#1f86a6', c4: '#56d0d6',
    line: '#43b8c4', indexLine: '#8af0ee',
  },
  lightBathy: {
    bg: '#eef3f3',
    c0: '#d6e6e6', c1: '#b3d4d4', c2: '#88bcc2', c3: '#4f97a6', c4: '#2e6f86',
    line: '#2e6f86', indexLine: '#163f52',
  },
  // Wildfire — embered ridgelines for that section.
  darkEmber: {
    bg: '#0a0503',
    c0: '#160a06', c1: '#33150c', c2: '#5e2a14', c3: '#a85528', c4: '#f0a94d',
    line: '#e0894a', indexLine: '#ffd9a8',
  },
}

// ---- Shaders (verbatim terrain math from topo.vue) ---------------------
const vertexShader = /* glsl */ `
  varying vec3 vWorldPos;
  varying float vHeight;
  uniform float uAmp;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                              + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0),
                            dot(x12.xy, x12.xy),
                            dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float a = 0.5, f = 1.0, s = 0.0, n = 0.0;
    for (int i = 0; i < 6; i++) {
      s += a * snoise(p * f);
      n += a;
      a *= 0.5;
      f *= 2.03;
    }
    return s / n;
  }

  uniform float uSeed;
  float terrain(vec2 p) {
    p += uSeed;
    float base  = fbm(p * 0.18);
    float ridge = 1.0 - abs(fbm(p * 0.36));
    ridge = ridge * ridge;
    return base * 0.85 + (ridge - 0.55) * 0.40;
  }

  void main() {
    vec3 pos = position;
    float h = terrain(pos.xz) * uAmp;
    pos.y = h;
    vHeight = h;
    vec4 wp = modelMatrix * vec4(pos, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vWorldPos;
  varying float vHeight;

  uniform float uContourEvery;
  uniform float uIndexEvery;
  uniform float uLineWidth;
  uniform vec3  uLightDir;
  uniform vec3  uBg, uC0, uC1, uC2, uC3, uC4, uLine, uIndexLine;
  uniform float uFogNear, uFogFar;
  uniform float uShadeLow, uShadeHigh;
  uniform float uLineStrength;

  vec3 ramp(float t) {
    t = clamp(t, 0.0, 1.0);
    if (t < 0.25) return mix(uC0, uC1,  t        / 0.25);
    if (t < 0.50) return mix(uC1, uC2, (t - 0.25) / 0.25);
    if (t < 0.75) return mix(uC2, uC3, (t - 0.50) / 0.25);
    return            mix(uC3, uC4, (t - 0.75) / 0.25);
  }

  void main() {
    vec3 dpx = dFdx(vWorldPos);
    vec3 dpy = dFdy(vWorldPos);
    vec3 n = normalize(cross(dpy, dpx));

    float t = clamp(vHeight * 0.32 + 0.5, 0.0, 1.0);
    vec3 base = ramp(t);

    float lambert = clamp(dot(n, normalize(uLightDir)), 0.0, 1.0);
    base *= mix(uShadeLow, uShadeHigh, lambert);

    float hd = fwidth(vHeight) + 1e-5;

    float cMinor = abs(fract(vHeight / uContourEvery) - 0.5);
    float minorLine = 1.0 - smoothstep(0.0, uLineWidth * hd / uContourEvery, cMinor);

    float idxStep = uContourEvery * uIndexEvery;
    float cMajor = abs(fract(vHeight / idxStep) - 0.5);
    float majorLine = 1.0 - smoothstep(0.0, uLineWidth * 1.4 * hd / idxStep, cMajor);

    vec3 col = base;
    col = mix(col, uLine,      minorLine * 0.55 * uLineStrength);
    col = mix(col, uIndexLine, majorLine * 0.85 * uLineStrength);

    float d = length(vWorldPos - cameraPosition);
    float fogFactor = smoothstep(uFogNear, uFogFar, d);
    col = mix(col, uBg, fogFactor);

    gl_FragColor = vec4(col, 1.0);
  }
`

const lerp = (a, b, t) => a + (b - a) * t

export class TopoTerrain {
  constructor(canvas, opts = {}) {
    this.canvas = canvas
    this.opts = Object.assign({
      light: PALETTES.lightClassic,
      dark: PALETTES.darkClassic,
      // Optional second palette per mode that scroll lerps toward.
      lightBottom: null,
      darkBottom: null,
      isDark: false,
      camStart: { pos: [0, 6.2, 11], look: [0, 0.4, -2], fov: 34 },
      // Where the camera eases to at scroll = 1.
      camEnd: null,
      amp: 1.55,
      contourEvery: 0.18,
      indexEvery: 5.0,
      lineWidth: 1.05,
      lineStrength: 1.0,
      fog: [14, 38],
      seed: 0,
      parallax: 0.55,
    }, opts)

    this.isDark = this.opts.isDark
    this.scroll = 0
    this._initThree()
  }

  _pal() { return this.isDark ? this.opts.dark : this.opts.light }
  _palBottom() {
    return this.isDark
      ? (this.opts.darkBottom || this.opts.dark)
      : (this.opts.lightBottom || this.opts.light)
  }

  _initThree() {
    const o = this.opts
    // Size off the canvas's own box (it fills the large viewport via CSS), not
    // window.innerHeight — on iOS innerHeight is the SMALL height when the
    // toolbar shows, which left the terrain short of the bottom bar + stretched.
    const sizes = { w: this.canvas.clientWidth || window.innerWidth, h: this.canvas.clientHeight || window.innerHeight }
    const p = this._pal()

    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.w, sizes.h)
    this.renderer = renderer

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(p.bg)
    scene.fog = new THREE.Fog(p.bg, o.fog[0], o.fog[1])
    this.scene = scene

    const cs = o.camStart
    const camera = new THREE.PerspectiveCamera(cs.fov, sizes.w / sizes.h, 0.1, 200)
    camera.position.set(...cs.pos)
    camera.lookAt(...cs.look)
    this.camera = camera

    const SIZE = 44, SEG = 320
    const geometry = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG)
    geometry.rotateX(-Math.PI / 2)
    this.geometry = geometry

    const uniforms = {
      uAmp:          { value: o.amp },
      uContourEvery: { value: o.contourEvery },
      uIndexEvery:   { value: o.indexEvery },
      uLineWidth:    { value: o.lineWidth },
      uLineStrength: { value: o.lineStrength },
      uSeed:         { value: o.seed },
      uLightDir:     { value: new THREE.Vector3(0.55, 0.85, 0.3).normalize() },
      uShadeLow:     { value: this.isDark ? 0.55 : 0.70 },
      uShadeHigh:    { value: this.isDark ? 1.15 : 1.10 },
      uFogNear:      { value: o.fog[0] },
      uFogFar:       { value: o.fog[1] },
      uBg:        { value: new THREE.Color(p.bg) },
      uC0:        { value: new THREE.Color(p.c0) },
      uC1:        { value: new THREE.Color(p.c1) },
      uC2:        { value: new THREE.Color(p.c2) },
      uC3:        { value: new THREE.Color(p.c3) },
      uC4:        { value: new THREE.Color(p.c4) },
      uLine:      { value: new THREE.Color(p.line) },
      uIndexLine: { value: new THREE.Color(p.indexLine) },
    }
    this.uniforms = uniforms

    const material = new THREE.ShaderMaterial({
      uniforms, vertexShader, fragmentShader,
      extensions: { derivatives: true },
    })
    this.material = material
    scene.add(new THREE.Mesh(geometry, material))

    // camera easing state
    const cs2 = o.camStart
    this._cam = {
      baseX: cs2.pos[0], baseY: cs2.pos[1], baseZ: cs2.pos[2],
      lookX: cs2.look[0], lookY: cs2.look[1], lookZ: cs2.look[2],
      curX: cs2.pos[0], curY: cs2.pos[1],
      tgtX: cs2.pos[0], tgtY: cs2.pos[1],
    }

    this._bind()
    this._tick()
  }

  _applyPalette() {
    // Lerp top→bottom palette across scroll, in the current mode.
    const a = this._pal(), b = this._palBottom()
    const t = this.scroll
    const u = this.uniforms
    const mix = (k) => {
      const ca = new THREE.Color(a[k]), cb = new THREE.Color(b[k])
      return ca.lerp(cb, t)
    }
    u.uBg.value.copy(mix('bg'))
    u.uC0.value.copy(mix('c0'))
    u.uC1.value.copy(mix('c1'))
    u.uC2.value.copy(mix('c2'))
    u.uC3.value.copy(mix('c3'))
    u.uC4.value.copy(mix('c4'))
    u.uLine.value.copy(mix('line'))
    u.uIndexLine.value.copy(mix('indexLine'))
    u.uShadeLow.value  = this.isDark ? 0.55 : 0.70
    u.uShadeHigh.value = this.isDark ? 1.15 : 1.10
    this.scene.background.copy(u.uBg.value)
    if (this.scene.fog) this.scene.fog.color.copy(u.uBg.value)
  }

  setMode(isDark) { this.isDark = isDark; this._applyPalette() }

  // Live params for the lil-gui panel.
  setParams(partial = {}) {
    const u = this.uniforms
    if (partial.amp !== undefined) u.uAmp.value = partial.amp
    if (partial.contourEvery !== undefined) u.uContourEvery.value = partial.contourEvery
    if (partial.indexEvery !== undefined) u.uIndexEvery.value = partial.indexEvery
    if (partial.lineWidth !== undefined) u.uLineWidth.value = partial.lineWidth
    if (partial.lineStrength !== undefined) u.uLineStrength.value = partial.lineStrength
    if (partial.fogNear !== undefined) { u.uFogNear.value = partial.fogNear; this.scene.fog.near = partial.fogNear }
    if (partial.fogFar !== undefined) { u.uFogFar.value = partial.fogFar; this.scene.fog.far = partial.fogFar }
    if (partial.seed !== undefined) u.uSeed.value = partial.seed
  }

  getParams() {
    const u = this.uniforms
    return {
      amp: u.uAmp.value, contourEvery: u.uContourEvery.value,
      indexEvery: u.uIndexEvery.value, lineWidth: u.uLineWidth.value,
      lineStrength: u.uLineStrength.value,
      fogNear: u.uFogNear.value, fogFar: u.uFogFar.value, seed: u.uSeed.value,
    }
  }

  // progress 0..1 — drives camera ease + palette lerp.
  setScroll(progress) {
    this.scroll = Math.max(0, Math.min(1, progress))
    this._applyPalette()
  }

  _bind() {
    const o = this.opts
    this._onResize = () => {
      const w = this.canvas.clientWidth || window.innerWidth, h = this.canvas.clientHeight || window.innerHeight
      this.camera.aspect = w / h
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(w, h)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', this._onResize)

    this._onMove = (e) => {
      const mx = (e.clientX / window.innerWidth) * 2 - 1
      const my = (e.clientY / window.innerHeight) * 2 - 1
      this._cam.tgtX = this._cam.baseX - mx * o.parallax
      this._cam.tgtY = this._cam.baseY + my * (o.parallax * 0.6)
    }
    window.addEventListener('mousemove', this._onMove)
  }

  _tick() {
    const c = this._cam
    const o = this.opts
    const p = this.scroll
    // scroll-eased base position (subtle descent / push-in toward the ridges)
    const end = o.camEnd
    let baseY = c.baseY, baseZ = c.baseZ
    let lookY = c.lookY
    if (end) {
      baseY = lerp(c.baseY, end.pos[1], p)
      baseZ = lerp(c.baseZ, end.pos[2], p)
      lookY = lerp(c.lookY, end.look[1], p)
    } else {
      baseY = c.baseY - p * 3.0
      baseZ = c.baseZ - p * 3.5
      lookY = c.lookY - p * 0.5
    }
    // parallax offsets (relative to the un-scrolled base)
    const offX = c.tgtX - c.baseX
    const offY = c.tgtY - c.baseY
    const desiredX = c.baseX + offX
    const desiredY = baseY + offY
    c.curX += (desiredX - c.curX) * 0.05
    c.curY += (desiredY - c.curY) * 0.05
    this.camera.position.set(c.curX, c.curY, baseZ)
    this.camera.lookAt(c.lookX, lookY, c.lookZ)
    this.renderer.render(this.scene, this.camera)
    this._raf = requestAnimationFrame(() => this._tick())
  }

  dispose() {
    cancelAnimationFrame(this._raf)
    window.removeEventListener('resize', this._onResize)
    window.removeEventListener('mousemove', this._onMove)
    this.geometry.dispose()
    this.material.dispose()
    this.renderer.dispose()
  }
}
