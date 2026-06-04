<template>
  <div>
    <!-- shared backdrop + panel, same as the homepage -->
    <Topo />

    <div class="bio-page">
      <NuxtLink class="back" to="/">← back to samir.tech</NuxtLink>

      <header class="intro">
        <p class="kicker">// about me</p>
        <h1 class="name">Bio</h1>
        <p class="lede">Same person, different narrators. Pick who writes it — and how long.</p>
      </header>

      <!-- the instrument -->
      <div class="instrument glass">
        <div class="instr-row">
          <div class="field">
            <span class="lbl">written by</span>
            <div class="seg">
              <button
                v-for="m in BIO_MODELS"
                :key="m.id"
                :data-on="m.id === model"
                :data-human="m.id === 'human'"
                @click="model = m.id"
              >
                <span class="dot"></span>{{ m.label }}
              </button>
            </div>
          </div>
          <div class="field">
            <span class="lbl">length</span>
            <div class="len">
              <input type="range" min="50" max="250" step="50" v-model.number="words" />
              <span class="val">{{ words }} words</span>
            </div>
          </div>
        </div>
      </div>

      <!-- provenance -->
      <p class="provenance" :class="{ 'is-ai': isAI }">
        <span class="tag">{{ isAI ? '⚠ generated' : '// human' }}</span>
        <span>· {{ activeModel.note }}</span>
        <span class="reading">· ~{{ wordCount }} words</span>
      </p>

      <!-- bio reading card -->
      <div class="bio-card glass" :class="{ swapping }">
        <p v-for="(para, i) in paragraphs" :key="i">{{ para }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { BIO_MODELS, BIO_COPY } from '~/utils/bioCopy'

const model = ref<'human' | 'chatGPT' | 'gemini' | 'claude'>('human')
const words = ref(250)
const swapping = ref(false)

const activeModel = computed(() => BIO_MODELS.find((m) => m.id === model.value)!)
const isAI = computed(() => model.value !== 'human')
const paragraphs = computed(() => BIO_COPY[`${model.value}${words.value}`] ?? ['—'])
const wordCount = computed(() => paragraphs.value.join(' ').split(/\s+/).filter(Boolean).length)

// brief fade on change (CSS handles the opacity transition)
watch([model, words], () => {
  swapping.value = true
  setTimeout(() => (swapping.value = false), 180)
})
</script>

<style scoped>
.bio-page {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 880px;
  /* Left-aligned (not centered) so the column hugs the left edge like the
     homepage — content sits var(--three) from the window edge, same inset as
     the hero/main, which also makes the -140px intro scrim reliably flush at
     every width. */
  padding: 0 var(--three);
}

.back {
  display: inline-flex; align-items: center; gap: 0.5rem; margin: 2.4rem 0 0;
  font-family: ui-monospace, monospace; font-size: 0.8rem; color: var(--text-dim);
  text-decoration: none; transition: gap 200ms var(--ease), color 200ms var(--ease);
}
.back:hover { gap: 0.8rem; color: var(--link); }

.intro { padding: 5vh 0 3vh; }
.kicker {
  font-family: ui-monospace, monospace; font-size: 0.82rem; color: var(--text-dim);
  letter-spacing: 0.06em; margin: 0 0 0.5rem;
}
.name {
  font-family: 'Raleway', sans-serif; font-weight: 100;
  font-size: clamp(2.6rem, 6vw, 4rem); line-height: 0.98; margin: 0;
}
.lede {
  font-family: 'Raleway', sans-serif; font-weight: 200;
  font-size: clamp(1.05rem, 1.7vw, 1.35rem); color: var(--text-dim);
  margin: 0.7rem 0 0; max-width: 600px;
}

/* ── instrument ───────────────────────────────────────────────────── */
.instrument { padding: 1.2rem 1.3rem; border-radius: 16px; margin: 1vh 0 1.6rem; }
.instr-row { display: flex; flex-wrap: wrap; align-items: center; gap: 1.4rem 2rem; }
.field { display: flex; flex-direction: column; gap: 0.5rem; }
.field > .lbl {
  font-family: ui-monospace, monospace; font-size: 0.68rem; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--text-faint);
}

.seg {
  display: flex; gap: 2px; padding: 3px; border-radius: 11px;
  background: light-dark(rgba(20, 40, 30, 0.06), rgba(255, 255, 255, 0.05));
  border: 1px solid var(--glass-border);
}
.seg button {
  font-family: 'Nunito Sans', sans-serif; font-size: 0.86rem; color: var(--text-dim);
  background: transparent; border: 0; padding: 0.42rem 0.85rem; border-radius: 8px; cursor: pointer;
  display: flex; align-items: center; gap: 0.42rem;
  transition: color 180ms var(--ease), background 180ms var(--ease);
}
.seg button .dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; opacity: 0.65; }
.seg button[data-on='true'] {
  color: var(--text);
  background: light-dark(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.12));
}
.seg button[data-on='true'][data-human='false'] { color: var(--link); }
.seg button:hover { color: var(--text); }

.len { display: flex; align-items: center; gap: 0.9rem; min-width: 240px; }
.len input[type='range'] {
  -webkit-appearance: none; appearance: none; width: 180px; height: 4px;
  border-radius: 99px; background: var(--contour-minor); outline: none;
}
.len input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none; width: 16px; height: 16px; border-radius: 50%;
  background: var(--link); cursor: pointer; border: 2px solid var(--bg);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}
.len input[type='range']::-moz-range-thumb {
  width: 16px; height: 16px; border-radius: 50%; background: var(--link);
  cursor: pointer; border: 2px solid var(--bg);
}
.len .val { font-family: ui-monospace, monospace; font-size: 0.82rem; color: var(--text); min-width: 4.2rem; }

/* ── provenance ───────────────────────────────────────────────────── */
.provenance {
  display: flex; align-items: center; gap: 0.55rem; margin: 0 0 0.9rem;
  font-family: ui-monospace, monospace; font-size: 0.78rem; color: var(--text-dim);
}
.provenance .tag {
  padding: 0.16rem 0.5rem; border-radius: 6px; border: 1px solid var(--border);
  letter-spacing: 0.04em; white-space: nowrap;
}
.provenance.is-ai .tag { color: var(--link); border-color: var(--link); }
.provenance .reading { color: var(--text-faint); }

/* ── reading card ─────────────────────────────────────────────────── */
.bio-card { padding: 2.4rem 2.6rem; border-radius: 18px; margin-bottom: 8vh; }
.bio-card p {
  font-size: 1.18rem; line-height: 1.66; font-weight: 300; margin: 0 0 1.15rem;
  transition: opacity 220ms var(--ease);
}
.bio-card p:last-child { margin-bottom: 0; }
.bio-card.swapping p { opacity: 0; }
.bio-card :deep(a) { color: var(--link); }

/* ── mobile: make the instrument fit ──────────────────────────────────
   The two fields stack (instr-row already wraps); each spans the full
   column. The 4-button segmented control can't shrink below its labels,
   so on phones it becomes a 2×2 grid that fills the width, and the length
   slider drops its fixed 180px/240px sizing to stretch instead. */
@media (max-width: 600px) {
  .instr-row { gap: 1.1rem; }
  .field { width: 100%; }
  .seg { display: grid; grid-template-columns: 1fr 1fr; width: 100%; }
  .seg button { justify-content: center; padding: 0.5rem 0.4rem; }
  .len { width: 100%; min-width: 0; }
  .len input[type='range'] { width: auto; flex: 1; min-width: 0; }
}
</style>

<!-- Light-mode overrides as GLOBAL `:root.theme-light` rules in an UNSCOPED
     block — NEVER Vue-scoped `:global(.theme-light)`. Per project memory, a
     scoped `:global(.theme-light) X::after/::before { opacity | filter }`
     mis-applies the declaration onto <html class="theme-light"> and fogs the
     whole page (the white-sheet bug). Global rules can't be mis-scoped. -->
<style>
/* soften the bright light-mode glass border on the instrument panel
   (.bio-card is already softened globally by v8-tokens.css). */
:root.theme-light .instrument { border-color: rgba(20, 40, 30, 0.10); }

/* light-mode legibility scrim behind the intro header — the same blurred
   "paper wash" the homepage hero uses (HeroIntro's :root.theme-light
   .hero-inner::before), homepage-style: the `-140px` left bleeds it flush past
   the window's left edge (the heading sits ~var(--three) from the edge, same as
   the hero), fading rightward into the terrain. Top/bottom insets stay positive
   to hug the heading, since .intro carries 5vh/3vh padding the hero-inner
   doesn't. The glass sheen dim is handled by v8-tokens' .glass::after rule. */
:root.theme-light .bio-page .intro { position: relative; }
:root.theme-light .bio-page .intro::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 3vh -2rem 2vh -140px;
  background: linear-gradient(95deg,
    rgba(245, 243, 238, 0.5) 0%,
    rgba(245, 243, 238, 0.48) 55%,
    rgba(245, 243, 238, 0.28) 78%,
    rgba(245, 243, 238, 0) 100%);
  filter: blur(14px);
  pointer-events: none;
}

/* light mode: the provenance line floats over the terrain between the two
   glass panels — nudge it a touch darker for legibility (no scrim). */
:root.theme-light .bio-page .provenance { color: rgba(20, 24, 22, 0.72); }
:root.theme-light .bio-page .provenance .reading { color: rgba(20, 24, 22, 0.55); }
</style>
