import { useStore } from "../stores/store"

export default defineNuxtRouteMiddleware(async (to) => {
  console.log(to.fullPath.split("/")[0])
  if (to.path.includes("/movie/")) {
    const store = useStore()
    const localeFromFullPath = to.fullPath.split("/")[1]
    const validLocales = ['de', 'en', 'es', 'fr', 'us']
    const locale = validLocales.includes(localeFromFullPath) ? localeFromFullPath : 'de'
    store.loadingSelectedMovie = true
    const regionProvider = computed(() => {
      if (locale === "en") {
        return "GB"
      }
      return locale.toUpperCase()
    })

    async function loadMovie() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${to.params.id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${locale}`
        )
        const loadedMovie = await response.json()
        store.selectedMovie = loadedMovie
      } catch (error) {
        Promise.reject()
        console.log("Oops, an error occurred while loading the movie:", error)
      }
    }

    async function loadProviders() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${to.params.id}/watch/providers?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c`
        )
        const providers = await response.json()
        const regionProviders = providers.results
          ? providers.results[regionProvider.value]?.flatrate
          : []
        store.selectedMovieOnNetflix = regionProviders.some(
          (provider: any) => provider.provider_name === "Netflix"
        )
        store.selectedMovieOnPrime = regionProviders.some(
          (provider: any) => provider.provider_name === "Amazon Prime Video"
        )
        store.selectedMovieOnDisney = regionProviders.some(
          (provider: any) => provider.provider_name === "Disney Plus"
        )
        store.selectedMovieOnSky = regionProviders.some(
          (provider: any) => provider.provider_name === "WOW"
        )
      } catch (error) {
        console.log(
          "Oops, an error occurred while loading the providers:",
          error
        )
      }
    }

    async function loadTriggerscore() {
      try {
        const response = await fetch(
          `https://triggerscore-backend2.onrender.com/movie/${to.params.id}`
        )
        const scores = await response.json()
        store.selectedMovieScore = scores[0]
      } catch (error) {
        console.log(
          "Oops, an error occurred while loading the Triggerscore:",
          error
        )
      }
    }

    // Use Promise.all to wait for all async functions to finish
    try {
      await Promise.all([loadMovie(), loadProviders(), loadTriggerscore()])
      store.loadingSelectedMovie = false
      // All async functions have completed
    } catch (error) {
      // Handle any errors that occurred during the async functions
      store.loadingSelectedMovie = false
      clearError()
      await navigateTo("/")
      console.error("Oops, an error occurred while loading data:", error)
    }
  }
})
