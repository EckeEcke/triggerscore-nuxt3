<template>
  <div class="flex flex-col lg:flex-row gap-4 sm:gap-12">
    <div>
      <h3 class="text-2xl font-semibold mb-4">
        {{ t("definition.headline") }}
      </h3>
      <p class="text-gray-300 leading-7">{{ t("definition.text") }}</p>
      <p class="mt-8 font-semibold">{{ t("definition.list.headline") }}</p>
      <ul class="list-disc mt-2 ml-4 text-gray-300 leading-7">
        <li>{{ t("definition.list.list1") }}</li>
        <li>{{ t("definition.list.list2") }}</li>
        <li>{{ t("definition.list.list3") }}</li>
      </ul>
    </div>
    <div class="mx-auto mt-8">
      <img src="/images/triggered.webp" alt="triggered-meme" >
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
img {
  min-width: 25vw;
  max-width: 100%;
}
</style>
