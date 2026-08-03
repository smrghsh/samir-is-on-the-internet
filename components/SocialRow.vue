<template>
  <nav class="socials">
    <a v-for="s in socials" :key="s.name" :href="s.url" :title="s.name" target="_blank" rel="noopener">
      <!-- Recolored to --text via CSS mask (clean, no crude filter: invert) -->
      <span
        class="ico"
        :style="{
          webkitMaskImage: `url(${s.icon})`,
          maskImage: `url(${s.icon})`,
        }"
      ></span>
      <span class="handle">{{ s.handle }}</span>
    </a>
  </nav>
</template>

<script setup lang="ts">
// dandelion-wish-style attribution rows: icon + handle, so each link says
// where it goes. 2 columns on phones, 3 on desktop (see grid below).
const base = '/images/social-icons'
const socials = [
  { name: 'github',        handle: '@smrghsh',            url: 'https://github.com/smrghsh',                                          icon: `${base}/github.svg` },
  { name: 'instagram',     handle: '@vertex.shader',      url: 'https://www.instagram.com/vertex.shader/',                            icon: `${base}/instagram.svg` },
  { name: 'linkedin',      handle: 'in/vertexshader',     url: 'https://www.linkedin.com/in/vertexshader',                            icon: `${base}/linkedin.svg` },
  { name: 'googlescholar', handle: 'scholar',             url: 'https://scholar.google.com/citations?hl=en&user=XJdXFN4AAAAJ',        icon: `${base}/googlescholar.svg` },
  { name: 'orcid',         handle: 'orcid',               url: 'https://orcid.org/0009-0004-4575-4954',                               icon: `${base}/orcid.svg` },
  { name: 'substack',      handle: 'vertexshader',        url: 'https://vertexshader.substack.com/',                                  icon: `${base}/substack.svg` },
]
</script>

<style scoped>
.socials {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, max-content));
  column-gap: 1.6rem;
  row-gap: 0.35rem;
}
@media (max-width: 600px) {
  .socials { grid-template-columns: repeat(2, minmax(0, max-content)); column-gap: 1.3rem; }
}
.socials a {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.22rem 0.3rem;
  margin-left: -0.3rem; /* optical: icons align with the text column edge */
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-dim);
  transition: background 200ms var(--ease), color 200ms var(--ease);
}
.socials a:hover { background: var(--glass); color: var(--text); }
.handle {
  font-size: 0.85rem;
  font-weight: 420;
  letter-spacing: 0.03em;
  white-space: nowrap;
}
.ico {
  width: 1.05rem;
  height: 1.05rem;
  flex-shrink: 0;
  background-color: currentColor;
  -webkit-mask-size: contain; mask-size: contain;
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
  -webkit-mask-position: center; mask-position: center;
}
</style>
