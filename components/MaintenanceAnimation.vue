<template>
  <div class="w-64 h-64">
    <client-only>
      <Vue3Lottie :animationData="newJSON" />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import newJSON from "../assets/images/maintenance-animation.json"
</script>
