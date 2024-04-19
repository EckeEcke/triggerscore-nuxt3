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
          class="text-2xl sm:text-4xl font-semibold mb-2 text-white uppercase"
        >
          <span
            class="self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer"
          >
            TRIGGERSC<font-awesome-icon
              :icon="['fas', 'angry']"
              class="text-white"
            />RE
          </span>
          {{ $t("general.stats") }}
        </h2>
        <p class="text-base md:text-lg text-white font-semibold">
          {{ $t("general.statsCopy") }}
        </p>
      </div>
    </div>
    <div class="sm:pt-4">
      <Stats />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store"

const { locale } = useI18n()
const isLoading = computed(
  () =>
    store.highlightsLoading ||
    store.moviesLoading ||
    store.triggerscores.length == 0
)

const store = useStore()
store.setTriggerscores(locale.value)
store.setBondMovies(locale.value)
store.setRecentRatings(locale.value)
store.setTop10Racism(locale.value)
store.setTop10Sexism(locale.value)
store.setTop10Others(locale.value)
store.setTop10Cringe(locale.value)
store.setRecentComments()
</script>
