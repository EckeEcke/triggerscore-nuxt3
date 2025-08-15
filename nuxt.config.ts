const i18nLocales = ['de', 'en', 'es', 'fr', 'us']
import { defineNuxtConfig } from 'nuxt/config'

// @ts-nocheck
export default defineNuxtConfig({
  // ssr: false, // delete when maintenance is over
  app: {
      head: {
          link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }]
      }
  },

  build: {
      transpile: ['@fortawesome/vue-fontawesome']
  },

  css: [
      '~/assets/css/main.css',
      '@fortawesome/fontawesome-svg-core/styles.css',
      'vue3-lottie/dist/style.css'
  ],

  postcss: {
      plugins: {
      tailwindcss: {},
      autoprefixer: {},
      },
  },

  modules: ['@pinia/nuxt', '@nuxtjs/robots', '@nuxtjs/i18n'],

  // @ts-ignore
  i18n: {
      locales: i18nLocales,
      defaultLocale: 'de',
      strategy: 'prefix_except_default',
      detectBrowserLanguage: false,
      vueI18n: "./i18n.config.ts",
  },

  runtimeConfig: {
      apiKey: process.env.TMDB_API_KEY,
  },

  nitro: {
      devProxy: {
          '/.netlify/functions/': {
              target: 'http://localhost:8888',
              changeOrigin: true, 
          }
      }
  },

  compatibilityDate: '2025-04-16'
})