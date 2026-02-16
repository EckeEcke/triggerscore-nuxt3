<template>
  <LoadingAnimation v-show="isLoading" />
  <Detailpage v-if="!isLoading" />
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useStore } from '~/stores/store'
import { useRoute } from 'vue-router'
import LoadingAnimation from '~/components/animations/LoadingAnimation.vue'
import type { Movie } from '~/types/movie'

const route = useRoute()
const id = route.params.id

const isLoading = ref(true)
const store = useStore()
const { locale } = useI18n()
store.loadingSelectedMovie = true

const loadMovie = async () => {
  const existingMovie = Array.isArray(store.movies) ?
      store.movies.find(movie => movie.id.toString() === id) : undefined
  if (existingMovie) {
    store.selectedMovie = existingMovie
    return Promise.resolve()
  }

  try {
    const { data } = await useFetch(
      `/api/movie/${id}?locale=${locale.value}`
    )
    store.selectedMovie = data.value as Movie
  } catch (error) {
    await Promise.reject()
    console.log('Oops, an error occurred while loading the movie: ', error)
  }
}

const existingScore = store.triggerscores.find(score => score.movie_id.toString() === id)

if (existingScore) {
  store.selectedMovieScore = existingScore
} else {
  store.selectedMovieScore = undefined
}

try {
  await loadMovie()
  store.loadingSelectedMovie = false
  isLoading.value = false
} catch (error) {
  store.loadingSelectedMovie = false
  clearError()
  await navigateTo('/')
  console.error('Oops, an error occurred while loading data: ', error)
}
</script>
