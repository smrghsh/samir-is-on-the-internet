import glsl from 'vite-plugin-glsl'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    plugins: [glsl()],
  },
  modules: ['@nuxt/content'],
  build: {
    transpile: ['three', 'lil-gui'],
  },
  content: {
    contentHead: false,
  },
  css: ['assets/styles/site.css'],
  // DevTools overlay disabled: its z-index 2147483647 covers the lil-gui panel.
  devtools: { enabled: false },
  app: {
    head: {
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }],
    },
  },
})
