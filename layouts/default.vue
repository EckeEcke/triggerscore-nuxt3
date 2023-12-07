<template>
  <Html :lang="locale"></Html>
  <div class="bg-gray-900 min-h-screen flex flex-col pt-14">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useStore } from "~/stores/store";

const store = useStore();
const { locale } = useI18n();

useHead({
  script: [
    { src: "//static.getclicky.com/js", async: false, "data-id": "101434680" },
  ],
});
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
