<template>
  <div class="w-6 relative inline-block" style="transform: translateY(4px)">
    <client-only>
      <Vue3Lottie :animationData="AngryJSON" />
    </client-only>
  </div>
</template>

<script setup lang='ts'>
import AngryJSON from '../../assets/images/angry-animation.json'
</script>
