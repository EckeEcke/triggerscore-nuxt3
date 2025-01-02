<template>
  <LoadingAnimation v-show="isLoading" />
  <Detailpage v-if="!isLoading" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from "~/stores/store"
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const isLoading = ref(true)
const store = useStore()
const { locale } = useI18n()
store.loadProviderData(locale.value)
store.loadingSelectedMovie = true
const regionProvider = computed(() => {
  if (locale.value === "en") {
    return "GB"
  }
  return locale.value.toUpperCase()
})

async function loadMovie() {
  const existingMovie = store.movies.find(movie => movie.movie_id === id)
  if (existingMovie) {
    store.selectedMovie = existingMovie
    return Promise.resolve()
  }

  try {
    const { data } = await useFetch(
      `/api/movie/${id}?locale=${locale.value}`
    )
    const loadedMovie = data.value as any
    store.selectedMovie = loadedMovie
  } catch (error) {
    Promise.reject()
    console.log("Oops, an error occurred while loading the movie:", error)
  }
}

async function loadTriggerscore() {
  try {
    const response = await fetch(
      `https://www.triggerscore.de/.netlify/functions/fetchMovieById?id=${id}`
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
  await Promise.all([loadMovie(), loadTriggerscore()])
  store.loadingSelectedMovie = false
  isLoading.value = false
  // All async functions have completed
} catch (error) {
  // Handle any errors that occurred during the async functions
  store.loadingSelectedMovie = false
  clearError()
  await navigateTo("/")
  console.error("Oops, an error occurred while loading data:", error)
}
</script>
