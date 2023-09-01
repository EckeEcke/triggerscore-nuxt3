import { useStore } from '../stores/store'

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path.includes('/movie/')) {
    const store = useStore()
    const regionProvider = computed(() => {
      if (store.locale === "en") {
        return "GB"
      }
      return store.locale.toUpperCase()
    })

    async function loadMovie() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${to.params.id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${store.locale}`)
        const loadedMovie = await response.json()
        store.selectedMovie = loadedMovie
      } catch (error) {
        console.log("Oops, an error occurred while loading the movie:", error)
      }
    }

    async function loadProviders() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${to.params.id}/watch/providers?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c`)
        const providers = await response.json()
        const regionProviders = providers.results[regionProvider.value]?.flatrate || []
        store.selectedMovieOnNetflix = regionProviders.some((provider: any) => provider.provider_name === "Netflix")
        store.selectedMovieOnPrime = regionProviders.some((provider: any) => provider.provider_name === "Amazon Prime Video")
        store.selectedMovieOnDisney = regionProviders.some((provider: any) => provider.provider_name === "Disney Plus")
        store.selectedMovieOnSky = regionProviders.some((provider: any) => provider.provider_name === "WOW")
      } catch (error) {
        console.log("Oops, an error occurred while loading the providers:", error)
      }
    }

    async function loadTriggerscore() {
      try {
        const response = await fetch(`https://triggerscore-backend2.onrender.com/movie/${to.params.id}`)
        const scores = await response.json()
        store.selectedMovieScore = scores[0]
      } catch (error) {
        console.log("Oops, an error occurred while loading the Triggerscore:", error)
      }
    }

    // Use Promise.all to wait for all async functions to finish
    try {
      await Promise.all([loadMovie(), loadProviders(), loadTriggerscore()])
      // All async functions have completed
    } catch (error) {
      // Handle any errors that occurred during the async functions
      console.error("Oops, an error occurred while loading data:", error)
    }
  }
})