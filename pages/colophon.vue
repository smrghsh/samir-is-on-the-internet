<template>
  <div>
    <Topo />

    <div class="colophon-page">
      <NuxtLink class="back" to="/">← back to samir.tech</NuxtLink>

      <header class="intro">
        <p class="kicker">// about this site</p>
        <h1 class="name">Colophon</h1>
      </header>

      <!-- Source of truth stays content/colophon.md. The styles below target
           the rendered markdown via :deep(). Update the .md, not this file,
           to change copy. -->
      <div class="prose-body glass">
        <ContentDoc :head="false" path="/colophon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Colophon — quiet prose over the terrain, in the v8 system.
</script>

<style scoped>
.colophon-page {
  position: relative; z-index: 2; width: 100%;
  /* left-aligned like the homepage — var(--three) from the window edge. */
  max-width: 680px; padding: 0 var(--three);
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
  font-size: clamp(2.6rem, 6vw, 4rem); line-height: 0.98; margin: 0;
}

/* the prose now lives in a glass reading card (solves light-mode legibility),
   mirroring Bio's structure: header over the terrain, content in a card. */
.prose-body { margin: 2vh 0 10vh; padding: 2.4rem 2.6rem; border-radius: 18px; }
.prose-body :deep(p) {
  font-size: 1.12rem; line-height: 1.7; font-weight: 300; color: var(--text);
  margin: 0 0 1.3rem; max-width: 60ch;
}
/* big Raleway statement line — scoped to a <strong> that IS its own paragraph
   (`<p><strong>…</strong></p>`), so the bold lead-ins inside list items render
   as normal bold instead of inheriting this outsized treatment. */
.prose-body :deep(p > strong) {
  font-family: 'Raleway', sans-serif; font-weight: 300; font-size: 1.32rem;
  color: var(--text); display: inline-block; margin: 0.4rem 0;
}
/* horizontal rule from `---` — a quiet contour-colored divider, not the UA default. */
.prose-body :deep(hr) { border: none; border-top: 1px solid var(--contour-minor); margin: 1.8rem 0; }
.prose-body :deep(ul) { list-style: none; padding: 0; margin: 0 0 1.6rem; display: flex; flex-direction: column; gap: 0.9rem; }
.prose-body :deep(li) {
  position: relative; padding-left: 1.6rem; font-size: 1.05rem; line-height: 1.6;
  /* light mode reads fine at the dim value; dark mode at 0.55 white is too
     murky on the glass card, so lighten just the dark side to 0.82. */
  color: light-dark(rgba(20, 24, 22, 0.55), rgba(255, 255, 255, 0.82)); max-width: 58ch;
}
/* contour-tick bullet, echoing the map motif */
.prose-body :deep(li)::before {
  content: ''; position: absolute; left: 0; top: 0.62em; width: 0.7rem; height: 0;
  border-top: 1.5px solid var(--contour-index);
}
.prose-body :deep(a) { color: var(--link); text-underline-offset: 3px; }
.prose-body :deep(a:hover) { text-decoration-thickness: 2px; }
</style>

<!-- Light-mode overrides as GLOBAL `:root.theme-light` rules in an UNSCOPED
     block — never Vue-scoped `:global(.theme-light)` (mis-scopes onto <html>;
     the white-sheet bug). -->
<style>
/* the prose now lives in a glass reading card (light-mode legibility was the
   reason — a card solves it cleanly). Soften its bright light-mode border like
   the other glass panels; the sheen dim is handled by v8-tokens' .glass::after. */
:root.theme-light .prose-body { border-color: rgba(20, 40, 30, 0.10); }

/* the intro header gets the same flush scrim as bio/cv for a consistent
   subpage-header treatment (just the heading, not the prose below it). */
:root.theme-light .colophon-page .intro { position: relative; }
:root.theme-light .colophon-page .intro::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 3vh -2rem 0 -140px;
  background: linear-gradient(95deg,
    rgba(245, 243, 238, 0.5) 0%,
    rgba(245, 243, 238, 0.48) 55%,
    rgba(245, 243, 238, 0.28) 78%,
    rgba(245, 243, 238, 0) 100%);
  filter: blur(14px);
  pointer-events: none;
}
</style>
