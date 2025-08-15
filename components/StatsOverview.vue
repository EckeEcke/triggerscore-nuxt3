<template>
  <div class="w-full lg:w-1/3">
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.totalRatings") }}</span
      ><span class="text-lg font-semibold h-12 flex items-center">{{
        totalRatings
      }}</span>
    </div>
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.moviesOnTS") }}</span
      ><span class="text-lg font-semibold h-12 flex items-center">{{
        amountMovies
      }}</span>
    </div>
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.totalComments") }}</span
      ><span class="text-lg font-semibold h-12 flex items-center">{{
        amountComments
      }}</span>
    </div>
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.totalLikes") }}</span
      ><span class="text-lg font-semibold h-12 flex items-center">{{
        amountLikes
      }}</span>
    </div>
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.totalDislikes") }}</span
      ><span class="text-lg font-semibold h-12 flex items-center">{{
        amountDislikes
      }}</span>
    </div>
  </div>
  <div class="w-full lg:w-1/3">
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.averageComments") }}</span
      ><span class="text-lg font-semibold h-12 flex items-center">{{
        (amountComments / amountMovies).toFixed(2)
      }}</span>
    </div>
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.averageLikes") }}</span
      ><span class="text-lg font-semibold h-12 flex items-center">{{
        (amountLikes / amountMovies).toFixed(2)
      }}</span>
    </div>
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.averageDislikes") }}</span
      ><span class="text-lg font-semibold h-12 flex items-center">{{
        (amountDislikes / amountMovies).toFixed(2)
      }}</span>
    </div>
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.averageRatings") }}</span
      ><span class="text-lg font-semibold h-12 flex items-center">{{
        (totalRatings / amountMovies).toFixed(2)
      }}</span>
    </div>
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.launch") }}</span
      ><span class="text-lg font-semibold h-12 flex items-center">2021</span>
    </div>
  </div>
  <div class="w-full lg:w-1/3">
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.average") }} Triggerscore</span>
      <div
        class="h-12 w-12 text-white rounded-lg font-semibold text-lg"
        :class="getScoreBackground(averageTotal)"
      >
        <div class="relative w-full h-full">
          <span
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >{{ averageTotal }}</span
          >
        </div>
      </div>
    </div>
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.average") }} {{ t("categories.sexism") }}</span>
      <div
        class="h-12 w-12 text-white rounded-lg font-semibold text-lg"
        :class="getScoreBackground(averageSexism)"
      >
        <div class="relative w-full h-full">
          <span
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >{{ averageSexism }}</span
          >
        </div>
      </div>
    </div>
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.average") }} {{ t("categories.racism") }}</span>
      <div
        class="h-12 w-12 text-white rounded-lg font-semibold text-lg"
        :class="getScoreBackground(averageRacism)"
      >
        <div class="relative w-full h-full">
          <span
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >{{ averageRacism }}</span
          >
        </div>
      </div>
    </div>
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.average") }} {{ t("categories.others") }}</span>
      <div
        class="h-12 w-12 text-white rounded-lg font-semibold text-lg"
        :class="getScoreBackground(averageOthers)"
      >
        <div class="relative w-full h-full">
          <span
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >{{ averageOthers }}</span
          >
        </div>
      </div>
    </div>
    <div
      class="flex justify-between items-center border-b border-gray-800 py-4 gap-4"
    >
      <span>{{ t("stats.average") }} {{ t("categories.cringe") }}</span>
      <div
        class="h-12 w-12 text-white rounded-lg font-semibold text-lg"
        :class="getScoreBackground(averageCringe)"
      >
        <div class="relative w-full h-full">
          <span
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >{{ averageCringe }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useStore } from '~/stores/store'
import { useI18n } from 'vue-i18n'
import statsPlaceholder from '~/assets/stats.json'
import { getScoreBackground } from '~/utils/getScoreBackground'

const { t } = useI18n()

const placeholder = statsPlaceholder
const store = useStore()

const totalRatings = computed(
  () => store.stats?.totalRatings ?? placeholder.totalRatings
)
const amountMovies = computed(
  () => store.stats?.amountMovies ?? placeholder.amountMovies
)
const amountComments = computed(
  () => store.stats?.amountComments ?? placeholder.amountComments
)
const amountLikes = computed(
  () => store.stats?.amountLikes ?? placeholder.amountLikes
)
const amountDislikes = computed(
  () => store.stats?.amountDislikes ?? placeholder.amountDislikes
)

const averageTotal = computed(
  () => store.stats?.averageTotal ?? placeholder.averageScoreTotal
)
const averageSexism = computed(
  () => store.stats?.averageSexism ?? placeholder.averageScoreSexism
)
const averageRacism = computed(
  () => store.stats?.averageRacism ?? placeholder.averageScoreRacism
)
const averageCringe = computed(
  () => store.stats?.averageCringe ?? placeholder.averageScoreCringe
)
const averageOthers = computed(
  () => store.stats?.averageOthers ?? placeholder.averageScoreOthers
)
</script>
