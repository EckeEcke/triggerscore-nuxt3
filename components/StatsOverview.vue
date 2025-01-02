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
        :class="{
          'bg-red-700': averageTotal >= 7,
          'bg-yellow-500': averageTotal < 7 && averageTotal >= 4,
          'bg-green-600': averageTotal < 4,
        }"
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
        :class="{
          'bg-red-700': averageSexism >= 7,
          'bg-yellow-500': averageSexism < 7 && averageSexism >= 4,
          'bg-green-600': averageSexism < 4,
        }"
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
        :class="{
          'bg-red-700': averageRacism >= 7,
          'bg-yellow-500': averageRacism < 7 && averageRacism >= 4,
          'bg-green-600': averageRacism < 4,
        }"
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
        :class="{
          'bg-red-700': averageOthers >= 7,
          'bg-yellow-500': averageOthers < 7 && averageOthers >= 4,
          'bg-green-600': averageOthers < 4,
        }"
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
        :class="{
          'bg-red-700': averageCringe >= 7,
          'bg-yellow-500': averageCringe < 7 && averageCringe >= 4,
          'bg-green-600': averageCringe < 4,
        }"
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

<script setup lang="ts">
import { useStore } from "~/stores/store"
import { useI18n } from "vue-i18n"
import statsPlaceholder from "~/assets/stats.json"

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
  () => store.stats?.averageScoreTotal ?? placeholder.averageScoreTotal
)
const averageSexism = computed(
  () => store.stats?.averageScoreSexism ?? placeholder.averageScoreSexism
)
const averageRacism = computed(
  () => store.stats?.averageScoreRacism ?? placeholder.averageScoreRacism
)
const averageCringe = computed(
  () => store.stats?.averageScoreCringe ?? placeholder.averageScoreCringe
)
const averageOthers = computed(
  () => store.stats?.averageScoreOthers ?? placeholder.averageScoreOthers
)
</script>
