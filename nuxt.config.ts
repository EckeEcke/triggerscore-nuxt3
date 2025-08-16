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
      '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  postcss: {
      plugins: {
      tailwindcss: {},
      autoprefixer: {},
      },
  },

  modules: ['@pinia/nuxt', '@nuxtjs/robots', '@nuxtjs/i18n', '@nuxt/eslint'],

  // @ts-ignore
  i18n: {
      locales: [
          { code: 'de', name: 'German', file: 'de.json' },
          { code: 'en', name: 'English UK', file: 'en.json' },
          { code: 'es', name: 'Spanish', file: 'es.json' },
          { code: 'fr', name: 'French', file: 'fr.json' },
          { code: 'us', name: 'English US', file: 'us.json' },
      ],
      defaultLocale: 'de',
      strategy: 'prefix',
      detectBrowserLanguage: false,
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