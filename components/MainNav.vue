<template>
  <!-- Contour-bracketed nav rows. The minor-contour hairlines + index hover
       echo the topographic map rather than reading as stray borders. -->
  <nav class="mainnav">
    <NuxtLink v-for="item in items" :key="item.to" :to="item.to">
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const items = [
  { label: 'Bio', to: '/bio' },
  { label: 'CV, Resume', to: '/cv-and-resume' },
  { label: 'All Projects', to: '/projects' },
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
  font-weight: 300;
  font-size: 1.35rem;
  /* left inset mirrors the about-me card's text edge exactly: 1px glass
     border + 0.9rem card-body padding (verified to 0.0px in Blink + WebKit) */
  padding: 0.7rem 0.2rem 0.7rem calc(0.9rem + 1px);
  border-bottom: 1px solid var(--contour-minor);
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  transition: padding-left 240ms var(--ease), color 200ms var(--ease);
}
.mainnav a:first-child { border-top: 1px solid var(--contour-minor); }
.mainnav a:hover { padding-left: calc(1.5rem + 1px); color: var(--link); }
</style>
