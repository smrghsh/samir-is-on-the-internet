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
    </a>
  </nav>
</template>

<script setup lang="ts">
// Icons live in assets/images/social-icons/. With Nuxt, import them so the
// bundler fingerprints them; or reference /public paths if you move them there.
const base = '/images/social-icons'
const socials = [
  { name: 'github',        url: 'https://github.com/smrghsh',                                          icon: `${base}/github.svg` },
  { name: 'instagram',     url: 'https://www.instagram.com/vertex.shader/',                            icon: `${base}/instagram.svg` },
  { name: 'linkedin',      url: 'https://www.linkedin.com/in/vertexshader',                            icon: `${base}/linkedin.svg` },
  { name: 'googlescholar', url: 'https://scholar.google.com/citations?hl=en&user=XJdXFN4AAAAJ',        icon: `${base}/googlescholar.svg` },
  { name: 'orcid',         url: 'https://orcid.org/0009-0004-4575-4954',                               icon: `${base}/orcid.svg` },
  { name: 'substack',      url: 'https://vertexshader.substack.com/',                                  icon: `${base}/substack.svg` },
]
</script>

<style scoped>
.socials { display: flex; gap: 0.5rem; align-items: center; }
.socials a {
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 8px;
  transition: background 200ms var(--ease), transform 200ms var(--ease);
}
.socials a:hover { background: var(--glass); transform: translateY(-1px); }
.ico {
  width: 1.4rem;
  height: 1.4rem;
  background-color: var(--text);
  -webkit-mask-size: contain; mask-size: contain;
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
  -webkit-mask-position: center; mask-position: center;
}
</style>
