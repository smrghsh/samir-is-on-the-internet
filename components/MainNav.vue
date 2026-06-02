<template>
  <!-- Contour-bracketed nav rows. The minor-contour hairlines + index hover
       echo the topographic map rather than reading as stray borders. -->
  <nav class="mainnav">
    <NuxtLink v-for="(item, i) in items" :key="item.to" :to="item.to">
      <span class="idx">{{ String(i + 1).padStart(2, '0') }}</span> {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const items = [
  { label: 'Bio', to: '/bio' },
  { label: 'CV, Resume', to: '/cv-and-resume' },
  { label: 'Colophon', to: '/colophon' },
]
</script>

<style scoped>
.mainnav {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 360px;
}
.mainnav a {
  text-decoration: none;
  color: var(--text);
  font-family: 'Raleway', sans-serif;
  font-weight: 200;
  font-size: 1.35rem;
  padding: 0.7rem 0.2rem 0.7rem 1.1rem;
  border-bottom: 1px solid var(--contour-minor);
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  transition: padding-left 240ms var(--ease), color 200ms var(--ease);
}
.mainnav a:first-child { border-top: 1px solid var(--contour-minor); }
.mainnav a .idx {
  font-family: ui-monospace, monospace;
  font-size: 0.7rem;
  color: var(--text-faint);
}
.mainnav a:hover { padding-left: 1.7rem; color: var(--link); }
</style>
