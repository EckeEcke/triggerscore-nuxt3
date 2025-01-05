<template>
    <div class="w-32 mx-auto -mt-8 opacity-70">
      <client-only>
        <Vue3Lottie :animationData="animation" :loop="false" :autoPlay="true" />
      </client-only>
    </div>
  </template>
  
  <script setup>
  import LottieAnimation from "../assets/images/click-animation.json"
  
  const animation = LottieAnimation
  </script>
  