<template>
  <section class="projects">
    <p v-if="label" class="section-label">{{ label }}</p>
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
                <svg
                  v-if="project.award"
                  class="award"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Award-winning project"
                  role="img"
                >
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
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
    <NuxtLink v-if="featured" class="all-link" to="/projects">see all projects →</NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'

// featured: homepage mode — only the top-three `featured: true` projects plus
// an "all projects →" link. Otherwise the full newest-first list (/projects).
const props = defineProps<{ featured?: boolean; label?: string }>()

const label = computed(() => props.label ?? (props.featured ? 'selected projects' : 'all projects'))
const query = computed<QueryBuilderParams>(() => ({
  path: '/projects',
  sort: [{ year: -1 }],
  ...(props.featured ? { where: [{ featured: true }] } : {}),
}))
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

.award {
  width: 0.95em;
  height: 0.95em;
  vertical-align: -0.08em;
  margin-left: 0.1em;
  color: var(--text-faint, currentColor);
  flex-shrink: 0;
}

.read-more {
  color: var(--link);
  font-weight: 300;
  margin-top: 0.5rem;
  display: inline-block;
}

/* the deliberate, can't-miss route to the archive */
.all-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.6rem;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 1.15rem;
  color: var(--link);
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1.5px;
  transition: gap 200ms var(--ease), text-decoration-thickness 200ms var(--ease);
}
.all-link:hover { gap: 0.9rem; text-decoration-thickness: 2.5px; }
</style>
