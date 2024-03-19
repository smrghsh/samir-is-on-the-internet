const path = require('path');

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['assets/normalize.css'],
  devtools: { enabled: true },
  nitro: {
    output: {
      publicDir: path.join(__dirname, 'docs')
    }
  }
})
