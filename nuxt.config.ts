// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxtjs/robots', '@nuxtjs/i18n'],
    i18n: {
        locales: ['de', 'en', 'es', 'fr', 'us'],
        defaultLocale: 'de',
        strategy: 'prefix',
        detectBrowserLanguage: false,
        vueI18n: "./i18n.config.ts",
    }
})
