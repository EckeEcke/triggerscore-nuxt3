<template>
  <span v-if="isLoading" class="loader mr-6 sm:mr-10"></span>
  <div v-else class="relative flex align-center">
    <template v-for="(option, index) in languageOptions" :key="index">
      <button
          v-if="locale == option.locale"
          class="mr-6 sm:mr-10"
          @click="showSelection = !showSelection"
      >
        <img
            :alt="'Flag ' + option.locale"
            class="w-6 h-4 custom-shadow"
            :src="option.flag"
        >
      </button>
    </template>
    <ul
      v-if="showSelection"
      v-click-away="hideSelection"
      class="absolute -left-2 bg-gradient-to-r from-gray-950 to-gray-800 text-white top-9 md:top-10 p-2 flex flex-col gap-2 w-20"
    >
      <li v-for="(option, index) in languageOptions" :key="index">
        <NuxtLink :to="switchLocalePath(option.locale)" class="flex gap-2 cursor-pointer hover:text-yellow-500">
          <img class="w-6 self-center h-3" :src="option.flag" alt="" >
          <span class="mt-1">{{ option.locale.toUpperCase()}}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import { type Locale, useI18n } from 'vue-i18n'
import deFlag from '../assets/images/germany.svg'
import ukFlag from '../assets/images/uk.svg'
import frFlag from '../assets/images/france.svg'
import esFlag from '../assets/images/spain.svg'
import usFlag from '../assets/images/usa.svg'

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const store = useStore()

const showSelection = ref(false)

const hideSelection = () => {
  showSelection.value = false
}

const languageOptions: { locale: Locale, flag: string }[] = [
  {
    locale: 'de',
    flag: deFlag,
  },
  {
    locale: 'en',
    flag: ukFlag,
  },
  {
    locale: 'us',
    flag: usFlag,
  },
  {
    locale: 'fr',
    flag: frFlag,
  },
  {
    locale: 'es',
    flag: esFlag,
  },
]

const isLoading = computed(() => store.moviesLoading || store.isFiltering)
</script>

<style scoped>
.custom-shadow {
  box-shadow: rgba(0, 0, 0, 0.3) 0 4px 6px;
}

.loader {
  width: 16px;
  height: 16px;
  border: 5px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
