<template>
  <div class="flex my-1 text-sm">
    <div class="flex justify-center rounded-lg w-8 h-8 mr-2 bg-opacity-80" :class="getScoreBackground(score)">
      <div class="self-center text-white">
        {{ score }}
      </div>
    </div>
    <p class="self-center">{{ name }}</p>
  </div>
</template>

<script setup lang='ts'>
import { getScoreBackground } from '~/utils/getScoreBackground'

defineProps({
  score: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})
</script>
