<template>
  <div class="w-64 mx-auto">
    <client-only>
      <Vue3Lottie class="w-64" :animation-data="noResultsJSON" />
    </client-only>
  </div>
</template>

<script setup lang='ts'>
import noResultsJSON from '../../assets/images/noresults-animation.json'
</script>
