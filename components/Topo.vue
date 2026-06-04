<template>
  <canvas ref="canvasEl" class="topo-bg"></canvas>
</template>

<script setup lang="ts">
// Topo.vue — the living contour-map backdrop. Bootstraps the WebGL Experience
// (Bruno-Simon style: Experience → World → Terrain) onto its canvas and tears
// it down on unmount. All scene logic lives under ~/Experience.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Experience from '~/Experience/Experience.js'

const canvasEl = ref<HTMLCanvasElement | null>(null)
let experience: any = null

onMounted(() => {
  experience = new Experience(canvasEl.value)
})

onBeforeUnmount(() => {
  experience?.destroy()
})
</script>

<style scoped>
.topo-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
</style>
