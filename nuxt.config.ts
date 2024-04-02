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
  // modules: ['@nuxtjs/eslint-module'],
  css: ['assets/styles/normalize.css','assets/styles/main.css'],
  devtools: { enabled: true }
})
