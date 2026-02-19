<template>
  <div class="triggered-definition">
    <div class="image-wrapper">
      <img src="/images/triggered.webp" alt="triggered-meme" >
    </div>
    <div>
      <h3 class="headline">
        {{ t("definition.headline") }}
      </h3>
      <p class="text-gray-300 leading-7">{{ t("definition.text") }}</p>
      <p class="mt-8 font-semibold">{{ t("definition.list.headline") }}</p>
      <ul class="definition-list">
        <li>{{ t("definition.list.list1") }}</li>
        <li>{{ t("definition.list.list2") }}</li>
        <li>{{ t("definition.list.list3") }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.triggered-definition {
  @apply flex flex-col lg:flex-row gap-4 sm:gap-12;
}

.headline {
  @apply text-2xl font-semibold mb-4;
}

.image-wrapper {
  @apply mx-auto mb-8 sm:mb-0;
}

.definition-list {
  @apply list-disc mt-2 ml-4 text-gray-300 leading-7;
}

img {
  min-width: 25vw;
  max-width: 100%;
}
</style>
