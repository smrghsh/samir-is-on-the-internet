<template>
  <div>
    <Topo />

    <div class="projects-page">
      <NuxtLink class="back" to="/">← back to samir.tech</NuxtLink>

      <!-- subtitle lives INSIDE the header so the legibility scrim behind
           .intro covers the heading and the "newest first" line together -->
      <header class="intro">
        <h1 class="name">All Projects</h1>
        <p class="sub">all projects, newest first</p>
      </header>

      <ProjectsContainer label="" />
    </div>
  </div>
</template>

<script setup lang="ts">
// All Projects — the full newest-first archive; the homepage keeps only the
// three featured cards.
</script>

<style scoped>
.projects-page {
  position: relative; z-index: 2; width: 100%;
  padding: 0 var(--three) 10vh;
}
.back {
  display: inline-flex; align-items: center; gap: 0.5rem; margin: 2.4rem 0 0;
  font-family: ui-monospace, monospace; font-size: 0.8rem; color: var(--text-dim);
  text-decoration: none; transition: gap 200ms var(--ease), color 200ms var(--ease);
}
.back:hover { gap: 0.8rem; color: var(--link); }

.intro { padding: 5vh 0 3vh; position: relative; }
.name {
  font-family: 'Raleway', sans-serif; font-weight: 100;
  font-size: clamp(2.6rem, 6vw, 4rem); line-height: 0.98; margin: 0;
}
.sub {
  font-family: ui-monospace, monospace; font-size: 0.85rem; color: var(--text-dim);
  letter-spacing: 0.1em; text-transform: uppercase; margin: 1rem 0 0;
}
</style>

<!-- Legibility scrim behind the intro (heading + "newest first" line), for
     BOTH modes. GLOBAL `:root.theme-*` rules in an UNSCOPED block — NEVER
     Vue-scoped `:global(.theme-light)` (mis-scopes onto <html>; white-sheet bug). -->
<style>
.projects-page .intro::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 3vh -2rem 1vh -140px;
  pointer-events: none;
  filter: blur(14px);
}
:root.theme-light .projects-page .intro::before {
  background: linear-gradient(95deg,
    rgba(245, 243, 238, 0.55) 0%,
    rgba(245, 243, 238, 0.5) 55%,
    rgba(245, 243, 238, 0.3) 78%,
    rgba(245, 243, 238, 0) 100%);
}
:root.theme-dark .projects-page .intro::before {
  background: linear-gradient(95deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.55) 55%,
    rgba(0, 0, 0, 0.32) 78%,
    rgba(0, 0, 0, 0) 100%);
}
</style>
