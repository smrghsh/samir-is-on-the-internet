<template>
  <div>
    <Topo />

    <div class="cv-page">
      <NuxtLink class="back" to="/">← back to samir.tech</NuxtLink>

      <header class="intro">
        <p class="kicker">// credentials</p>
        <h1 class="name">CV &amp; Resume</h1>
        <p class="lede">Feel free to download these. I keep a short <em>one-page resume</em> and a longer academic-style <em>CV</em>.</p>
      </header>

      <ul class="downloads glass">
        <li v-for="doc in docs" :key="doc.file">
          <!-- root-absolute ('/' + file) so the download resolves to the PDF at
               the site root regardless of a trailing slash on the page URL; the
               displayed filename below stays bare. -->
          <a :href="'/' + doc.file" download>
            <span class="ic">PDF</span>
            <span class="body">
              <span class="dname">{{ doc.title }}</span>
              <span class="meta">{{ doc.file }} · {{ doc.pages }}</span>
            </span>
            <span class="dl" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 4v10" />
                <path d="m8 11 4 4 4-4" />
                <path d="M5 19h14" />
              </svg>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// CV & Resume — the original simple two-link list, dressed in the v8 system.
// PDFs live in /public (served at root), same as the original page's hrefs.
const docs = [
  { title: 'Resume', file: 'Resume_Samir_Ghosh-Oct-2025.pdf', pages: '1 page' },
  { title: 'Curriculum Vitae', file: 'CV_Samir_Ghosh-Jun-2026.pdf', pages: '6 pages' },
]
</script>

<style scoped>
.cv-page {
  position: relative; z-index: 2; width: 100%;
  /* left-aligned like the homepage — var(--three) from the window edge. */
  max-width: 720px; padding: 0 var(--three);
}
.back {
  display: inline-flex; align-items: center; gap: 0.5rem; margin: 2.4rem 0 0;
  font-family: ui-monospace, monospace; font-size: 0.8rem; color: var(--text-dim);
  text-decoration: none; transition: gap 200ms var(--ease), color 200ms var(--ease);
}
.back:hover { gap: 0.8rem; color: var(--link); }

.intro { padding: 5vh 0 1.5vh; }
.kicker {
  font-family: ui-monospace, monospace; font-size: 0.82rem; color: var(--text-dim);
  letter-spacing: 0.06em; margin: 0 0 0.5rem;
}
.name {
  font-family: 'Raleway', sans-serif; font-weight: 100;
  font-size: clamp(2.6rem, 6vw, 4rem); line-height: 0.98; margin: 0;
}
.lede { font-size: 1.12rem; line-height: 1.6; color: var(--text-dim); font-weight: 300; margin: 1rem 0 0; max-width: 560px; }
.lede em { font-style: normal; color: var(--link); }

.downloads {
  list-style: none; margin: 3vh 0 8vh; padding: 0.6rem; border-radius: 18px;
  display: flex; flex-direction: column;
}
.downloads li + li { border-top: 1px solid var(--contour-minor); }
.downloads a {
  display: flex; align-items: center; gap: 1rem; padding: 1.1rem 1rem; text-decoration: none;
  color: var(--text); border-radius: 12px;
  transition: background 200ms var(--ease), padding-left 220ms var(--ease);
}
.downloads a:hover { background: var(--glass-strong); padding-left: 1.4rem; }
.downloads .ic {
  flex: none; width: 2.4rem; height: 2.4rem; border-radius: 10px; display: grid; place-items: center;
  border: 1px solid var(--glass-border); color: var(--link);
  font-family: ui-monospace, monospace; font-size: 0.62rem; letter-spacing: 0.04em;
  background: light-dark(rgba(46, 122, 77, 0.08), rgba(127, 212, 154, 0.08));
}
.downloads .body { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
.downloads .body .dname { font-family: 'Raleway', sans-serif; font-weight: 300; font-size: 1.15rem; }
.downloads .body .meta {
  font-family: ui-monospace, monospace; font-size: 0.72rem; color: var(--text-faint); letter-spacing: 0.04em;
}
/* download button — bordered chip matching the PDF badge (.ic), trailing-
   aligned down the list so the two chips bookend each row. */
.downloads .dl {
  margin-left: auto; flex: none;
  width: 2.4rem; height: 2.4rem; border-radius: 10px;
  display: grid; place-items: center;
  border: 1px solid var(--glass-border); color: var(--link);
  background: light-dark(rgba(46, 122, 77, 0.08), rgba(127, 212, 154, 0.08));
  transition: background 200ms var(--ease), border-color 200ms var(--ease);
}
.downloads .dl svg { width: 1.15rem; height: 1.15rem; display: block; }
/* on row hover, emphasize the button so it clearly reads as the action target */
.downloads a:hover .dl {
  border-color: var(--link);
  background: light-dark(rgba(46, 122, 77, 0.14), rgba(127, 212, 154, 0.16));
}
</style>

<!-- Light-mode overrides as GLOBAL `:root.theme-light` rules in an UNSCOPED
     block — never Vue-scoped `:global(.theme-light)` (it mis-scopes onto
     <html>; the white-sheet bug). The .downloads sheen dim is already handled
     by v8-tokens' :root.theme-light .glass::after rule (.downloads has .glass). -->
<style>
/* soften the bright light-mode glass border on the downloads panel. */
:root.theme-light .downloads { border-color: rgba(20, 40, 30, 0.10); }

/* light-mode legibility scrim behind the intro header — homepage-style, flush
   to the window's left edge (-140px) and fading right; matches bio.vue. */
:root.theme-light .cv-page .intro { position: relative; }
:root.theme-light .cv-page .intro::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 3vh -2rem 0.5vh -140px;
  background: linear-gradient(95deg,
    rgba(245, 243, 238, 0.5) 0%,
    rgba(245, 243, 238, 0.48) 55%,
    rgba(245, 243, 238, 0.28) 78%,
    rgba(245, 243, 238, 0) 100%);
  filter: blur(14px);
  pointer-events: none;
}
</style>
