<template>
  <div class="absolute flex justify-center mx-auto w-64 h-64">
    <client-only>
      <Vue3Lottie :animationData="newJSON" />
    </client-only>
  </div>
</template>

<script setup lang='ts'>
import newJSON from '../../assets/images/new-animation.json'
</script>
