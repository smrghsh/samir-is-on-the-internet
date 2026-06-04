import * as THREE from 'three'
import Experience from '../Experience.js'
import { PALETTES, NIGHT_DEFAULTS } from '../palettes.js'
import vertexShader from '../shaders/terrain/vertex.glsl'
import fragmentShader from '../shaders/terrain/fragment.glsl'

// The living contour-map surface: an FBM + ridge-noise heightfield with
// contour/index lines, fog, and a top->bottom palette that lerps on scroll.
export default class Terrain {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.scroll = this.experience.scroll
    this.isDark = this.experience.isDark

    // top-of-scroll / bottom-of-scroll palettes, per mode
    this.palettes = {
      light: PALETTES.lightClassic, lightBottom: PALETTES.lightBathy,
      dark: PALETTES.darkClassic, darkBottom: PALETTES.darkAbyss,
    }

    this.params = {
      amp: NIGHT_DEFAULTS.amp,
      contourEvery: NIGHT_DEFAULTS.contourEvery,
      indexEvery: 5.0,
      lineWidth: 1.05,
      lineStrength: NIGHT_DEFAULTS.lineStrength,
      fogNear: 14,
      fogFar: 38,
      seed: 0,
    }

    this.setInstance()
    this.applyPalette()
  }

  pal() { return this.isDark ? this.palettes.dark : this.palettes.light }
  palBottom() {
    return this.isDark ? this.palettes.darkBottom : this.palettes.lightBottom
  }

  setInstance() {
    const p = this.pal()
    const o = this.params

    this.geometry = new THREE.PlaneGeometry(44, 44, 320, 320)
    this.geometry.rotateX(-Math.PI / 2)

    this.uniforms = {
      uAmp: { value: o.amp },
      uContourEvery: { value: o.contourEvery },
      uIndexEvery: { value: o.indexEvery },
      uLineWidth: { value: o.lineWidth },
      uLineStrength: { value: o.lineStrength },
      uSeed: { value: o.seed },
      uLightDir: { value: new THREE.Vector3(0.55, 0.85, 0.3).normalize() },
      uShadeLow: { value: this.isDark ? 0.55 : 0.70 },
      uShadeHigh: { value: this.isDark ? 1.15 : 1.10 },
      uFogNear: { value: o.fogNear },
      uFogFar: { value: o.fogFar },
      uBg: { value: new THREE.Color(p.bg) },
      uC0: { value: new THREE.Color(p.c0) },
      uC1: { value: new THREE.Color(p.c1) },
      uC2: { value: new THREE.Color(p.c2) },
      uC3: { value: new THREE.Color(p.c3) },
      uC4: { value: new THREE.Color(p.c4) },
      uLine: { value: new THREE.Color(p.line) },
      uIndexLine: { value: new THREE.Color(p.indexLine) },
    }

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
      extensions: { derivatives: true },
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  // Lerp top->bottom palette across scroll, in the current mode.
  applyPalette() {
    const a = this.pal(), b = this.palBottom()
    const t = this.scroll.progress
    const u = this.uniforms
    const mix = (k) => new THREE.Color(a[k]).lerp(new THREE.Color(b[k]), t)

    u.uBg.value.copy(mix('bg'))
    u.uC0.value.copy(mix('c0'))
    u.uC1.value.copy(mix('c1'))
    u.uC2.value.copy(mix('c2'))
    u.uC3.value.copy(mix('c3'))
    u.uC4.value.copy(mix('c4'))
    u.uLine.value.copy(mix('line'))
    u.uIndexLine.value.copy(mix('indexLine'))
    u.uShadeLow.value = this.isDark ? 0.55 : 0.70
    u.uShadeHigh.value = this.isDark ? 1.15 : 1.10

    this.scene.background.copy(u.uBg.value)
    if (this.scene.fog) this.scene.fog.color.copy(u.uBg.value)
  }

  setMode(isDark) {
    this.isDark = isDark
    this.applyPalette()
  }

  setParams(partial = {}) {
    const u = this.uniforms
    Object.assign(this.params, partial)
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
    return { ...this.params }
  }

  // palette tracks scroll, so re-resolve it each frame
  update() {
    this.applyPalette()
  }

  destroy() {
    this.scene.remove(this.mesh)
    this.geometry.dispose()
    this.material.dispose()
  }
}
