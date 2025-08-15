<template>
  <div class="relative text-center mx-auto" style="max-width: 400px;">
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
    <transition
          enter-active-class="duration-500 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-500 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ClickAnimation v-if="showAnimation" class="animation" />
        </transition>
  </NuxtLink>
  </div>
  
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import ClickAnimation from './animations/ClickAnimation.vue'

const { t } = useI18n()

const localePath = useLocalePath()

const showAnimation = ref(false)
let interval: ReturnType<typeof setInterval> | undefined = undefined

const toggleAnimation = () => {
  showAnimation.value = !showAnimation.value
}

interval = setInterval(() => {
    toggleAnimation()
    setTimeout(toggleAnimation, 1500)
  }, 7000)

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})

</script>

<style scoped>
img {
  width: 100%;
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

.animation {
  position: absolute;
  top: 70%;
  left: 70%;
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>
