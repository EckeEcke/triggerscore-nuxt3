<template>
  <div
    v-if="triggerscores.length > 0 && movies && movies?.length > 0"
    class="highlight-container w-full bg-gray-900 bg-opacity-95 px-4 mb-0 container mx-auto xl:w-10/12"
    :class="{ 'pt-4 pb-8': moreSpacing }"
  >
    <div class="font-semibold mb-4 pt-6" :class="{ 'border-t border-gray-800': showBorder }">
      <h2 class="text-xl text-yellow-500 text-left text-underline mb-2">
        {{ title }}
      </h2>
      <p class="text-left text-white">{{ subTitle }}</p>
    </div>
    <div class="relative group">
      <div
        ref="swiper"
        class="hide-scrollbar flex flex-none flex-row overflow-x-scroll py-4 px-0 -mr-4 md:mr-0"
        style="scroll-snap-type: x mandatory"
      >
        <MovieHighlightItem
          v-for="(movie, index) in movies"
          :key="index"
          :movie="movie"
          :shown-score="shownScore"
          :scores="triggerscores[triggerscores.map((score) => score.movie_id).indexOf(movie.id)]"
          :load-item="true"
        />
        <div
          class="z-10 justify-between md:px-4 container mx-auto xl:w-10/12 hidden sm:group-hover:flex pointer-events-none absolute top-36 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <button class="bg-white rounded-full" @click="scrollHighlightContainer('left')">
            <font-awesome-icon
              class="h-full text-yellow-500 text-4xl transition transform scale-125 hover:scale-150 pointer-events-auto"
              :icon="['fas', 'arrow-circle-left']"
            />
          </button>
          <button class="bg-white rounded-full" @click="scrollHighlightContainer('right')">
            <font-awesome-icon
              class="h-full text-yellow-500 text-4xl transition transform scale-125 hover:scale-150 pointer-events-auto"
              :icon="['fas', 'arrow-circle-right']"
            />
          </button>
        </div>
      </div>
      <transition
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-500 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="!scrolled"
          class="absolute bottom-0 -right-4 w-12 lg:w-20 h-full pointer-events-none"
          style="
            background-image: linear-gradient(
              to right,
              rgba(5, 5, 15, 0),
              rgba(5, 5, 15, 1)
            );
          "
        />
      </transition>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { type ScoreKey, useStore } from '~/stores/store'
import placeholderScores from '~/assets/triggerscores.json'
import type { Movie } from '~/types/movie'

const store = useStore()

defineProps({
  movies: {
    type: Array as PropType<Movie[]>,
    required: true,
  },
  shownScore: {
    type: String as PropType<ScoreKey>,
    default: 'rating_total',
  },
  title: {
    type: String,
    default: undefined,
  },
  subTitle: {
    type: String,
    default: undefined,
  },
  showBorder: {
    type: Boolean,
    default: false,
  },
  moreSpacing: {
    type: Boolean,
    default: false,
  },
})

const scrolled = ref(false)
const swiper = ref()

const triggerscores = computed(() => store.triggerscores ?? placeholderScores)

const handleScroll = () => {
  scrolled.value = !(swiper.value && swiper.value.scrollLeft === 0)
}

const scrollHighlightContainer = (direction: string) => {
  if (!swiper.value) return
  if (direction == 'left') {
    swiper.value.scrollBy({
      top: 0,
      left: -window.innerWidth / 2,
      behavior: 'smooth',
    })
  } else
    swiper.value.scrollBy({
      top: 0,
      left: window.innerWidth / 2,
      behavior: 'smooth',
    })
}

onMounted(() => {
  if (swiper.value) swiper.value.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  if (swiper.value) swiper.value.removeEventListener('scroll', handleScroll)
})

</script>
