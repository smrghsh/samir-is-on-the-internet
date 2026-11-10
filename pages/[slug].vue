<script setup lang="ts">
// Project detail page: intro header over the backdrop, markdown in a glass
// reading card. Content comes from content/projects/<slug>.md.
const { slug } = useRoute().params
</script>

<template>
  <div class="doc-page">
    <ContentDoc :path="`/projects/${slug}`">
      <template v-slot="{ doc }">
        <header class="intro">
          <p class="kicker">// project</p>
          <h1 class="name">{{ doc.title }}</h1>
          <p v-if="doc.displayYear" class="kicker year">{{ doc.displayYear }}</p>
        </header>
        <article class="glass reading prose">
          <ContentRenderer :value="doc" />
        </article>
      </template>

      <template #not-found>
        <header class="intro">
          <p class="kicker">// 404</p>
          <h1 class="name">Page not found</h1>
        </header>
        <article class="glass reading prose">
          <p>That project isn't here — it may have moved, or never existed.</p>
          <p><NuxtLink to="/">← back to samir.tech</NuxtLink></p>
        </article>
      </template>
    </ContentDoc>
  </div>
</template>

<style scoped>
.doc-page { max-width: 800px; margin-inline: auto; }
.intro { padding-bottom: 1vh; }
.year { color: var(--text-faint); margin: 0.6rem 0 0; }
</style>
