<template>
  <div class="flex my-1 text-sm">
    <div
      class="flex justify-center rounded-lg w-8 h-8 mr-2 bg-opacity-80"
      :class="{
        'bg-red-700': score >= 7,
        'bg-yellow-500': score < 7 && score >= 4,
        'bg-green-600': score < 4,
      }"
    >
      <div class="self-center text-white">
        {{ score }}
      </div>
    </div>
    <p class="self-center">{{ name }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
</script>
