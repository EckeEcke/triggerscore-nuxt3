<template>
  <div
    class="max-w-screen p-16 relative flex justify-center mx-auto animate-pulse"
    style="width: 600px; margin-bottom: 5rem; max-width: 100vw"
  >
    <client-only>
      <Vue3Lottie animation-link="/animations/loading-animation3.json" />
    </client-only>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2">
      <h2 class="text-white font-semibold text-4xl">
        {{ t("general.loadMovies") }}
      </h2>
    </div>
  </div>
</template>

<script setup lang='ts'>
const { t } = useI18n()
</script>
