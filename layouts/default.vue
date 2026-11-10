<template>
  <div>
    <!-- domain-warp backdrop (fixed, z-index 0) + the "open me!" lil-gui panel.
         Mounted once here so it persists across page navigation. -->
    <Topo />
    <div class="page">
      <NuxtLink v-if="$route.path !== '/'" class="back" to="/">← back to samir.tech</NuxtLink>
      <slot />
    </div>
  </div>
</template>
