<template>
  <section class="detail-page w-full bg-center bg-cover bg-fixed">
    <div class="container mx-auto sm:pt-6 sm:pb-12 xl:w-10/12 md:px-4">
      <div class="radial-background flex flex-col lg:flex-row px-0 sm:px-4 md:px-0 sm:rounded-t">
        <div class="flex flex-col w-full text-white rounded-t lg:rounded justify-start lg:mr-6 md:p-4">
          <div class="flex justify-between w-full sm:rounded-t p-4 pr-0">
            <img
              :key="locale"
              :src="poster"
              alt="movie poster"
              class="w-1/2 lg:w-76 h-auto object-contain rounded self-center detail-page-box-shadow"
            >
            <MovieScore />
          </div>
          <div class="flex flex-col xl:flex-row">
            <div class="w-full text-left px-4 py-2 flex flex-col">
              <div class="flex justify-between">
                <h2
                  class="text-xl font-semibold md:text-2xl self-center mb-1 sm:mb-2"
                >
                  {{ movie?.title ?? movie?.original_title }}
                </h2>
              </div>
              <div class="mb-4 text-xs md:text-md text-gray-400">
                {{ releaseDate }}
                <span class="mx-2">|</span>
                <span>{{ movie?.runtime }} {{ t("general.minutes") }}</span>
                <template v-if="totalRatings.length">
                  <span v-if="totalRatings[0]" class="mx-2">|</span>
                  <span v-if="totalRatings[0]">{{ totalRatings[0].ratings }}
                    {{ t("general.ratings") }}
                  </span>
                </template>
                <span v-if="movie?.vote_average" class="mx-2">|</span>
                <span v-if="movie?.vote_average">
                  <wbr >{{ t("rating.tmdb-rating") }}:
                  {{ movie?.vote_average.toFixed(2) }}
                </span>
                <span v-if="score" class="mx-2 mb-2">|</span>
                <div v-if="score" class="inline-block mt-2 sm:mt-0">
                  <font-awesome-icon
                    :icon="['fas', 'thumbs-up']"
                    class="mr-1"
                  />
                  <span class="mr-3">{{ score.likes }}</span>
                  <font-awesome-icon
                    :icon="['fas', 'thumbs-down']"
                    class="mr-1"
                  />
                  <span>{{ score.dislikes }}</span>
                </div>
              </div>

              <i v-if="movie?.tagline && movie?.tagline.length > 1" class="text-sm md: text-md">"
                {{ movie.tagline }}"
              </i>
              <p class="my-4 flex flex-wrap gap-1">
                <span
                  v-for="(genre, index) in genres"
                  :key="genre + index"
                  class="text-xs bg-gray-400 text-white p-2 rounded"
                  >{{ genre }}</span
                >
              </p>
              <article class="my-4 text-sm md:text-md">
                {{ movie?.overview }}
              </article>
              <MovieIcons />
              <client-only>
                <MovieTrailer />
              </client-only>
            </div>
          </div>
          <MovieComments :comments="comments" />
          
          <div class="hidden md:block px-4 sm:mb-4">
            <ShareMovie :movie="movie" />
          </div>
        </div>
        <RateMovie />
        <hr class="border-gray-800 md:hidden" >
        <div class="px-4 md:hidden py-12 mb-4">
          <ShareMovie :movie="movie" />
        </div>
      </div>
      <hr class="border-gray-800" >
      <div class="sm:px-4 radial-background sm:rounded-b">
        <MovieHighlightsContainer
          v-if="similarMovies?.body"
          class="xl:w-full bg-transparent"
          :movies="similarMovies.body.slice(0,10)"
          shown-score="rating_total"
          :title="t('similar.headline')"
          :sub-title="t('similar.copy', [movie?.title ?? movie?.original_title])"
          more-spacing
        />
      </div>
    </div>
  </section>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import {type TriggerScore, useStore} from '~/stores/store'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import {emptyMovie, type Movie} from '~/types/movie'
import RateMovie from './RateMovie.vue'
import MovieComments from './MovieComments.vue'
import MovieIcons from './MovieIcons.vue'
import MovieScore from './MovieScore.vue'
import MovieTrailer from './MovieTrailer.vue'
import ShareMovie from './ShareMovie.vue'

const store = useStore()
const route = useRoute()
const { t, locale } = useI18n()

const movie: ComputedRef<Movie | undefined> = computed(() => store.selectedMovie)
const releaseDate = movie.value?.release_date ? parseInt(movie.value.release_date.substring(0, 4)) : ''
const score: ComputedRef<TriggerScore | undefined> = computed(() => store.selectedMovieScore)

const title = computed(() =>
  movie.value !== emptyMovie ? movie.value?.title : 'Movie on Triggerscore'
)
const poster = `https://www.triggerscore.de/api/poster?poster_path=${movie.value?.poster_path}`
const ogImage = `https://www.triggerscore.de/api/og-image?poster_path=${movie.value?.poster_path}`
const genres = computed(() => movie.value?.genres.map((genre: { name: string }) => genre.name))

const totalRatings = computed(() => {
  return store.triggerscores.length > 0
    ? store.triggerscores.filter(
        (movieFromStore) => movieFromStore.movie_id === movie.value?.id
      )
    : []
})

const comments: ComputedRef<string[] | undefined> = computed(() =>
  score.value
    ? score.value.comments.filter((comment: string) => comment.length > 3)
    : undefined
)

const { data: similarMovies } = useFetch<{ body: Movie[] }>(
    () => `/api/fetchSimilarMovies?movie_id=${route.params.id}&locale=${locale.value}`,
    {
      immediate: true,
      server: true,
      watch: [locale],
    }
)

useSeoMeta({
  title: title.value,
  description: () => `triggerscore rating for ${title.value}`,
  author: 'Christian Eckardt',
  ogTitle: title.value,
  ogDescription: 'Triggerscore - rating old movies based on how much users today get triggered',
  ogImage: ogImage,
  ogImageUrl: ogImage,
  ogImageSecureUrl: ogImage,
  ogUrl: () => `https://www.triggerscore.de/movie/${route.params.id}`,
  ogType: 'website',
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1.0',
})

watch(locale, () => {
  const loadMovie = async () => {
    try {
      const { data } = await useFetch(
      `/api/movie/${route.params.id}`
      )
      store.selectedMovie = data.value as Movie
    } catch (error) {
      console.log('Oops, an error occurred while loading the movie: ', error)
    }
  }

  loadMovie()
})

</script>

<style scoped>
.detail-page {
  min-height: calc(100vh - 5rem);
}

.detail-page-box-shadow {
  box-shadow: rgba(50, 50, 93, 0.25) 0 50px 100px -20px, rgba(0, 0, 0, 0.3) 0 30px 60px -30px;
}

</style>
