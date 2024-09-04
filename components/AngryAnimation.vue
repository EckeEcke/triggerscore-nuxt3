<template>
  <div class="w-6 relative inline-block" style="transform: translateY(4px)">
    <client-only>
      <Vue3Lottie :animationData="angryJSON" />
    </client-only>
  </div>
</template>

<script setup>
import AngryJSON from "../assets/images/angry-animation.json"

const angryJSON = AngryJSON
</script>
