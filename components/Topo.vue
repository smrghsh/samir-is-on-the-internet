<template>
  <canvas ref="canvasEl" class="topo-bg"></canvas>
</template>

<script setup lang="ts">
// Topo.vue — the living contour-map backdrop.
// Thin Vue wrapper around utils/terrain.js (a configurable port of the
// original topo.vue shader). Owns the TopoTerrain instance, wires scroll
// reactivity, and pushes useScene() params into the WebGL layer.
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
// `~` is Nuxt's srcDir alias. terrain.js imports bare `three`, which Nuxt
// resolves (three is already in build.transpile in nuxt.config.ts).
import { TopoTerrain, PALETTES } from '~/utils/terrain.js'

const scene = useScene()
const canvasEl = ref<HTMLCanvasElement | null>(null)
let terrain: any = null
let onScroll: (() => void) | null = null

function applyMode(night: boolean) {
  // ONE theming signal, exactly like the reference (lib/site.css + a single
  // class on <html>): toggle .theme-dark / .theme-light, which flips
  // color-scheme so v8-tokens.css resolves light-dark(). No legacy
  // .dark-mode/.light-mode dual system, no localStorage/event bridge.
  const root = document.documentElement
  root.classList.toggle('theme-dark', night)
  root.classList.toggle('theme-light', !night)
  terrain?.setMode(night)
}

function pushParams() {
  terrain?.setParams({
    amp: scene.value.amp,
    contourEvery: scene.value.contourEvery,
    indexEvery: scene.value.indexEvery,
    lineWidth: scene.value.lineWidth,
    lineStrength: scene.value.lineStrength,
    fogNear: scene.value.fogNear,
    fogFar: scene.value.fogFar,
    seed: scene.value.seed,
  })
}

onMounted(() => {
  terrain = new TopoTerrain(canvasEl.value, {
    isDark: scene.value.isDark,
    // top → bottom palette lerp on scroll (classic terrain → abyssal blue)
    light: PALETTES.lightClassic, lightBottom: PALETTES.lightBathy,
    dark: PALETTES.darkClassic,   darkBottom: PALETTES.darkAbyss,
    camStart: { pos: [0, 6.2, 11], look: [0, 0.4, -2], fov: 34 },
    amp: scene.value.amp,
  })
  applyMode(scene.value.isDark)
  pushParams()

  // scroll → camera eases toward the ridgeline + palette drifts to abyss
  onScroll = () => {
    const range = window.innerHeight * 1.6
    terrain.setScroll(Math.min(1, window.scrollY / range))
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // react to panel changes
  watch(() => scene.value.isDark, (n) => applyMode(n))
  watch(
    () => [scene.value.amp, scene.value.contourEvery, scene.value.indexEvery,
           scene.value.lineWidth, scene.value.lineStrength,
           scene.value.fogNear, scene.value.fogFar, scene.value.seed],
    () => pushParams(),
  )
})

onBeforeUnmount(() => {
  if (onScroll) window.removeEventListener('scroll', onScroll)
  terrain?.dispose()
})
</script>

<style scoped>
.topo-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
</style>
