<template>
  <div class="relative text-center mx-auto text-center" style="max-width: 400px;">
    <NuxtLink :to="localePath('/Quiz')" tag="div">
    <div
    class="headline-wrapper absolute w-full text-3xl self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200"
    >
      <h2 aria-label="TRIGGERSCORE QUIZ">
        TRIGGERSC<font-awesome-icon
          aria-hidden="true"
          :icon="['fas', 'angry']"
          class="text-white"
        /><span class="sr-only">O</span>RE QUIZ
      </h2>
    </div>
    <p class="absolute bottom-4 w-full text-white text-3xl font-semibold box-shadow">
      {{ t('quiz.testYourMovieKnowledge') }}
    </p>
    <div class="mx-auto">
      <img src="/images/quiz-image.png" alt="quiz illustration" />
    </div>
  </NuxtLink>
  </div>
  
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"

const { t } = useI18n()
</script>

<style scoped>
img {
  max-width: 400px;
  margin: 0 auto;
}

.headline-wrapper {
  top: 16px;
  width: 100%;
}

p {
  text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
}
</style>
