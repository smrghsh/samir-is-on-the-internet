<template>
  <section class="projects">
    <p class="section-label">selected projects</p>
    <ContentList :query="query" path="/projects" v-slot="{ list }">
      <div class="cards">
        <template v-for="project in list" :key="project._path">
          <Card v-if="!project.draft">
            <article>
              <img
                class="thumb"
                :src="'/images/projects/thumbnails-resized/' + project.thumbnail"
                :alt="project.title + ' thumbnail image'"
                loading="lazy"
              />
              <h3 class="card-title">
                {{ project.title }}
                <span class="time">{{ project.displayYear }}</span>
              </h3>
              <ContentDoc :path="project._path" v-slot="{ doc }">
                <ContentRenderer :value="doc" :excerpt="true" />
              </ContentDoc>
              <NuxtLink v-if="project.hasMore" class="read-more" :to="`${project.slug}`">
                read more →
              </NuxtLink>
            </article>
          </Card>
        </template>
      </div>
    </ContentList>
  </section>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
// Sort newest-first, exactly as the original.
const query: QueryBuilderParams = { path: '/projects', sort: [{ year: -1 }] }
</script>

<style scoped>
.section-label {
  font-family: ui-monospace, monospace;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin: 0 0 1rem 0.2rem;
}

/* keep the thumbnail size Samir is attached to (160px tall, ~280 wide) */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.4rem;
}

/* link rows the project markdown renders (the <div class="links"> in content) */
:deep(.links) {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.55rem 0;
}
:deep(.links a) {
  font-size: 0.8rem;
  text-decoration: none;
  color: var(--text);
  padding: 0.28rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  white-space: nowrap;
  transition: background 200ms var(--ease);
}
:deep(.links a:hover) { background: var(--glass-strong); }

.read-more {
  color: var(--link);
  font-weight: 300;
  margin-top: 0.5rem;
  display: inline-block;
}
</style>
