import glsl from 'vite-plugin-glsl'



// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	vite: {
		plugins: [glsl()],
	},
  modules: [
    '@nuxt/content'
  ],
  // to fix three?
  build:{
    transpile:["three", "meshline"]
},
  content: {
    contentHead: false
  },
  // modules: ['@nuxtjs/eslint-module'],
  css: ['assets/styles/normalize.css','assets/styles/main.css','assets/styles/v8-tokens.css'],
  // Disabled: the DevTools/vue-inspector overlay (z-index 2147483647) was
  // rendering as a white sheet over the whole page in light mode and covering
  // the lil-gui panel. Re-enable once we're done if you want it back.
  devtools: { enabled: false },
  app: {
    // Mirror the reference's <html class="theme-dark">: dark is the SSR default
    // so there's no light flash before Topo.vue hydrates and toggles the class.
    head: { htmlAttrs: { class: 'theme-dark' } },
  },
})
