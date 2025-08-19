<template>
  <client-only>
    <div class="container hidden lg:block sm:px-4 xl:w-10/12 mx-auto">
      <div class="text-left pt-4 lg:pt-0 pb-5">
        <h2 class="text-2xl md:text-3xl font-semibold mb-2 text-white">
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
      <div class="px-0 py-4 rounded-b text-white">
        <div class="flex items-end justify-between">
          <div class="flex">
            <div class="w-52 mr-4">
              <h2 class="font-semibold text-left mb-2">
                {{ t("filter.sort") }}
              </h2>
              <div class="flex w-full my-3 border border-gray-200 rounded">
                <select v-model="store.sortingOption" class="w-full h-8 md:h-10 bg-white rounded p-2 text-sm md:text-base text-black">
                  <option v-for="(option, index) in sortingOptions" :key="index" :value="option.value">
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="w-52">
              <h2 class="font-semibold text-left mb-2">
                {{ t("filter.chooseScore") }}
              </h2>
              <div class="flex w-full my-3 border border-gray-200 rounded">
                <select v-model="store.shownScore" class="w-full h-8 md:h-10 bg-white rounded p-2 text-sm md:text-base text-black">
                  <option v-for="(option, index) in scoreOptions" :key="index" :value="option.value" class="py-1">
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="flex h-24 flex-col">
            <h2 class="font-semibold text-left mt-2 mb-7">
              {{ t("filter.filterByScore") }}
            </h2>
            <Rangeslider />
          </div>
          <div class="">
            <h2 class="font-semibold text-left">
              {{ t("filter.filterByRelease") }}
            </h2>
            <div class="flex">
              <div class="w-1/2 mr-2 flex flex-col my-3">
                <input
                  id="filter-start"
                  v-model="store.filterMoviesByYearMin"
                  type="number"
                  class="border border-gray-200 rounded w-20 p-2 text-center h-10 text-black"
                  min="1900"
                  max="2010"
                  :placeholder="t('filter.from')"
                  @input="scrollToTop"
                >
              </div>
              <div class="w-1/2 mr-2 flex flex-col my-3">
                <input
                  id="filter-end"
                  v-model="store.filterMoviesByYearMax"
                  type="number"
                  class="border border-gray-200 rounded w-20 p-2 text-center h-10 text-black"
                  min="1900"
                  max="2010"
                  :placeholder="t('filter.to')"
                  @input="scrollToTop"
                >
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4 border-gray-800" >
        <div class="flex justify-between items-center">
          <div class="gap-4">
            <div class="flex items-center -mb-3">
              <div class="form-check text-left mb-1 h-8 mr-8">
                <input
                  id="filter-netflix"
                  v-model="netflixFilter"
                  class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer accent-yellow-500"
                  type="checkbox"
                >
                <label class="form-check-label inline-block text-gray-800 text-left" for="filter-netflix">
                  <img
                    alt="Logo Netflix"
                    class="h-4 mt-1 mx-2"
                    src="../assets/images/netflix-logo.svg"
                  >
                </label>
              </div>
              <div class="form-check text-left mb-1 h-8 mr-8">
                <input
                  id="filter-amazon"
                  v-model="primeFilter"
                  class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer accent-yellow-500"
                  type="checkbox"
                >
                <label class="form-check-label inline-block text-gray-800 text-left" for="filter-amazon">
                  <img
                    alt="Logo Prime Video"
                    class="h-5 mt-1 mx-2"
                    src="../assets/images/amazon-prime-logo3.png"
                  >
                </label>
              </div>
              <div class="form-check text-left mb-1 mr-8 h-8">
                <input
                  id="filter-disney"
                  v-model="disneyFilter"
                  class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer accent-yellow-500"
                  type="checkbox"
                >
                <label class="form-check-label inline-block text-gray-800 text-left" for="filter-disney">
                  <img
                    alt="Logo Disney Plus"
                    class="h-7 ml-2 mb-1"
                    src="../assets/images/disney+-logo2.svg"
                  >
                </label>
              </div>
              <div class="form-check text-left mb-1 h-8">
                <input
                  id="filter-disney"
                  v-model="skyFilter"
                  class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer accent-yellow-500"
                  type="checkbox"
                >
                <label class="form-check-label inline-block text-gray-800 text-left" for="filter-disney">
                  <img
                    alt="Logo WOW"
                    class="h-4 mt-1 ml-2"
                    src="../assets/images/sky-logo.svg"
                  >
                </label>
              </div>
            </div>
          </div>
          <div class="font-semibold p-3 ml-auto mr-4">
            {{ results }} {{ t("filter.results") }}
          </div>
          <button
            class="font-semibold p-3 w-auto text-white uppercase"
            @click="resetFilter"
          >
            {{ t("filter.resetFilter") }}
          </button>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup lang='ts'>
import { useStore } from '~/stores/store'
import { useI18n } from 'vue-i18n'

const store = useStore()
const { t } = useI18n()

const scoreOptions = [
  {
    value: 'rating_total',
    name: t('categories.totalScore')
  },
  {
    value: 'rating_sexism',
    name: t('categories.sexism')
  },
  {
    value: 'rating_racism',
    name: t('categories.racism')
  },
  {
    value: 'rating_others',
    name: t('categories.others')
  },
  {
    value: 'rating_cringe',
    name: t('categories.cringe')
  },
]

const sortingOptions = [
  {
    value: 'a-z',
    name: t('filter.AtoZ')
  },
  {
    value: 'z-a',
    name: t('filter.ZtoA')
  },
  {
    value: 'date-desc',
    name: t('filter.yearDesc')
  },
  {
    value: 'date-asc',
    name: t('filter.yearAsc')
  },
  {
    value: 'ts-desc',
    name: t('filter.scoreDesc')
  },
  {
    value: 'ts-asc',
    name: t('filter.scoreAsc')
  },
]

const netflixFilter = computed({
  get: () => store.filterMoviesByNetflix,
  set: (value) => { store.filterMoviesByNetflix = value }
})

const primeFilter = computed({
  get: () => store.filterMoviesByPrime,
  set: (value) => { store.filterMoviesByPrime = value }
})

const disneyFilter = computed({
  get: () => store.filterMoviesByDisney,
  set: (value) => { store.filterMoviesByDisney = value }
})

const skyFilter = computed({
  get: () => store.filterMoviesBySky,
  set: (value) => { store.filterMoviesBySky = value }
})

const results = computed(() => store.filteredMovies.length)

const resetFilter = () => {
  store.resetFilter()
  store.filterMovies()
}

const focusSearch = () => {
  if (!import.meta.client) return
  const search = document.getElementById('search')
  search!.scrollIntoView({ block: 'start' })
  search!.focus()
}

const scrollToTop = () => {
  window.scrollTo(0, 0)
}

watch([
  () => store.filterMoviesByNetflix,
  () => store.filterMoviesByPrime,
  () => store.filterMoviesByDisney,
  () => store.filterMoviesBySky,
  () => store.sortingOption,
  () => store.filterMoviesByYearMin,
  () => store.filterMoviesByYearMax,
  () => store.shownScore
], store.filterMovies)

</script>
