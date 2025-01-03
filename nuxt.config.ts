const i18nLocales = ['de', 'en', 'es', 'fr', 'us']

export default defineNuxtConfig({
    ssr: false, // delete when maintenance is over
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
        preset: "vercel"
    }
    /*
    nitro: {
        devProxy: {
            '/.netlify/functions/': {
                target: 'http://localhost:8888',
                changeOrigin: true, 
            }
        }
    }
        */
})
