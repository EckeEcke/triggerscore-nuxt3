<template>
  <section
    class="detailpage w-full bg-center bg-cover bg-fixed"
    :style="backgroundImageStyle"
  >
    <Head>
      <client-only>
        <Title>{{ title }}</Title>
        <Meta charset="UTF-8" />
        <Meta
          :name="'keywords'"
          :content="'Triggerscore, triggering movies' + title"
        />
        <Meta
          :name="'description'"
          :content="'triggerscore rating for ' + title"
        />
        <Meta name="author" content="Christian Eckardt" />
        <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta :property="'og:title'" :content="JSON.stringify(title)" />
        <Meta
          property="og:description"
          content="Triggerscore - rating old movies based on how much users today get triggered"
        />
        <Meta :property="'og:image'" :content="ogImage" />
        <Meta :property="'og:image:url'" :content="ogImage" />
        <Meta :property="'og:image:secure_url'" :content="ogImage" />
        <Meta
          :property="'og:url'"
          :content="`https://www.triggerscore.de/movie/${route.params.id}`"
        />
        <Meta property="og:type" content="website" />
      </client-only>
    </Head>
    <div class="container mx-auto sm:pt-6 sm:pb-12 xl:w-10/12 md:px-4">
      <LoadingAnimation v-if="false" />
      <div
        v-else
        class="radial-background flex flex-col lg:flex-row px-0 sm:px-4 md:px-0 sm:rounded-t"
      >
        <div
          class="flex flex-col w-full text-white rounded-t lg:rounded justify-start lg:mr-6 md:p-4"
        >
          <div class="flex justify-between w-full sm:rounded-t p-4 pr-0">
            <img
              :src="poster"
              :key="locale"
              alt="movie poster"
              class="w-1/2 lg:w-76 h-auto object-contain rounded self-center detailpage-box-shadow"
            />
            <MovieScore />
          </div>
          <div class="flex flex-col xl:flex-row">
            <div class="w-full text-left px-4 py-2 flex flex-col">
              <div class="flex justify-between">
                <h2
                  class="text-xl font-semibold md:text-2xl self-center mb-1 sm:mb-2"
                >
                  {{ movie.title ?? movie.original_title }}
                </h2>
              </div>
              <div class="mb-4 text-xs md:text-md text-gray-400">
                {{ releaseDate }}
                <span class="mx-2">|</span>
                <span>{{ movie.runtime }} {{ t("general.minutes") }}</span>
                <template v-if="totalRatings.length">
                  <span v-if="totalRatings[0]" class="mx-2">|</span>
                  <span v-if="totalRatings[0]"
                    >{{ totalRatings[0].ratings }}
                    {{ t("general.ratings") }}</span
                  >
                </template>
                <span v-if="movie.vote_average" class="mx-2">|</span>
                <span v-if="movie.vote_average"
                  ><wbr />{{ t("rating.tmdb-rating") }}:
                  {{ movie.vote_average.toFixed(2) }}</span
                >
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

              <i
                v-if="movie.tagline && movie.tagline.length > 1"
                class="text-sm md: text-md"
                >"{{ movie.tagline }}"</i
              >
              <p class="my-4 flex flex-wrap gap-1">
                <span
                  class="text-xs bg-gray-400 text-white p-2 rounded"
                  v-for="genre in genres"
                  :key="genre"
                  >{{ genre }}</span
                >
              </p>
              <article class="my-4 text-sm md:text-md">
                {{ movie.overview }}
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
        <hr class="border-gray-800 md:hidden" />
        <div class="px-4 md:hidden py-12 mb-4">
          <ShareMovie :movie="movie" />
        </div>
      </div>
      <hr class="border-gray-800" />
      <div class="sm:px-4 radial-background sm:rounded-b">
        <MovieHighlightsContainer
          v-if="similarMovies.body"
          class="xl:w-full bg-transparent"
          :movies="similarMovies.body"
          shownScore="rating_total"
          :title="t('similar.headline')"
          :subTitle="t('similar.copy', [movie.title ?? movie.original_title])"
          moreSpacing
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useStore } from "../../stores/store"
import { ref, computed, watch } from "vue"
import { useRoute } from "vue-router"
import { emptyMovie } from "~/types/movie"
import RateMovie from "./RateMovie.vue"
import MovieComments from "./MovieComments.vue"
import MovieIcons from "./MovieIcons.vue"
import MovieScore from "./MovieScore.vue"
import MovieTrailer from "./MovieTrailer.vue"
import ShareMovie from "./ShareMovie.vue"

const store = useStore()
const route = useRoute()
const { t, locale } = useI18n()

const movie: any = computed(() => store.selectedMovie)
// const backdrop = `url(https://image.tmdb.org/t/p/original/${movie.value.backdrop_path})`
const releaseDate = parseInt(movie.value.release_date.substring(0, 4))
const score: any = computed(() => store.selectedMovieScore)

const similarMovies: any = ref({}) 

const title = computed(() =>
  movie.value !== emptyMovie ? movie.value.title : "Movie on Triggerscore"
)
const poster = `https://www.triggerscore.de/api/poster?poster_path=${movie.value.poster_path}`
const ogImage = `https://www.triggerscore.de/api/og-image?poster_path=${movie.value.poster_path}`
const genres = computed(() => movie.value.genres.map((genre: any) => genre.name))

const backgroundImageStyle = computed(() => {
    return {
      // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), ${backdrop.value}`,
      // minHeight: 'calc(100vh - 20rem)',
      // move back in if backdrop is wished
    }
})

const totalRatings = computed(() => {
  return store.triggerscores.length > 0
    ? store.triggerscores.filter(
        (movieFromStore) => movieFromStore.movie_id === movie.value.id
      )
    : []
})

const comments = computed(() =>
  score.value
    ? score.value.comments.filter((comment: string) => comment.length > 3)
    : null
)

const fetchSimilarMovies = async () => { 
  const response = await fetch(`/api/fetchSimilarMovies?movie_id=${route.params.id}&locale=${locale.value}`) 
  if (!response.ok) { 
    throw new Error(`Error fetching similar movies: ${response.statusText}`) 
  } 
  const data = await response.json() 
  similarMovies.value = data
}


watch(locale, () => {
  const loadMovie = async () => {
    try {
      const { data } = await useFetch(
      `/api/movie/${route.params.id}`
      )
      const loadedMovie = data.value as any
      store.selectedMovie = loadedMovie
    } catch (error) {
      console.log("Oops, an error occurred while loading the movie:", error)
    }
  }

  loadMovie()
})

onMounted(() => {
  fetchSimilarMovies()
})
</script>

<style lang="css" scoped>
.detailpage {
  min-height: calc(100vh-5rem);
}

.detailpage-box-shadow {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

</style>
