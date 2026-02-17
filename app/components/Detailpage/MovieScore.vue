<template>
  <div v-if="score" class="movie-score-wrapper">
      <div
        class="score-background"
        :class="getScoreBackground(score.rating_total)"
      >
        <div class="total-score">
          {{ score.rating_total }}
        </div>
      </div>
      <div class="sub-scores">
        <div v-for="cat in categories" :key="cat.key" class="sub-score-wrapper">
          <div
              class="sub-score-background"
              :class="getScoreBackground(score[cat.key])"
          >
            <div class="self-center">{{ score[cat.key] }}</div>
          </div>
          <div class="self-center">{{ cat.label }}</div>
        </div>
      </div>
  </div>
  <div v-else class="no-score-wrapper">
    <div
      class="no-score-text"
    >
      TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
    </div>
    <p class="no-score-subtext">{{ t("general.noRatings") }}</p>
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

<style scoped>
.movie-score-wrapper {
  @apply w-full flex flex-col mx-2 self-center rounded-tr;
}

.score-background {
  @apply mx-auto bg-opacity-90 w-12 sm:w-20 md:w-24 lg:w-20 h-12 sm:h-20 md:h-24 lg:h-20 border border-gray-900 p-2 text-3xl rounded-lg flex justify-center my-3;
}

.total-score {
  @apply self-center text-white text-lg md:text-xl font-semibold;
}

.sub-scores {
  @apply text-left w-auto mx-auto text-white text-xs sm:text-base;
}

.sub-score-wrapper {
  @apply flex my-2 md:text-lg lg:text-base;
}

.sub-score-background {
  @apply flex rounded sm:rounded-lg justify-center w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 mr-2;
}

.no-score-wrapper {
  @apply w-full flex flex-col mx-2 self-center rounded-tr;
}

.no-score-text {
  @apply text-base md:text-2xl lg:text-lg self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200;
}

.no-score-subtext {
  @apply text-base md:text-2xl lg:text-lg self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200;
}
</style>