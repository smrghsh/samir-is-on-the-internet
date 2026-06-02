<template>
  <!-- Liquid-glass project card. Slot receives the <article> with img/h3/
       content/links, same contract as the original Card.vue. -->
  <div class="card glass">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.card {
  width: 280px;
  max-width: 92vw;
  padding: 0.9rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
}

:deep(.thumb) {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 11px;
  display: block;
}
:deep(.card-title) {
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  font-size: 1.08rem;
  margin: 0.8rem 0 0.1rem;
}
:deep(.card-title .time) {
  color: var(--text-faint);
  font-size: 0.85rem;
  font-weight: 300;
}
:deep(p) {
  font-size: 0.86rem;
  line-height: 1.5;
  color: var(--text-dim);
  margin: 0.3rem 0 0;
}

/* lighter border in light mode (matches the bio card; avoids the bright
   white glass outline) */
</style>
