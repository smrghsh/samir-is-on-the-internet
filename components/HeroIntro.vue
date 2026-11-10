<template>
  <header class="hero">
    <div class="hero-inner">
      <h1 class="name">Samir Ghosh</h1>
      <p class="tagline">virtual reality research and creative code</p>
      <SocialRow class="hero-socials" />
      <MainNav />
    </div>
  </header>
</template>

<script setup lang="ts">
// Name-led hero: the h1 and a one-line tagline.
</script>

<style scoped>
/* No min-height: the hero hugs its content so the rhythm is identical at
   every width. Horizontal inset comes from .page. */
.hero {
  /* same headspace as the subpages: their back link occupies ~3.4rem
     (2.4rem margin + its line), then .intro adds 5vh above the h1 */
  padding: calc(3.4rem + 5vh) 0 2vh;
}

.hero-inner {
  /* max-width: 660px; */
  position: relative;
}

.name {
  font-size: clamp(2.6rem, 9vw, 4rem);
  line-height: 0.98;
}

.tagline {
  font-family: var(--serif-display);
  font-weight: 300;
  font-size: clamp(1.1rem, 2vw, 1.45rem);
  line-height: 1.3;
  color: var(--text-dim);
  margin: 0.6rem 0 1.1rem;
}

/* NB: no `display` here — this class lands on SocialRow's root <nav> and would
   override its grid. */
.hero-socials {
  margin-bottom: 0.9rem;
}

/* centred layout: name, tagline, socials grid and nav all sit on the centre line */
.hero-inner { text-align: center; }
.hero-inner :deep(.socials) { justify-content: center; }
.hero-inner :deep(.socials a) { margin-left: 0; }
.hero-inner :deep(.mainnav) { margin-inline: auto; }
.hero-inner :deep(.mainnav a),
.hero-inner :deep(.mainnav a:hover) {
  justify-content: center;
  padding-inline: 0.2rem;   /* no hover slide: it would knock the label off-centre */
}
</style>

