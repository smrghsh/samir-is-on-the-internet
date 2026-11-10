<template>
  <div class="colophon-page">
    <header class="intro">
      <h1 class="name">Colophon</h1>
    </header>

    <!-- copy lives in content/colophon.md; edit the .md, not this file. -->
    <div class="glass reading prose colophon">
      <ContentDoc :head="false" path="/colophon" />
    </div>
  </div>
</template>

<style scoped>
.colophon-page { max-width: 680px; margin-inline: auto; }
.intro { padding-bottom: 1vh; }

.colophon :deep(p) { max-width: 60ch; margin-bottom: 1.3rem; }
/* big Raleway statement line — only a <strong> that IS its own paragraph */
.colophon :deep(p > strong) {
  font-family: var(--serif-display); font-weight: 300; font-size: 1.32rem;
  display: inline-block; margin: 0.4rem 0;
}
/* contour-tick bullets, echoing the map motif */
.colophon :deep(ul) { list-style: none; padding: 0; margin: 0 0 1.6rem; display: flex; flex-direction: column; gap: 0.9rem; }
.colophon :deep(li) {
  position: relative; padding-left: 1.6rem; margin: 0; font-size: 1.05rem; line-height: 1.6; max-width: 58ch;
  /* 0.82, not --text-dim: dimmer white is too murky on the glass card */
  color: rgba(255, 255, 255, 0.82);
}
.colophon :deep(li)::before {
  content: ''; position: absolute; left: 0; top: 0.62em; width: 0.7rem; height: 0;
  border-top: 1.5px solid var(--contour-index);
}
</style>
