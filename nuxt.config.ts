// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@sidebase/nuxt-auth'
  ],

  build: {
    transpile: ['trpc-nuxt']
  },

  auth: {
    provider: {
      type: 'authjs'
    }
  },

  colorMode: {
    classSuffix: ''
  },

  devtools: {
    enabled: true
  },

  css: [
    '~/assets/css/main.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
