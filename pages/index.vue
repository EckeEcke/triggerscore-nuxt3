<template>
  <Searchbox show-title />
  <LoadingAnimation v-show="isLoading" />
  <template v-if="!isLoading">
    <MovieHighlightsContainer
      :movies="store.bondMovies"
      shown-score="rating_total"
      :title="t('highlights.headline1')"
      :sub-title="t('highlights.copy1')"
      more-spacing
    />
    <section class="mb-12 px-0 sm:px-4 container mx-auto xl:w-10/12">
      <div
        class="py-16 md:py-20 mb-12 bg-cover bg-center px-4 rounded"
        :style="{
          backgroundImage:
            'linear-gradient(to bottom, rgba(27,7,7,0.7), rgba(47,7,7,0.8)),url(' +
            'images/backdrop-ballermann6.jpg' +
            ')',
        }"
      >
        <h2 class="text-white text-2xl sm:text-4xl text-left font-semibold mb-2 uppercase">
          {{ t("general.newest") }}
          <span class="text-2xl sm:text-4xl self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
            TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RES
          </span>
        </h2>
        <p class="text-base md:text-lg text-white font-semibold text-left">
          {{ t("general.recentRatings") }}
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 justify-content-start items-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 sm:gap-8 col-span-2 justify-content-start recent-ratings">
          <RecentRatingsItem
            v-for="(rating, index) in store.recentRatings"
            :id="index"
            :key="index"
            :movie="rating"
            :scores="store.recentScores[index]"
          />
        </div>
        <div class="text-left text-white px-4 sm:px-0 col-span-2 lg:col-span-1">
          <h3 class="text-2xl font-semibold my-8">
            {{ t("general.recentComments") }}
          </h3>
          <RecentComments />
        </div>
      </div>
    </section>
    <section>
      <div class="container xl:w-10/12 mx-auto sm:px-4 mb-3 sm:mb-6">
        <div
          class="py-16 md:py-20 text-left bg-cover bg-center px-4 rounded"
          :style="{
            backgroundImage:
              'linear-gradient(to bottom, rgba(27,27,27,0.5), rgba(67,27,27,0.6)),url(' +
              '/images/backdrop-backtothefuture.jpg' +
              ')',
          }"
        >
          <div>
            <h2 class="text-2xl sm:text-4xl font-semibold mb-2 text-white uppercase">
              <span class="self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
              </span>
              {{ t("general.top10") }}
            </h2>
            <p class="text-base md:text-lg text-white font-semibold">
              {{ t("general.top10Copy") }}
            </p>
          </div>
        </div>
      </div>
      <MovieHighlightsContainer
        :movies="store.top10Sexism"
        shown-score="rating_sexism"
        :title="t('highlights.headline2')"
        :sub-title="t('highlights.copy2')"
      />
      <MovieHighlightsContainer
        :movies="store.top10Racism"
        shown-score="rating_racism"
        :title="t('highlights.headline3')"
        :sub-title="t('highlights.copy3')"
        show-border
      />
      <MovieHighlightsContainer
        :movies="store.top10Others"
        shown-score="rating_others"
        :title="t('highlights.headline4')"
        :sub-title="t('highlights.copy4')"
        show-border
      />
      <MovieHighlightsContainer
        :movies="store.top10Cringe"
        shown-score="rating_cringe"
        :title="t('highlights.headline5')"
        :sub-title="t('highlights.copy5')"
        show-border
      />
    </section>
    <section class="rounded p-4 py-8 sm:p-12 my-4 container xl:w-10/12 mx-auto bg-gradient-to-r from-gray-950 to-gray-80 text-white text-left">
      <DefinitionTriggered />
    </section>
    <section class="mb-4 mt-32 container xl:w-10/12 mx-auto">
      <QuizDisturber />
    </section>
    <section class="container xl:w-10/12 mx-auto px-4 my-12 sm:my-24">
      <div class="bg-opacity-90 py-16">
        <h2 class="text-white text-xl font-semibold my-4">
          {{ t("general.discoverMoreMovies") }}
        </h2>
        <div class="py-8">
          <NuxtLink :to="localePath('/all')" class="bg-yellow-500 transition hover:bg-yellow-600 p-3 rounded-lg text-white font-semibold uppercase my-4">
            {{ t("header.allMovies") }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </template>
</template>

<script setup lang='ts'>
import QuizDisturber from '~/components/QuizDisturber.vue'
import { useStore } from '~/stores/store'
import LoadingAnimation from '~/components/animations/LoadingAnimation.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const store = useStore()


const isLoading = computed(
  () =>
    store.highlightsLoading ||
    store.moviesLoading ||
    store.triggerscores.length == 0 ||
    store.loadingSelectedMovie
)

useSeoMeta({
  title: 'Triggerscore - rating movies based on triggering potential',
  description: 'Triggerscore offers a new way of watching old movies from back in the day: could this movie still be made like this nowadays? Or would it cause a huge sh*tstorm?',
  author: 'Christian Eckardt',
  ogTitle: 'Triggerscore - rating movies based on triggering potential',
  ogDescription: 'Triggerscore offers a new way of watching old movies from back in the day: could this movie still be made like this nowadays? Or would it cause a huge sh*tstorm?',
  ogUrl: () => `https://www.triggerscore.de/`,
  ogType: 'website',
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1.0',
})
</script>

<style scoped>
@media (min-width: 768px) {
  .recent-ratings {
    grid-auto-rows: min(10rem, 100%);
  }
}
</style>
