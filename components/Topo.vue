<template>
  <canvas ref="canvasEl" class="topo-bg"></canvas>
</template>

<script setup lang="ts">
// The fixed WebGL backdrop: the domain-warp shader (~/Experience/DomainWarp.js)
// plus its "open me!" lil-gui panel. The canvas's fixed positioning is
// .topo-bg in site.css.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import DomainWarp from '~/Experience/DomainWarp.js'

const canvasEl = ref<HTMLCanvasElement | null>(null)
let warp: any = null

onMounted(() => {
  warp = new DomainWarp(canvasEl.value)
})

onBeforeUnmount(() => {
  warp?.destroy()
})
</script>
