<script setup lang="ts">
// Project detail page — modeled on colophon.vue: terrain backdrop + "open me!"
// panel, a back link, an intro header over the terrain, and the project's
// markdown rendered inside a glass reading card. Content is unchanged — it
// still comes from content/projects/<slug>.md via @nuxt/content.
const { slug } = useRoute().params
</script>

<template>
  <div>
    <Topo />
    <ClientOnly><SceneControls /></ClientOnly>

    <div class="doc-page">
      <NuxtLink class="back" to="/">← back to samir.tech</NuxtLink>

      <ContentDoc :path="`/projects/${slug}`">
        <template v-slot="{ doc }">
          <header class="intro">
            <p class="kicker">// project</p>
            <h1 class="name">{{ doc.title }}</h1>
            <p v-if="doc.displayYear" class="lede">{{ doc.displayYear }}</p>
          </header>

          <article class="prose-body glass">
            <ContentRenderer :value="doc" />
          </article>
        </template>

        <template #not-found>
          <header class="intro">
            <p class="kicker">// 404</p>
            <h1 class="name glitch" aria-label="Page not found">P̛̞͉̹̩̹̰̺̱̩a͇ͅg̼̮͙̦̪̘͞e̦̫͕͖͇͝͞ ͙̮̲͕̼̖͙n͏͙̝̭̟̰͖ọ̘̟͙̦̮t͏̙͔̟̝̣̼͝
                    ҉̦̮͔F̱̀o̧͈̬͖͔̠̬͎͓u̥̩̗͓̦̗n̨̻̯̖̜̗̮̭̠͢d̡̰̺͎̤</h1>
          </header>
          <article class="prose-body glass">
            <p>That project isn't here — it may have moved, or never existed.
              <NuxtLink to="/">← back to samir.tech</NuxtLink>
            </p>
          </article>
        </template>
      </ContentDoc>
    </div>
  </div>
</template>

<style scoped>
.doc-page {
  position: relative; z-index: 2; width: 100%;
  /* left-aligned like the homepage — var(--three) from the window edge. */
  max-width: 800px; padding: 0 var(--three);
}
.back {
  display: inline-flex; align-items: center; gap: 0.5rem; margin: 2.4rem 0 0;
  font-family: ui-monospace, monospace; font-size: 0.8rem; color: var(--text-dim);
  text-decoration: none; transition: gap 200ms var(--ease), color 200ms var(--ease);
}
.back:hover { gap: 0.8rem; color: var(--link); }

.intro { padding: 5vh 0 1vh; }
.kicker {
  font-family: ui-monospace, monospace; font-size: 0.82rem; color: var(--text-dim);
  letter-spacing: 0.06em; margin: 0 0 0.5rem;
}
.name {
  font-family: 'Raleway', sans-serif; font-weight: 100;
  font-size: clamp(2.4rem, 5.5vw, 3.6rem); line-height: 1.02; margin: 0;
}
/* 404 easter egg: let the zalgo combining marks breathe + wrap */
.name.glitch { line-height: 1.6; word-break: break-word; }
.lede {
  font-family: ui-monospace, monospace; font-size: 0.82rem; color: var(--text-faint);
  letter-spacing: 0.06em; margin: 0.6rem 0 0;
}

/* glass reading card — same as colophon */
.prose-body { margin: 2vh 0 10vh; padding: 2.4rem 2.6rem; border-radius: 18px; }
.prose-body :deep(p) {
  font-size: 1.08rem; line-height: 1.7; font-weight: 300; color: var(--text);
  margin: 0 0 1.2rem;
}
.prose-body :deep(p:last-child) { margin-bottom: 0; }
.prose-body :deep(h2),
.prose-body :deep(h3) {
  font-family: 'Raleway', sans-serif; font-weight: 300; color: var(--text);
  margin: 1.8rem 0 0.6rem; line-height: 1.2;
}
.prose-body :deep(h2) { font-size: 1.5rem; }
.prose-body :deep(h3) { font-size: 1.2rem; }
.prose-body :deep(img) {
  max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 1.6rem 0;
}
.prose-body :deep(ul) { padding-left: 1.2rem; margin: 0 0 1.2rem; }
.prose-body :deep(li) { margin: 0 0 0.4rem; }
.prose-body :deep(a) { color: var(--link); text-underline-offset: 3px; }
.prose-body :deep(a:hover) { text-decoration-thickness: 2px; }

/* the project markdown's <div class="links"> button row (uses <a class="button">) */
.prose-body :deep(.links) { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0 0 1.6rem; }
.prose-body :deep(.links a) {
  font-size: 0.85rem; text-decoration: none; color: var(--text);
  padding: 0.4rem 0.8rem; border: 1px solid var(--border); border-radius: 8px;
  white-space: nowrap; transition: background 200ms var(--ease), border-color 200ms var(--ease), color 200ms var(--ease);
}
.prose-body :deep(.links a:hover) { background: var(--glass-strong); border-color: var(--link); color: var(--link); }
</style>

<!-- Light-mode overrides as GLOBAL `:root.theme-light` rules in an UNSCOPED
     block — never Vue-scoped `:global(.theme-light)` (mis-scopes onto <html>;
     the white-sheet bug). Mirrors colophon.vue. -->
<style>
/* soften the card's bright light-mode border (sheen dim is handled by
   v8-tokens' :root.theme-light .glass::after rule). */
:root.theme-light .prose-body { border-color: rgba(20, 40, 30, 0.10); }

/* light-mode legibility scrim behind the intro header — homepage-style, flush
   to the window's left edge (-140px) and fading right; matches the subpages. */
:root.theme-light .doc-page .intro { position: relative; }
:root.theme-light .doc-page .intro::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 3vh -2rem 0 -140px;
  background: linear-gradient(95deg,
    rgba(245, 243, 238, 0.42) 0%,
    rgba(245, 243, 238, 0.40) 55%,
    rgba(245, 243, 238, 0.20) 78%,
    rgba(245, 243, 238, 0) 100%);
  filter: blur(14px);
  pointer-events: none;
}
</style>
