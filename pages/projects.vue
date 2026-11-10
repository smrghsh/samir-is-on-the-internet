<template>
  <div class="projects-page">
    <header class="intro">
      <h1 class="name">All Projects</h1>
      <p class="sub">all projects, newest first</p>
    </header>

    <ProjectsContainer label="" />
  </div>
</template>

<script setup lang="ts">
// The full newest-first archive; the homepage keeps only the three featured cards.
</script>

<style scoped>
.projects-page { padding-bottom: 10vh; }
/* this page keeps a left-aligned heading (the other pages centre theirs) */
.intro { padding-bottom: 3vh; text-align: left; }
.sub {
  font-family: var(--mono); font-size: 0.85rem; color: var(--text-dim);
  letter-spacing: 0.1em; text-transform: uppercase; margin: 1rem 0 0;
}
</style>
