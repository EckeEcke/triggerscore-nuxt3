import { defineNuxtConfig } from 'nuxt/config'

// @ts-nocheck
export default defineNuxtConfig({
	future: {
		compatibilityVersion: 4
	},
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

	vite: {
		resolve: {
			alias: {
				'lottie-web': 'lottie-web/build/player/lottie_light.js'
			}
		}
	},

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {}
		}
	},

	modules: ['@pinia/nuxt', '@nuxtjs/robots', '@nuxtjs/i18n', '@nuxt/eslint'],

	i18n: {
		langDir: 'locales',
		locales: [
			{ code: 'de', name: 'German', file: 'de.json' },
			{ code: 'en', name: 'English UK', file: 'en.json' },
			{ code: 'es', name: 'Spanish', file: 'es.json' },
			{ code: 'fr', name: 'French', file: 'fr.json' },
			{ code: 'us', name: 'English US', file: 'us.json' }
		],
		lazy: true,
		defaultLocale: 'de',
		strategy: 'prefix',
		detectBrowserLanguage: false
	},

	runtimeConfig: {
		apiKey: process.env.TMDB_API_KEY,
		public: {
			isLocal: process.env.NUXT_PUBLIC_IS_LOCAL
		}
	},

	nitro: {
		devProxy: {
			'/.netlify/functions/': {
				target: 'http://localhost:8888',
				changeOrigin: true
			}
		},
		prerender: {
			routes: ['/about', '/contact', '/stats']
		}
	},

	routeRules: {
		'/de/contact': { prerender: true },
		'/en/contact': { prerender: true },
		'/es/contact': { prerender: true },
		'/fr/contact': { prerender: true },
		'/us/contact': { prerender: true }
	},

	compatibilityDate: '2025-04-16'
})
