<template>
  <header class="hero">
    <div class="hero-inner">
      <p class="kicker mono">// hello world</p>
      <h1 class="name">Samir Ghosh</h1>
      <p class="tagline thesis">
        I research <em>spatial tools</em> for working with complex, spatial data.
      </p>
      <SocialRow class="hero-socials" />
      <MainNav />
    </div>
  </header>
</template>

<script setup lang="ts">
// HeroIntro.vue — name-led hero; the thesis sentence carries the voice.
// In light mode a soft, full-bleed-left "paper scrim" sits behind the column
// for legibility over the terrain (no per-glyph halo — see ::before below).
</script>

<style scoped>
.hero {
  min-height: 52vh;
  display: flex;
  align-items: center;
  padding: 5.5vh 0 2vh var(--three);
}
.hero-inner { max-width: 660px; position: relative; }

.kicker {
  font-size: 0.95rem;
  color: var(--text-dim);
  letter-spacing: 0.04em;
  margin: 0 0 0.4rem;
}
.name {
  font-family: 'Raleway', sans-serif;
  font-weight: 100;
  letter-spacing: 0.01em;
  margin: 0;
  font-size: clamp(2.6rem, 5.6vw, 4.4rem);
  line-height: 0.96;
  color: var(--text);
}
.tagline.thesis {
  font-family: 'Raleway', sans-serif;
  font-weight: 200;
  font-size: clamp(1.15rem, 2vw, 1.7rem);
  color: var(--text);
  line-height: 1.32;
  max-width: 600px;
  text-wrap: balance;
  margin: 1rem 0 1.6rem;
}
.tagline.thesis em { font-style: normal; color: var(--link); }

/* NB: do NOT set `display` here — this class lands on SocialRow's root <nav>,
   and `display: block` would override SocialRow's own `.socials { display: flex }`
   (same element, equal specificity), stacking the icons vertically. */
.hero-socials { margin-bottom: 1.8rem; }

/* ── light mode ─────────────────────────────────────────────────────
   The prototype put a blurred "paper scrim" behind the hero for legibility.
   Every way of expressing it caused trouble in this Nuxt DOM: the original
   `::before { position:absolute; z-index:-1; filter:blur() }` leaked and
   blurred/blocked the whole page (panel became unclickable); a strong full
   -height background read as a white veil over everything. In light mode the
   text is near-black on the pale "sage-on-paper" terrain and already has
   solid contrast, so there's no wash for now. If a line ever gets lost over
   busy terrain, add a SUBTLE low-opacity background on .hero-inner (sized to
   the text, never a filtered/absolute pseudo). */
</style>
