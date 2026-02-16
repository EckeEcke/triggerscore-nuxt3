<template>
  <div v-if="score" class="w-full flex flex-col mx-2 self-center rounded-tr">
      <div
        class="mx-auto bg-opacity-90 w-12 sm:w-20 md:w-24 lg:w-20 h-12 sm:h-20 md:h-24 lg:h-20 border border-gray-900 p-2 text-3xl rounded-lg flex justify-center my-3"
        :class="getScoreBackground(score.rating_total)"
      >
        <div class="self-center text-white text-lg md:text-xl font-semibold">
          {{ score.rating_total }}
        </div>
      </div>
      <div class="text-left w-auto mx-auto text-white text-xs sm:text-base">
        <div v-for="cat in categories" :key="cat.key" class="flex my-2 md:text-lg lg:text-base">
          <div
              class="flex rounded sm:rounded-lg justify-center w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 mr-2"
              :class="getScoreBackground(score[cat.key])"
          >
            <div class="self-center">{{ score[cat.key] }}</div>
          </div>
          <div class="self-center">{{ cat.label }}</div>
        </div>
      </div>
  </div>
  <div v-else class="w-full flex flex-col mx-2 self-center rounded-tr">
    <div
      class="text-base md:text-2xl lg:text-lg self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200"
    >
      TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
    </div>
    <p class="text-white mt-4">{{ t("general.noRatings") }}</p>
  </div>
</template>

<script setup lang='ts'>
import { type ScoreKey, type TriggerScore, useStore } from '~/stores/store'
import { getScoreBackground } from '~/utils/getScoreBackground'

const { t } = useI18n()
const store = useStore()

const score: ComputedRef<TriggerScore | undefined> = computed(() => store.selectedMovieScore)

const categories: { key: ScoreKey; label: string }[] = [
  { key: 'rating_sexism', label: t("categories.sexism") },
  { key: 'rating_racism', label: t("categories.racism") },
  { key: 'rating_others', label: t("categories.others") },
  { key: 'rating_cringe', label: t("categories.cringe") },
]

</script>