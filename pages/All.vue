<template>
  <div class="bg-gray-900">
    <Head>
      <Title>Triggerscore - All Movies on Triggerscore / Filter Movies</Title>
      <Meta charset="UTF-8" />
      <Meta
        name="keywords"
        content="triggering movies, triggerscore, all movies on Triggerscore, filter"
      />
      <Meta
        name="description"
        content="Overview of all the movies on Triggerscore - filter movies to find what you are looking for"
      />
      <Meta name="author" content="Christian Eckardt" />
      <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
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
            {{ t("index.intro1")
            }}<span
              class="text-yellow-500 transition hover:text-yellow-600 font-semibold cursor-pointer"
              @click="focusSearch"
              >{{ t("index.search") }}</span
            >{{ t("index.intro2") }}
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
            triggerscores[
              triggerscores.map((score) => score.movie_id).indexOf(movie.id)
            ]
          "
        />
      </section>
      <div
        class="py-32"
        v-if="!isLoading && filteredMovies.length == 0 && !isFiltering"
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
        v-bind:key="index"
        @click="setPage((index - 1) * 24, (index - 1) * 24 + 24)"
        class="text-sm sm:text-lg text-black px-4 py-2 font-semibold bg-opacity-90 hover:text-yellow-500 hover:bg-white transition duration-300"
        :class="[
          start == Math.round((index - 1) * 24) ? 'bg-white' : 'bg-gray-500',
        ]"
      >
        {{ index }}
      </button>
    </div>
    <div
      v-if="totalPages > 1 && !isFiltering"
      class="flex gap-1 justify-center mb-8 -mt-6 flex-wrap"
    >
      <button
        @click="setPage(start - 24, end - 24)"
        class="text-lg px-4 py-2 font-semibold bg-transparent"
        :disabled="currentPage == 1"
      >
        <font-awesome-icon
          :icon="['fas', 'chevron-left']"
          class="text-white hover:text-yellow-500 transition duration-300"
        />
      </button>
      <button
        @click="setPage(start + 24, end + 24)"
        class="text-lg px-4 py-2 font-semibold bg-transparent"
        :disabled="currentPage == totalPages"
      >
        <font-awesome-icon
          :icon="['fas', 'chevron-right']"
          class="text-white hover:text-yellow-500 transition duration-300"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store"
import { useI18n } from "vue-i18n"

const store = useStore()
const {locale, t } = useI18n()
const showMenu = ref(false)
const start = ref(0)
const end = ref(24)

store.setTriggerscores(locale.value)
store.filterMovies(locale.value)
store.setRecentRatings(locale.value)
store.setBondMovies(locale.value)
store.resetFilter()

const totalPages = computed(() => Math.ceil(filteredMovies.value.length / 24))
const isLoading = computed(
  () =>
    store.highlightsLoading ||
    store.moviesLoading ||
    store.triggerscores.length == 0
)
const filteredMovies = computed(() => store.filteredMovies)
const loadedMovies = computed(() =>
  [...filteredMovies.value].filter(
    (movie, index) => index >= start.value && index < end.value
  )
)
const triggerscores = computed(() => store.triggerscores)
const movies = computed(() => store.movies)
const isFiltering = computed(() => store.isFiltering)
const currentPage = computed(() => Math.floor(start.value / 24) + 1)

function handleMenu() {
  showMenu.value = !showMenu.value
}

function focusSearch() {
  const search = document.getElementById("search")
  search!.scrollIntoView()
  search!.focus()
}

function resetFilter() {
  store.resetFilter()
  store.filterMovies(locale.value)
}

function setPage(startValue: any, endValue: any) {
  start.value = startValue
  end.value = endValue
}

watch(
  () => movies.value,
  (currentValue, oldValue) => {
    store.filterMovies(locale.value)
  }
)

watch(
  () => filteredMovies.value,
  (currentValue, oldValue) => {
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
</script>

<style scoped>
button:disabled {
  opacity: 0.3;
}
</style>
