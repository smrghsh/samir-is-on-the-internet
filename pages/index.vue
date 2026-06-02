<template>
  <div>
    <!-- living contour-map backdrop (z-index 0) -->
    <Topo />

    <!-- the "open me!" lil-gui panel: night toggle + terrain params -->
    <ClientOnly>
      <SceneControls />
    </ClientOnly>

    <!-- content (z-index 2) -->
    <div class="front-layer">
      <HeroIntro />
      <main>
        <section class="bio">
          <p class="section-label">about me</p>
          <div class="glass bio-card">
            <div class="card-body prose">
              <ContentDoc :head="false" path="/hello-world" />
            </div>
          </div>
        </section>

        <ProjectsContainer />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Homepage composition for v8 "Instrument".
// Topo + SceneControls are client-side (WebGL / lil-gui); ContentDoc pulls
// the bio copy from content/hello-world.md, unchanged.
</script>

<style scoped>
.front-layer {
  position: relative;
  z-index: 2;
  width: 100%;
}

main {
  padding: 0 var(--three) 12vh;
}

.section-label {
  font-family: ui-monospace, monospace;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin: 0 0 1rem 0.2rem;
}

.bio {
  max-width: 880px;
  margin-bottom: 7vh;
}
.bio-card { border-radius: 16px; }
/* mirror the project cards' uniform inset (.card { padding: 0.9rem }) on every
   side, so the about-me text sits the same distance from each glass edge as the
   card content does — no oversized top/bottom gaps. */
.bio .card-body { padding: 0.9rem; }
.bio :deep(p) {
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 300;
  margin: 0 0 0.9rem;
}
.bio :deep(p:last-child) { margin-bottom: 0; }
.bio :deep(a) { color: var(--link); text-underline-offset: 3px; }
.bio :deep(a:hover) { text-decoration-thickness: 2px; }
</style>

<!-- Light-mode legibility nudge for the section labels (they sit over the
     terrain). GLOBAL `:root.theme-light` rule in an UNSCOPED block — never a
     Vue-scoped `:global(.theme-light)` (that mis-scopes onto <html>). One rule
     covers this page's "about me" and ProjectsContainer's "selected projects"
     (same .section-label class). -->
<style>
:root.theme-light .section-label { color: rgba(20, 24, 22, 0.62); }
</style>
