<template>
  <NuxtLink
    v-if="movie"
    :to="pathToNavigate"
    tag="div"
    class="movie-highlight-item w-40 h-auto mr-3 bg-transparent shadow-md flex flex-none flex-col relative rounded transform transition duration-300 lg:hover-shadow-inner container-xl cursor-pointer"
    style="scroll-snap-align: start"
  >
    <div class="flex">
      <div class="w-full h-60 overflow-hidden">
        <div
          class="w-full h-full bg-cover rounded-t transition-300 transform scale-100 movie-poster"
          :style="[loadItem2 ? { backgroundImage: `url(${poster})` } : '']"
        />
      </div>
      <div
        class="absolute right-2 mx-auto mt-2 h-12 w-12 text-white rounded-lg bg-opacity-90"
        :class="scoreBackground"
      >
        <div class="relative w-full h-full font-semibold">
          <span
            v-if="scoreAvailable"
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >{{ score }}</span
          >
          <span
            v-else
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >-</span
          >
        </div>
        <div
          v-if="displayedScore != ''"
          class="bg-gray-400 opacity-90 rounded p-1 my-1 text-xs font-light"
        >
          {{ displayedScore }}
        </div>
      </div>
    </div>

    <div class="w-full py-3 text-white">
      <article class="text-left relative w-full h-full">
        <h3
          v-if="movie.title && movie.title.length > 0"
          class="text-sm max-h-14 mb-1 font-semibold overflow-hidden"
        >
          {{ movie.title }}
        </h3>
        <h3 v-else class="text-sm h-16 mb-1 font-semibold overflow-hidden">
          {{ movie.original_title }}
        </h3>
        <p class="mt-3 mb-1 text-xs md:text-md text-gray-300">
          <span class="self-center">{{
            movie.release_date.substring(0, 4)
          }}</span>
          <template v-if="movie.runtime">
            <span class="mx-2">|</span>
            <span>{{ movie.runtime }} {{ t("general.minutes") }}</span>
          </template>
        </p>
      </article>
    </div>
  </NuxtLink>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { getScoreBackground } from '~/utils/getScoreBackground'
import type { Movie } from '~/types/movie'
import type { TriggerScore, ScoreKey } from '~/stores/store'

const { t } = useI18n()

const props = defineProps({
  movie: {
    type: Object as PropType<Movie>,
    default: undefined
  },
  scores: {
    type: Object as PropType<TriggerScore>,
    default: undefined
  },
  shownScore: {
    type: String as PropType<ScoreKey>,
    default: 'rating_total',
  },
  loadItem: {
    type: Boolean,
    default: false,
  },
})

const localePath = useLocalePath()
const pathToNavigate = computed(() => localePath(`/movie/${props.movie!.id}`))


const loadItem2 = true // replace when intersection observer is fixed
const poster = computed(
  () => `https://image.tmdb.org/t/p/original/${props.movie!.poster_path}`
)

const score = computed(() => {
  return props.scores?.[props.shownScore] || '-'
})

const scoreAvailable = computed(() => props.scores !== undefined)

const displayedScore = computed(() => {
  switch (props.shownScore) {
    case 'rating_sexism':
      return 'Sexism'
    case 'rating_racism':
      return 'Racism'
    case 'rating_others':
      return 'Others'
    case 'rating_cringe':
      return 'Cringe'
    default:
      return ''
  }
})

const scoreBackground = computed(() => {
  return getScoreBackground(props.scores?.[props.shownScore])
})
</script>
