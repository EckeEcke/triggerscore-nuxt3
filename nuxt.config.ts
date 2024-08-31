const i18nLocales = ['de', 'en', 'es', 'fr', 'us']
const getContactRouteForAllLocales = () => {
    const routesToPrerender = ['/contact'];

    return i18nLocales.flatMap(lang => routesToPrerender.map(route => `/${lang}${route}`))
}

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
        locales: i18nLocales,
        defaultLocale: 'de',
        strategy: 'prefix',
        detectBrowserLanguage: false,
        vueI18n: "./i18n.config.ts",
    },
})
