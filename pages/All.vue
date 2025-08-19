<template>
  <div class="bg-gray-900">
    <transition
      v-if="showMenu"
      enter-active-class="duration-100 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <Sidebar @close="handleMenu" />
    </transition>
    <LoadingAnimation v-if="isLoading" />
    <Searchbox v-if="!isLoading" />
    <div v-if="!isLoading">
      <div class="container px-4 xl:w-10/12 mx-auto flex flex-col mt-8 mb-4">
        <div class="text-left lg:hidden">
          <h2 class="text-2xl md:text-3xl font-semibold mb-2 text-yellow-500">
            {{ t("index.headline") }}
          </h2>
          <p class="text-sm text-white">
            {{ t("index.intro1") }}
            <span
              class="text-yellow-500 transition hover:text-yellow-600 font-semibold cursor-pointer"
              @click="focusSearch"
            >
              {{ t("index.search") }}
            </span>
            {{ t("index.intro2") }}
          </p>
        </div>
        <div class="ml-auto mt-4 -mr-2 sm:mr-0 lg:hidden">
          <button
            class="bg-yellow-500 text-white uppercase disabled:opacity-50 font-semibold p-3 rounded-lg shadow-lg transition duration-300 hover:scale-105 hover:bg-yellow-600"
            @click="handleMenu"
          >
            <font-awesome-icon class="mr-2" :icon="['fas', 'filter']" />
            Filter
          </button>
        </div>
      </div>
      <Filtermenu class="mt-4" />
      <LoadingAnimation v-if="isFiltering" />
      <section
        v-if="!isLoading && filteredMovies.length > 0 && !isFiltering"
        class="movielist grid gap-0 md:gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full relative container mx-auto mt-8 md:mt-2 sm:pb-8 sm:px-4 xl:w-10/12"
      >
        <MovieListitem
          v-for="movie in loadedMovies"
          :key="movie.id"
          :movie="movie"
          :scores="
            triggerScores[
              triggerScores.map((score) => score.movie_id).indexOf(movie.id)
            ]
          "
        />
      </section>
      <div
        v-if="!isLoading && filteredMovies.length == 0 && !isFiltering"
        class="py-32"
      >
        <p class="text-white text-xl font-semibold animate-bounce mb-4">
          {{ t("search.noResults") }}
        </p>
        <button
          class="font-semibold bg-yellow-500 p-3 shadow text-white uppercase rounded-lg"
          @click="resetFilter"
        >
          {{ t("filter.resetFilter") }}
        </button>
      </div>
    </div>
    <div
      v-if="totalPages > 1 && !isFiltering"
      class="flex gap-1 justify-center my-8 md:mt-0 flex-wrap"
    >
      <button
        v-for="index in totalPages"
        :key="index"
        class="text-sm sm:text-lg text-black px-4 py-2 font-semibold bg-opacity-90 hover:text-yellow-500 hover:bg-white transition duration-300"
        :class="[
          start == Math.round((index - 1) * 24) ? 'bg-white' : 'bg-gray-500',
        ]"
        @click="setPage((index - 1) * 24, (index - 1) * 24 + 24)"
      >
        {{ index }}
      </button>
    </div>
    <div v-if="totalPages > 1 && !isFiltering" class="flex gap-1 justify-center mb-8 -mt-6 flex-wrap">
      <button
        class="text-lg px-4 py-2 font-semibold bg-transparent"
        :disabled="currentPage == 1"
        @click="setPage(start - 24, end - 24)"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-white hover:text-yellow-500 transition duration-300" />
      </button>
      <button
        class="text-lg px-4 py-2 font-semibold bg-transparent"
        :disabled="currentPage == totalPages"
        @click="setPage(start + 24, end + 24)"
      >
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-white hover:text-yellow-500 transition duration-300" />
      </button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useStore } from '~/stores/store'
import { useI18n } from 'vue-i18n'
import LoadingAnimation from '~/components/animations/LoadingAnimation.vue'

const store = useStore()
const { t } = useI18n()
const showMenu = ref(false)
const start = ref(0)
const end = ref(24)

store.filterMovies()
store.resetFilter()

const totalPages = computed(() => Math.ceil(filteredMovies.value.length / 24))
const isLoading = computed(() => store.moviesLoading || store.triggerscores.length == 0)
const filteredMovies = computed(() => store.filteredMovies)
const loadedMovies = computed(() =>
  [...filteredMovies.value].filter(
    (_, index) => index >= start.value && index < end.value
  )
)
const triggerScores = computed(() => store.triggerscores)
const movies = computed(() => store.movies)
const isFiltering = computed(() => store.isFiltering)
const currentPage = computed(() => Math.floor(start.value / 24) + 1)

const handleMenu = () => showMenu.value = !showMenu.value

const focusSearch = () => {
  const search = document.getElementById('search')
  search!.scrollIntoView()
  search!.focus()
}

const resetFilter = () => {
  store.resetFilter()
  store.filterMovies()
}

const setPage = (startValue: number, endValue: number) => {
  start.value = startValue
  end.value = endValue
}

watch(
  () => movies.value,
  () => {
    store.filterMovies()
  }
)

watch(
  () => filteredMovies.value,
  () => {
    if (end.value > filteredMovies.value.length) {
      end.value = filteredMovies.value.length;
      start.value = end.value - 24;
      if (start.value <= 0 || start.value % 24 != 0) {
        start.value = 0;
        end.value = 24;
      }
    }
  }
)

useSeoMeta({
  title: 'Triggerscore - All Movies on Triggerscore / Filter Movies',
  description: 'Overview of all the movies on Triggerscore - filter movies to find what you are looking for',
  author: 'Christian Eckardt',
  ogTitle: 'Triggerscore - About / What is Triggerscore',
  ogDescription: 'Triggerscore - rating old movies based on how much users today get triggered',
  ogUrl: () => `https://www.triggerscore.de/about`,
  ogType: 'website',
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1.0',
})
</script>

<style scoped>
button:disabled {
  opacity: 0.3;
}
</style>
