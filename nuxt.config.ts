import glsl from 'vite-plugin-glsl'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    plugins: [glsl()],
  },
  modules: ['@nuxt/content'],
  build: {
    transpile: ['three', 'meshline', 'lil-gui'],
  },
  content: {
    contentHead: false,
  },
  css: ['assets/styles/normalize.css', 'assets/styles/main.css', 'assets/styles/v8-tokens.css'],
  // DevTools overlay disabled: its z-index 2147483647 rendered as a white sheet
  // over the page in light mode and covered the lil-gui panel.
  devtools: { enabled: false },
  app: {
    head: {
      // dark is the SSR default so there's no light flash before hydration
      htmlAttrs: { class: 'theme-dark' },
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }],
    },
  },
})
