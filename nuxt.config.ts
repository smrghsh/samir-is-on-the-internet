import glsl from 'vite-plugin-glsl'

const path = require('path');

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	vite: {
		plugins: [glsl()],
	},
  // modules: ['@nuxtjs/eslint-module'],
  css: ['assets/styles/normalize.css','assets/styles/main.css'], 
  devtools: { enabled: true },
  nitro: {
    output: {
      publicDir: path.join(__dirname, 'docs')
    }
  }
})
