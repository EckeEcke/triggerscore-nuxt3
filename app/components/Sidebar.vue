<template>
  <Teleport to="#__nuxt">
    <div class="fixed w-full h-full z-50 top-0 left-0">
      <div class="relative">
        <div
          class="absolute bg-gray-900 bg-opacity-40 top-0 left-0 w-full h-screen overflow-none"
          @click="$emit('close')"
        />
        <div
          class="bg-gray-900 bg-opacity-80 h-available backdrop-blur text-white shadow-lg w-72 min-w-10/12 p-4 absolute right-0 z-30 xl:hidden flex flex-col"
        >
          <div class="h-5/6 overflow-y-auto hide-scrollbar">
            <div class="overflow-y-auto pb-12 hide-scrollbar">
              <p class="text-right">
                <font-awesome-icon
                  :icon="['fas', 'times']"
                  @click="$emit('close')"
                />
              </p>
              <h2 class="font-semibold text-left mb-2">
                {{ t("filter.sort") }}
              </h2>
              <div class="flex w-full my-3 border border-gray-200 rounded">
                <select
                  v-model="store.sortingOption"
                  class="w-full h-8 md:h-10 bg-white rounded p-2 outline-none text-sm md:text-base text-black"
                >
                  <option v-for="(option, index) in sortingOptions" :key="index" :value="option.value" class="py-1">
                    {{ option.name }}
                  </option>
                </select>
              </div>
              <hr class="my-4 border-gray-800" >
              <h2 class="font-semibold text-left mb-2">
                {{ t("filter.displayedScore") }}
              </h2>
              <div class="flex w-full my-3 border border-gray-200 rounded">
                <select
                  v-model="store.shownScore"
                  class="w-full h-8 md:h-10 bg-white rounded p-2 outline-none text-sm md:text-base text-black"
                >
                  <option v-for="(option, index) in scoreOptions" :key="index" :value="option.value" class="py-1">
                    {{ option.name }}
                  </option>
                </select>
              </div>
              <hr class="my-4 border-gray-800" >
              <div class="mb-6">
                <h2 class="font-semibold text-left mb-6">
                  {{ t("filter.filterByScore") }}
                </h2>
                <Rangeslider class="px-3" />
              </div>
              <hr class="my-4 border-gray-800" >
              <h2 class="font-semibold text-left mb-2">
                {{ t("filter.filterByProvider") }}
              </h2>
              <div class="form-check text-left mb-2 h-8">
                <input
                  id="filter-netflix"
                  v-model="netflixFilter"
                  class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer accent-yellow-500"
                  type="checkbox"
                >
                <label class="form-check-label inline-block text-gray-800 text-left" for="filter-netflix">
                  <img alt="Logo Netflix" class="h-4 mt-1 mx-2" src="../assets/images/netflix-logo.svg">
                </label>
              </div>
              <div class="form-check text-left mb-2 h-8">
                <input
                  id="filter-amazon"
                  v-model="primeFilter"
                  class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer accent-yellow-500"
                  type="checkbox"
                >
                <label class="form-check-label inline-block text-gray-800 text-left" for="filter-amazon">
                  <img alt="Logo Prime Video" class="h-6 mt-1 mx-2" src="../assets/images/amazon-prime-logo3.png">
                </label>
              </div>
              <div class="form-check text-left mb-2 h-8">
                <input
                  id="filter-disney"
                  v-model="disneyFilter"
                  class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer accent-yellow-500"
                  type="checkbox"
                >
                <label class="form-check-label inline-block text-gray-800 text-left" for="filter-disney">
                  <img alt="Logo Disney Plus" class="h-8 ml-2" src="../assets/images/disney+-logo2.svg">
                </label>
              </div>
              <div class="form-check text-left mb-2 h-8">
                <input
                  id="filter-disney"
                  v-model="skyFilter"
                  class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer accent-yellow-500"
                  type="checkbox"
                >
                <label class="form-check-label inline-block text-gray-800 text-left" for="filter-disney">
                  <img alt="Logo WOW" class="h-4 mt-1 ml-2" src="../assets/images/sky-logo.svg">
                </label>
              </div>
              <hr class="my-4 border-gray-800" >
              <div class="flex flex-col my-4">
                <h2 class="font-semibold text-left mb-2">
                  {{ t("filter.filterByRelease") }}
                </h2>
                <div class="flex">
                  <div class="w-1/2 mr-2 flex flex-col">
                    <input
                      id="filter-start"
                      v-model="filterMin"
                      type="number"
                      class="border border-gray-200 rounded w-24 p-2 text-center text-black"
                      min="1900"
                      max="2010"
                      :placeholder="t('filter.from')"
                      @input="scrollToTop"
                    >
                  </div>
                  <div class="w-1/2 mr-2 flex flex-col">
                    <input
                      id="filter-end"
                      v-model="filterMax"
                      type="number"
                      class="border border-gray-200 rounded w-24 p-2 text-center text-black"
                      min="1900"
                      max="2010"
                      :placeholder="t('filter.to')"
                      @input="scrollToTop"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-auto bg-gray-900">
            <div
              class="-mt-20 h-20 w-full z-30 pointer-events-none"
              style="
                background-image: linear-gradient(
                  to bottom,
                  rgba(5, 5, 15, 0),
                  rgba(5, 5, 15, 1)
                );
              "
            />
            <div class="text-sm my-5 font-semibold">
              {{ results }} {{ t("filter.results") }}
            </div>
            <hr class="my-4 border-gray-800" >
            <button
              class="font-semibold bg-yellow-500 py-3 w-full shadow text-white uppercase rounded-lg"
              @click="resetFilter"
            >
              {{ t("filter.resetFilter") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang='ts'>
import { useStore } from '~/stores/store'
import { useI18n } from 'vue-i18n'

const store = useStore()
const { t } = useI18n()

defineEmits(['close'])

const filterMin = computed(() => store.filterMoviesByYearMin)
const filterMax = computed(() => store.filterMoviesByYearMax)
const results = computed(() => store.filteredMovies.length)

const resetFilter = () => {
  store.resetFilter()
  store.filterMovies()
}

const scrollToTop = () => {
  window.scrollTo(0, 0)
}


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

<style>
.h-available {
  height: 100vh;
}
</style>
