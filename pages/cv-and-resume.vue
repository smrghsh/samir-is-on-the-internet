<template>
  <div class="cv-page">
    <header class="intro">
      <h1 class="name">CV and Resume</h1>
      <p class="lede">I keep a short <em>one-page resume</em> and a long academic-style <em>CV</em>. Feel free to download these.</p>
    </header>

    <ul class="downloads glass">
      <li v-for="doc in docs" :key="doc.file">
        <!-- root-absolute href so the PDF resolves regardless of a trailing
             slash on the page URL -->
        <a :href="'/' + doc.file" download>
          <span class="chip">PDF</span>
          <span class="body">
            <span class="dname">{{ doc.title }}</span>
            <span class="meta">{{ doc.file }} · {{ doc.pages }}</span>
          </span>
          <span class="chip dl" aria-hidden="true">
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
</template>

<script setup lang="ts">
// PDFs live in /public (served at root).
const docs = [
  { title: 'Resume', file: 'Resume_Samir_Ghosh-Jun-2026.pdf', pages: '1 page' },
  { title: 'Curriculum Vitae', file: 'CV_Samir_Ghosh-Oct-2026.pdf', pages: '5 pages' },
]
</script>

<style scoped>
.cv-page { max-width: 720px; margin-inline: auto; }
.intro { padding-bottom: 1.5vh; }

.downloads {
  list-style: none; margin: 3vh 0 8vh; padding: 0.6rem;
  display: flex; flex-direction: column;
}
.downloads li + li { border-top: 1px solid var(--contour-minor); }
.downloads a {
  display: flex; align-items: center; gap: 1rem; padding: 1.1rem 1rem; text-decoration: none;
  color: var(--text); border-radius: 12px;
  transition: background 200ms var(--ease), padding-left 220ms var(--ease);
}
.downloads a:hover { background: var(--glass-strong); padding-left: 1.4rem; }
/* the PDF badge and the download button share one chip style and bookend the row */
.chip {
  flex: none; width: 2.4rem; height: 2.4rem; border-radius: 10px; display: grid; place-items: center;
  border: 1px solid var(--glass-border); color: var(--link);
  font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.04em;
  background: rgba(64, 224, 208, 0.08);
  transition: background 200ms var(--ease), border-color 200ms var(--ease);
}
.chip.dl { margin-left: auto; }
.chip svg { width: 1.15rem; height: 1.15rem; display: block; }
.downloads a:hover .dl {
  border-color: var(--link);
  background: rgba(64, 224, 208, 0.16);
}
.body { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
.dname { font-family: var(--serif-display); font-weight: 300; font-size: 1.15rem; }
.meta { font-family: var(--mono); font-size: 0.72rem; color: var(--text-faint); letter-spacing: 0.04em; }
</style>
