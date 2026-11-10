<template>
  <div class="bio-page">
    <header class="intro">
      <h1 class="name">About Me</h1>
      <!-- three separate centred paragraphs, one per sentence -->
      <p class="lede hello">hello world!</p>
      <p class="lede">My name is Samir, and I'm a virtual reality developer and creative coder.</p>
      <p class="lede">I'm currently finishing a PhD program UC Santa Cruz where I research how virtual reality can
        empower scientists to collaborate on challenging problems such as climate change and biological science.</p>
      <p class="lede">I'm open to work opportunities, and projects of any stage in immersive technology-- reach me at
        <a href="mailto:hello@samir.tech">hello@samir.tech</a>
      </p>
    </header>

    <!-- centred label, then the bare length slider + live word count beneath -->
    <div class="provenance">
      <p class="bio-label">official and convenient third-person biography</p>
      <div class="len-row">
        <input class="len" type="range" min="50" max="250" step="50" v-model.number="words"
          aria-label="biography length" />
        <span class="reading-count">{{ wordCount }} words</span>
        <button class="copy" type="button" @click="copyBio">{{ copied ? 'copied' : 'copy to clipboard' }}</button>
      </div>
    </div>

    <!-- bio reading card -->
    <div class="bio-card glass reading" :class="{ swapping }">
      <p v-for="(para, i) in paragraphs" :key="i">{{ para }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { BIO_COPY } from '~/utils/bioCopy'

const words = ref(250)
const swapping = ref(false)

const paragraphs = computed(() => BIO_COPY[words.value] ?? ['—'])
const wordCount = computed(() => paragraphs.value.join(' ').split(/\s+/).filter(Boolean).length)

// copy the biography at its current length (paragraphs separated by a blank line)
const copied = ref(false)
async function copyBio() {
  try {
    await navigator.clipboard.writeText(paragraphs.value.join('\n\n'))
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch { /* clipboard unavailable (insecure context / denied): leave the label alone */ }
}

// brief fade on change (CSS handles the opacity transition)
watch(words, () => {
  swapping.value = true
  setTimeout(() => (swapping.value = false), 180)
})
</script>

<style scoped>
.bio-page {
  max-width: 880px;
  margin-inline: auto;
  /* the whole column sits on the page's centre line */
}

.intro {
  padding-bottom: 3vh;
}

/* all three sentences share one measure: every <p> is the same 600px box and
   wraps at its full width. (site.css balances ledes, which shrinks each
   paragraph's lines to a different width — fine for one sentence, uneven for
   three stacked.) */
.intro .lede {
  width: 100%;
  text-wrap: wrap;
}

/* the greeting gets its own line in the coder's fixed-width face */
.intro .lede.hello {
  font-family: var(--mono);
  font-size: 1.05rem;
  letter-spacing: 0.02em;
  color: var(--text);
}

/* ── label, then bare length slider + word count (all centred) ─────── */
.provenance {
  margin: 1vh 0 1.1rem;
  text-align: center;
  font-family: var(--mono);
  color: var(--text-dim);
}

.bio-label {
  font-size: 0.92rem;
  margin: 0 0 0.7rem;
}

.len-row {
  display: flex;
  flex-wrap: wrap;
  /* phones: the button drops under the slider */
  justify-content: center;
  align-items: center;
  gap: 0.9rem;
  font-size: 0.78rem;
}

/* fixed width: the count changes length, the slider shouldn't shift */
.reading-count {
  color: var(--text-faint);
  width: 5.6rem;
  text-align: left;
}

.copy {
  font-family: var(--mono);
  font-size: 0.74rem;
  color: var(--text-dim);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.2rem 0.55rem;
  min-width: 9.6rem;
  /* "copy to clipboard" → "copied" without the row shifting */
  white-space: nowrap;
  cursor: pointer;
  transition: background 200ms var(--ease), border-color 200ms var(--ease), color 200ms var(--ease);
}

.copy:hover {
  background: var(--glass-strong);
  border-color: var(--link);
  color: var(--link);
}

.len {
  -webkit-appearance: none;
  appearance: none;
  width: 180px;
  height: 4px;
  margin: 0;
  border-radius: 99px;
  background: var(--contour-minor);
  outline: none;
}

.len::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--link);
  cursor: pointer;
  border: 1px solid var(--bg);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.len::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--link);
  cursor: pointer;
  border: 1px solid var(--bg);
}

/* ── reading card ─────────────────────────────────────────────────── */
.bio-card {
  margin-bottom: 8vh;
}

.bio-card p {
  font-size: 1.18rem;
  line-height: 1.66;
  margin: 0 0 1.15rem;
  transition: opacity 220ms var(--ease);
}

.bio-card p:last-child {
  margin-bottom: 0;
}

.bio-card.swapping p {
  opacity: 0;
}
</style>
