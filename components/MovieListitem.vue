<template>
  <NuxtLink
    :to="pathToNavigate"
    tag="div"
    class="movie-highlight-item transition-300 w-full h-44 bg-transparent sm:bg-gradient-to-r from-gray-950 to-gray-800 md:hover:from-gray-900 text-white sm:border border-t border-b sm:border-r-0 border-gray-950 md:border-0 shadow-md flex relative md:rounded container-xl cursor-pointer"
  >
    <div class="h-full w-44 md:rounded-l overflow-hidden">
      <div
        class="movie-poster w-full h-full bg-cover bg-center"
        :style="{ 'background-image': `url(${poster})` }"
      />
    </div>
    <div class="w-full p-3">
      <div
        class="absolute top-2 right-2 h-12 w-12 text-lg text-white rounded-lg font-semibold"
        :class="scoreBackground"
      >
        <div class="relative w-full h-full">
          <span
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >{{ scores ? score : "-" }}</span
          >
        </div>
        <div
          v-if="displayedScore != ''"
          class="bg-gray-400 rounded p-1 my-1 text-xs font-light"
        >
          {{ displayedScore }}
        </div>
      </div>
      <article class="text-left relative w-full h-full">
        <h3
          v-if="movie.title.length > 0"
          class="text-base w-4/5 h-12 mb-1 font-semibold overflow-hidden"
        >
          {{ movie.title }}
        </h3>
        <h3
          v-else
          class="text-base w-4/5 h-12 mb-1 font-semibold overflow-hidden"
        >
          {{ movie.original_title }}
        </h3>
        <p class="text-xs text-gray-300">
          {{ movie.release_date.substring(0, 4) }}
          <span v-if="movie.runtime" class="mx-2">|</span>
          <span v-if="movie.runtime"
            >{{ movie.runtime }} {{ t("general.minutes") }}</span
          >
        </p>
        <p
          v-if="overview.length > 2"
          class="text-xs absolute top-1/2 py-3 text-gray-300"
        >
          {{ overview }}
        </p>
        <p v-else class="text-xs absolute top-1/2 py-3 text-gray-300">
          {{ t("general.noDescription") }}
        </p>
      </article>
    </div>
  </NuxtLink>
</template>

<script setup lang='ts'>
import { useStore } from '~/stores/store'
import { useI18n } from 'vue-i18n'
import { getScoreBackground } from '~/utils/getScoreBackground'

const { t } = useI18n()

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  scores: {
    type: Object,
    required: true,
  },
})

const store = useStore()
const pathToNavigate = computed(() => `movie/${props.movie.id}`)

const poster = computed(
  () => `https://image.tmdb.org/t/p/original/${props.movie.poster_path}`
)

const overview = computed(() =>
  props.movie.overview.length > 100
    ? props.movie.overview.substring(0, 110) + '...'
    : props.movie.overview
)

const scoreAvailable = computed(() => props.scores !== undefined)

const displayedScore = computed(() => {
  if (store.shownScore == 'rating_sexism') {
    return 'Sexism'
  } else if (store.shownScore === 'rating_racism') {
    return 'Racism'
  } else if (store.shownScore === 'rating_others') {
    return 'Others'
  } else if (store.shownScore === 'rating_cringe') {
    return 'Cringe'
  } else return ''
})

const score = computed(() => {
  if (store.shownScore && scoreAvailable.value) {
    return props.scores[store.shownScore]
  } else return props.scores['rating_total']
})

const scoreBackground = computed(() => getScoreBackground(score.value))
</script>
