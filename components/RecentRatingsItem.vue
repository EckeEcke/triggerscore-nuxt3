<template>
  <div
    class="movie-highlight-item bg-transparent text-white sm:rounded shadow-md flex flex-col relative border-b md:border-b-0 border-gray-800 min-w-sm lg:hover:shadow-inner transform transition duration-300"
  >
    <div class="md:hidden sm:rounded-t p-3 pb-0 bg-transparent text-inherit">
      <div class="flex items-center gap-2 text-left">
        <div
          class="flex rounded-lg justify-center w-10 h-10 mr-2"
          :class="scoreBackground"
        >
          <p class="self-center text-white text-lg font-semibold">
            {{ scoreTotal !== -1 ? scoreTotal : "-" }}
          </p>
        </div>
        <div class="w-9/12 overflow-hidden whitespace-nowrap custom-headline">
          <NuxtLink
            v-if="movie.title.length > 0"
            tag="h3"
            :to="pathToNavigate(movie.id)"
            class="text-base font-semibold h-6 cursor-pointer"
          >
            {{ movie.title }}
          </NuxtLink>
          <NuxtLink v-else class="text-base font-semibold h-6 cursor-pointer"
          :to="pathToNavigate(movie.id)"
          tag="h3">
            {{ movie.original_title }}
          </NuxtLink>
          <div class="text-xs pt-1">
            <span>{{ movie.release_date.substring(0, 4) }}</span>
            <span class="mx-2">|</span>
            <span>{{ movie.runtime }} {{ t("general.minutes") }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full px-3 md:px-0 pt-4 pb-3 gap-4 flex">
      <div class="relative hidden md:block">
        <NuxtLink :to="pathToNavigate(movie.id)">
          <img
            class="h-36 w-32 rounded-sm cursor-pointer"
            :alt="movie.original_title"
            :src="poster2"
          />
        </NuxtLink>
        <div
          class="flex absolute top-1 right-1 rounded-lg justify-center w-12 h-12 bg-opacity-80 pointer-events-none"
          :class="scoreBackground"
        >
          <p class="self-center text-white text-xl font-semibold">
            {{ scoreTotal !== -1 ? scoreTotal : "-" }}
          </p>
        </div>
        <div class="absolute bottom-0 right-0 pointer-events-none">
          <div
            v-if="totalRatings[0].ratings === 1"
            class="flex items-center w-16 h-16 relative rounded-full justify-center drop-shadow"
          >
            <NewAnimation />
          </div>
        </div>
      </div>

      <article class="text-left relative w-full h-full flex flex-col">
        <NuxtLink
          :to="pathToNavigate(movie.id)"
          tag="h3"
          v-if="movie.title && movie.title.length > 0"
          class="hidden md:block text-base mb-1 font-semibold h-6 overflow-hidden cursor-pointer "
        >
          {{ movie.title }}
        </NuxtLink>
        <NuxtLink
        :to="pathToNavigate(movie.id)"
          tag="h3"
          v-else
          class="hidden md:block text-base mb-1 font-semibold overflow-hidden cursor-pointer"
        >
          {{ movie.original_title }}
        </NuxtLink>
        <div class="text-xs mb-1 py-1 hidden md:block">
          <span>{{ movie.release_date.substring(0, 4) }}</span>
          <span class="mx-2">|</span>
          <span>{{ movie.runtime }} {{ t("general.minutes") }}</span>
        </div>
        <div class="grid grid-cols-2 text-sm max-w-xs mt-auto">
          <RecentRatingsItemScoreDisplay
            :score="scores?.rating_sexism"
            :name="t('categories.sexism')"
          />
          <RecentRatingsItemScoreDisplay
            :score="scores?.rating_racism"
            :name="t('categories.racism')"
          />
          <RecentRatingsItemScoreDisplay
            :score="scores?.rating_others"
            :name="t('categories.others')"
          />
          <RecentRatingsItemScoreDisplay
            :score="scores?.rating_cringe"
            :name="t('categories.cringe')"
          />
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useStore } from '~/stores/store'
import placeholderRatings from '~/assets/recentRatings.json'
import { useI18n } from 'vue-i18n'
import NewAnimation from '~/components/animations/NewAnimation.vue'
import { getScoreBackground } from '~/utils/getScoreBackground'

const { t } = useI18n()
const store = useStore()

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  scores: Object,
  id: {
    type: Number,
    required: true,
  },
})

const localePath = useLocalePath()
const pathToNavigate = (id: string) => localePath(`/movie/${id}`)

const poster2 = computed(
  () =>
    `https://image.tmdb.org/t/p/original/${
      props.movie.poster_path ?? placeholderRatings[props.id].poster_path
    }`
)

const scoreAvailable = computed(() => props.scores !== undefined)

const scoreTotal: ComputedRef<number> = computed(() => {
  if (scoreAvailable.value) {
    return (
      Math.floor(
        ((props.scores?.rating_sexism +
          props.scores?.rating_racism +
          props.scores?.rating_others +
          Math.max(
            props.scores?.rating_sexism,
            props.scores?.rating_racism,
            props.scores?.rating_others
          ) *
            5) /
          8) *
          10
      ) / 10
    )
  } else return -1
})

const scoreBackground = computed(() => getScoreBackground(scoreTotal.value))

const totalRatings = computed(() =>
  store.triggerscores.filter((movie) => movie.movie_id == props.movie.id)
)
</script>

<style scoped>
.custom-headline {
  width: calc(100% - 10px);
  text-overflow: ellipsis;
}

.drop-shadow {
  filter: drop-shadow(0 1px 0px white) drop-shadow(1px 0px 0px white)
    drop-shadow(-1px 0px 0px white) drop-shadow(0 -1px 0px white);
}
</style>
