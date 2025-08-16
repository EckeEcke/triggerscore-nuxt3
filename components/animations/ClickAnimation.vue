<template>
    <div class="w-32 mx-auto -mt-8 opacity-70">
      <client-only>
        <Vue3Lottie :animation-data="animation" :loop="false" :auto-play="true" />
      </client-only>
    </div>
  </template>
  
  <script setup lang="ts">
  import LottieAnimation from '../../assets/images/click-animation.json'
  
  const animation = LottieAnimation
  </script>
  