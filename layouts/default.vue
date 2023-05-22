<template>
  <Html :lang="locale"></Html>
  <div class="bg-gray-900 min-h-screen flex flex-col">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~/stores/store'

const store = useStore()
const locale = computed(() => store.locale)

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>