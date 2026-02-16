<template>
  <div class="w-64 mx-auto -mt-8">
    <client-only>
      <Vue3Lottie :animation-data="animation" :loop="false" :auto-play="true" />
    </client-only>
  </div>
</template>

<script setup lang='ts'>
import LottieAnimation from '../../assets/images/success-animation.json'

const animation = LottieAnimation
</script>
