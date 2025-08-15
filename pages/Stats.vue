<template>
  <LoadingAnimation v-if="isLoading" />
  <section v-if="!isLoading" class="sm:px-4 container xl:w-10/12 mx-auto">
    <div
      class="py-16 md:py-20 text-left bg-center bg-cover px-4 rounded sm:my-6"
      :style="{
        backgroundImage:
          'linear-gradient(to bottom, rgba(67,27,27,0.5), rgba(87,27,27,0.6)),url(' +
          '/images/backdrop-jurassicpark.jpg' +
          ')',
      }"
    >
      <div class="">
        <h2
          aria-label="Triggerscore stats"
          class="text-2xl sm:text-4xl font-semibold mb-2 text-white uppercase"
        >
          <span
            class="self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer"
          >
            TRIGGERSC<font-awesome-icon
              aria-hidden="true"
              :icon="['fas', 'angry']"
              class="text-white"
            /><span class="sr-only">O</span>RE
          </span>
          {{ t("general.stats") }}
        </h2>
        <p class="text-base md:text-lg text-white font-semibold">
          {{ t("general.statsCopy") }}
        </p>
      </div>
    </div>
    <div class="sm:pt-4">
      <Stats />
    </div>
  </section>
</template>

<script setup lang='ts'>
import { useStore } from '~/stores/store'
import { useI18n } from 'vue-i18n'
import LoadingAnimation from '~/components/animations/LoadingAnimation.vue'

const { t } = useI18n()
const isLoading = computed(
  () =>
    store.highlightsLoading ||
    store.moviesLoading ||
    store.triggerscores.length == 0
)

const store = useStore()

</script>
