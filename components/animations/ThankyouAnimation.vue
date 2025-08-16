<template>
  <div class="w-72 mx-auto">
    <client-only>
      <Vue3Lottie
        class="w-72"
        :animation-data="thankYouAnimation"
        :loop="false"
        :auto-play="true"
        @on-complete="complete"
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
