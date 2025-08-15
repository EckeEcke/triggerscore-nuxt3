<template>
  <LoadingAnimation v-show="isLoading" />
  <Detailpage v-if="!isLoading" />
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useStore } from '~/stores/store'
import { useRoute } from 'vue-router'
import LoadingAnimation from '~/components/animations/LoadingAnimation.vue'

const route = useRoute()
const id = route.params.id

const isLoading = ref(true)
const store = useStore()
const { locale } = useI18n()
store.loadingSelectedMovie = true

const loadMovie = async () => {
  const existingMovie = store.movies.find(movie => movie.id.toString() === id)
  if (existingMovie) {
    store.selectedMovie = existingMovie
    return Promise.resolve()
  }

  try {
    const { data } = await useFetch(
      `/api/movie/${id}?locale=${locale.value}`
    )
    store.selectedMovie = data.value as any
  } catch (error) {
    await Promise.reject()
    console.log('Oops, an error occurred while loading the movie: ', error)
  }
}

const loadTriggerscore = async () => {
  const existingScore = store.triggerscores.find(
    score => score.movie_id.toString() === id
  )
  if (existingScore) {
    store.selectedMovieScore = existingScore
    return Promise.resolve()
  }
  try {
    const response = await fetch(
      `https://www.triggerscore.de/.netlify/functions/fetchMovieById?id=${id}`
    )
    const scores = await response.json()
    store.selectedMovieScore = scores[0]
  } catch (error) {
    console.log(
      'Oops, an error occurred while loading the Triggerscore: ',
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
  await navigateTo('/')
  console.error('Oops, an error occurred while loading data: ', error)
}
</script>
