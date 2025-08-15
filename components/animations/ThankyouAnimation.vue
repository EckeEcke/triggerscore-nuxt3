<template>
  <div class="w-72 mx-auto">
    <client-only>
      <Vue3Lottie
        class="w-72"
        :animationData="thankYouAnimation"
        :loop="false"
        :autoPlay="true"
        @onComplete="complete"
      />
    </client-only>
  </div>
</template>

<script setup lang='ts'>
import thankYouAnimation from '../../assets/images/thankyou-animation.json'

const emit = defineEmits(['complete'])

const complete = () => {
  emit('complete')
}
</script>
