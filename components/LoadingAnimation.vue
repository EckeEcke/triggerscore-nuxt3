<template>
  <div
    class="max-w-screen p-16 relative flex justify-center mx-auto animate-pulse"
    style="width: 600px; margin-bottom: 5rem; max-width: 100vw"
  >
    <client-only>
      <Vue3Lottie :animationData="loadingJSON" />
    </client-only>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2">
      <p class="text-white font-semibold text-4xl">
        {{ t("general.loadMovies") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import loadingJSON from "../assets/images/loading-animation3.json"

const { t } = useI18n()
</script>
