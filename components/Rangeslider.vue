<template>
  <div class="flex flex-col justify-center items-center w-72 max-w-full">
    <div class="relative max-w-xl w-full">
      <div>
        <input
          v-model="store.minScore"
          type="range"
          min="0"
          max="10"
          step="0.1"
          class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer left-0 focus:outline"
          @input="minTrigger"
          @focus="minHasFocus = true"
          @blur="minHasFocus = false"
        >
        <input
          v-model="store.maxScore"
          type="range"
          min="0"
          max="10"
          step="0.1"
          class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer left-0 focus:outline"
          @input="maxTrigger"
          @focus="maxHasFocus = true"
          @blur="maxHasFocus = false"
        >
        <div class="relative z-10 h-2">
          <div class="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"/>
          <div class="absolute z-20 top-0 bottom-0 rounded-md bg-yellow-300" :style="'right:' + maxThumb + '%; left:' + minThumb + '%'"
          />
          <div
            class="absolute z-30 w-6 h-6 top-0 left-0 bg-yellow-500 rounded-full -mt-2 -ml-1"
            :style="'left: ' + minThumb + '%'"
            :class="{'ring-2 ring-white': minHasFocus}"
          />
          <div
            class="absolute z-30 w-6 h-6 top-0 right-0 bg-yellow-500 rounded-full -mt-2 -mr-3"
            :style="'right: ' + maxThumb + '%'"
            :class="{'ring-2 ring-white': maxHasFocus}"
          />
        </div>
      </div>
    </div>
    <div v-if="minScore > 0 || maxScore < 10" class="flex justify-around w-full mt-4 xl:mt-2">
      <span>{{ minScore }}</span>
      <span>{{ t("filter.to") }}</span>
      <span>{{ maxScore }}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useStore } from '~/stores/store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useStore()

const min = ref(0)
const max = ref(10)
const minThumb = ref(0)
const maxThumb = ref(0)

const minHasFocus = ref(false)
const maxHasFocus = ref(false)

const minScore = computed(() => store.minScore)

const maxScore = computed(() => store.maxScore)

const minTrigger = () => {
  if (minScore.value >= maxScore.value) {
    store.minScore = maxScore.value - 1
  }
  if (minScore.value == 10) {
    store.minScore = 0
  }
  minThumb.value =
    (minScore.value - min.value) / (max.value - min.value) * 100
  store.filterMovies()
}

const maxTrigger = () => {
  if (maxScore.value >= max.value) {
    store.maxScore = 10
  }
  if (maxScore.value <= minScore.value) {
    store.maxScore = minScore.value + 1
  }
  maxThumb.value =
    100 - ((maxScore.value - min.value) / (max.value - min.value)) * 100
  store.filterMovies()
}

onMounted(() => {
  minTrigger()
  maxTrigger()
  watch(
    () => store.minScore,
    (currentValue) => {
      if (currentValue == 0) {
        minTrigger()
        store.filterMovies()
      }
    }
  )

  watch(
    () => store.maxScore,
    (currentValue) => {
      if (currentValue == 10) {
        maxTrigger()
        store.filterMovies()
      }
    }
  )
})
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  pointer-events: all;
  width: 24px;
  height: 24px;
}
</style>
