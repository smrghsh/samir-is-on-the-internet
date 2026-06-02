<template>
  <!-- lil-gui mounts itself to <body>; this component just owns its lifecycle.
       It is the "open me!" debug panel — the XR inside joke, and the home of
       the day/night toggle (replaces the old ColorModeSwitch.vue). -->
  <div ref="hostEl" class="scene-controls-host" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useScene, setMode } from '~/composables/useScene'

const scene = useScene()
const hostEl = ref<HTMLElement | null>(null)
let gui: any = null

onMounted(async () => {
  // client-only; lil-gui touches the DOM
  const { default: GUI } = await import('lil-gui')

  // local proxy lil-gui can bind to, mirrored back into useScene()
  const p = {
    night: scene.value.isDark,
    amp: scene.value.amp,
    contourEvery: scene.value.contourEvery,
    indexEvery: scene.value.indexEvery,
    lineWidth: scene.value.lineWidth,
    lineStrength: scene.value.lineStrength,
    fogNear: scene.value.fogNear,
    fogFar: scene.value.fogFar,
    regenerate() {
      p.seedBump = Math.random() * 100
      scene.value.seed = p.seedBump
    },
    seedBump: 0,
  }

  gui = new GUI({ title: 'open me!' })

  gui.add(p, 'night').name('🌙 night/☀️day mode!?').onChange((v: boolean) => {
    setMode(scene.value, v)
    // reflect the mode-default amp/contour back into the panel
    p.amp = scene.value.amp
    p.contourEvery = scene.value.contourEvery
    p.lineStrength = scene.value.lineStrength
    gui.controllersRecursive().forEach((c: any) => c.updateDisplay())
  })

  const ft = gui.addFolder('terrain')
  ft.add(p, 'amp', 0.4, 2.6, 0.01).name('amplitude').onChange((v: number) => (scene.value.amp = v))
  ft.add(p, 'contourEvery', 0.06, 0.4, 0.005).name('contour spacing').onChange((v: number) => (scene.value.contourEvery = v))
  ft.add(p, 'indexEvery', 2, 10, 1).name('index interval').onChange((v: number) => (scene.value.indexEvery = v))
  ft.add(p, 'lineWidth', 0.4, 2.4, 0.05).name('line weight').onChange((v: number) => (scene.value.lineWidth = v))
  ft.add(p, 'lineStrength', 0, 1.4, 0.02).name('line opacity').onChange((v: number) => (scene.value.lineStrength = v))

  const ff = gui.addFolder('fog')
  ff.close()
  ff.add(p, 'fogNear', 4, 30, 0.5).name('near').onChange((v: number) => (scene.value.fogNear = v))
  ff.add(p, 'fogFar', 16, 60, 0.5).name('far').onChange((v: number) => (scene.value.fogFar = v))

  gui.add(p, 'regenerate').name('↻ regenerate terrain')
})

onBeforeUnmount(() => {
  gui?.destroy()
})
</script>

<style scoped>
.scene-controls-host {
  display: none;
}
</style>

<style>
/* lil-gui renders itself to <body>, so these rules must be global (unscoped).
   NOTE: the installed lil-gui is 0.21, whose root class is `.lil-root`
   (the prototype targeted the old 0.19 `.root`). */
/* z-index 1000 (was the prototype's 60) so the panel always sits on top and
   stays clickable — nothing should be able to overlay it. */
.lil-gui.lil-root {
  z-index: 1000;
  --width: 286px;
}

/* main.css has a global `* { color; font-family }` that leaks the page's text
   color (dark, in light mode) and font onto lil-gui's labels + folder names —
   which lil-gui leaves to inheritance from its root. The panel is always its
   own dark-grey theme, so re-assert lil-gui's own light text/font inside it.
   lil-gui's higher-specificity input/button rules still win, so widget colors
   are preserved. */
.lil-gui,
.lil-gui * {
  color: var(--text-color);
  font-family: var(--font-family);
}
</style>
