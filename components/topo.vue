<script>
import * as THREE from 'three'

const PALETTE_DARK = {
  bg: '#000000',
  c0: '#0a1018', c1: '#102634', c2: '#1b4d5b', c3: '#3a8a78', c4: '#7fd49a',
  line: '#5fd49a', indexLine: '#9be8b8',
}
const PALETTE_LIGHT = {
  bg: '#f5f3ee',
  c0: '#ece5d3', c1: '#d6cdb2', c2: '#bdc89b', c3: '#7eaa78', c4: '#2ea36a',
  line: '#2e7a4d', indexLine: '#1a4a30',
}

const vertexShader = /* glsl */ `
  varying vec3 vWorldPos;
  varying float vHeight;
  uniform float uAmp;

  // simplex 2D — Ashima / Ian McEwan
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

  float terrain(vec2 p) {
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
    col = mix(col, uLine,      minorLine * 0.55);
    col = mix(col, uIndexLine, majorLine * 0.85);

    float d = length(vWorldPos - cameraPosition);
    float fogFactor = smoothstep(uFogNear, uFogFar, d);
    col = mix(col, uBg, fogFactor);

    gl_FragColor = vec4(col, 1.0);
  }
`

export default {
  mounted() {
    const canvas = this.$refs.canvas
    const sizes = { w: window.innerWidth, h: window.innerHeight }

    const getDark = () => {
      const stored = window.localStorage.getItem('darkMode')
      if (stored === 'true') return true
      if (stored === 'false') return false
      return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    let isDark = getDark()
    let p = isDark ? PALETTE_DARK : PALETTE_LIGHT

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.w, sizes.h)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(p.bg)
    scene.fog = new THREE.Fog(p.bg, 14, 38)

    const camera = new THREE.PerspectiveCamera(34, sizes.w / sizes.h, 0.1, 200)
    camera.position.set(0, 6.2, 11)
    camera.lookAt(0, 0.4, -2)

    const SIZE = 44
    const SEG = 320
    const geometry = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG)
    geometry.rotateX(-Math.PI / 2)

    const uniforms = {
      uAmp:          { value: 1.55 },
      uContourEvery: { value: 0.18 },
      uIndexEvery:   { value: 5.0 },
      uLineWidth:    { value: 1.05 },
      uLightDir:     { value: new THREE.Vector3(0.55, 0.85, 0.3).normalize() },
      uShadeLow:     { value: isDark ? 0.55 : 0.70 },
      uShadeHigh:    { value: isDark ? 1.15 : 1.10 },
      uFogNear:      { value: 14.0 },
      uFogFar:       { value: 38.0 },
      uBg:           { value: new THREE.Color(p.bg) },
      uC0:           { value: new THREE.Color(p.c0) },
      uC1:           { value: new THREE.Color(p.c1) },
      uC2:           { value: new THREE.Color(p.c2) },
      uC3:           { value: new THREE.Color(p.c3) },
      uC4:           { value: new THREE.Color(p.c4) },
      uLine:         { value: new THREE.Color(p.line) },
      uIndexLine:    { value: new THREE.Color(p.indexLine) },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      extensions: { derivatives: true },
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const render = () => renderer.render(scene, camera)

    const applyPalette = () => {
      p = isDark ? PALETTE_DARK : PALETTE_LIGHT
      uniforms.uBg.value.set(p.bg)
      uniforms.uC0.value.set(p.c0)
      uniforms.uC1.value.set(p.c1)
      uniforms.uC2.value.set(p.c2)
      uniforms.uC3.value.set(p.c3)
      uniforms.uC4.value.set(p.c4)
      uniforms.uLine.value.set(p.line)
      uniforms.uIndexLine.value.set(p.indexLine)
      uniforms.uShadeLow.value  = isDark ? 0.55 : 0.70
      uniforms.uShadeHigh.value = isDark ? 1.15 : 1.10
      scene.background = new THREE.Color(p.bg)
      if (scene.fog) scene.fog.color.set(p.bg)
      render()
    }

    const onDark  = () => { isDark = true;  applyPalette() }
    const onLight = () => { isDark = false; applyPalette() }
    window.addEventListener('darkMode',  onDark)
    window.addEventListener('lightMode', onLight)

    const onResize = () => {
      sizes.w = window.innerWidth
      sizes.h = window.innerHeight
      camera.aspect = sizes.w / sizes.h
      camera.updateProjectionMatrix()
      renderer.setSize(sizes.w, sizes.h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', onResize)

    const baseX = 0, baseY = 6.2
    const target = { x: baseX, y: baseY }
    let camX = baseX, camY = baseY
    const onMove = (e) => {
      const mx = (e.clientX / window.innerWidth)  * 2 - 1
      const my = (e.clientY / window.innerHeight) * 2 - 1
      target.x = baseX - mx * 0.55
      target.y = baseY + my * 0.35
    }
    window.addEventListener('mousemove', onMove)

    let raf = 0
    const tick = () => {
      camX += (target.x - camX) * 0.05
      camY += (target.y - camY) * 0.05
      camera.position.set(camX, camY, 11)
      camera.lookAt(0, 0.4, -2)
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    this._cleanup = () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('darkMode',  onDark)
      window.removeEventListener('lightMode', onLight)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  },
  beforeUnmount() {
    if (this._cleanup) this._cleanup()
  },
}
</script>

<template>
  <canvas ref="canvas" class="topo-webgl" />
</template>

<style scoped>
.topo-webgl {
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  outline: none;
  z-index: 0;
  pointer-events: none;
}
</style>
