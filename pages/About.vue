<template>
  <div
    class="container px-4 py-6 md:py-12 text-left text-sm md:text-base xl:w-10/12 mx-auto"
  >
    <Head>
      <Title>Triggerscore - About / What is Triggerscore</Title>
      <Meta charset="UTF-8" />
      <Meta name="keywords" content="triggering movies, about Triggerscore" />
      <Meta
        name="description"
        content="information on what Triggerscore is about"
      />
      <Meta name="author" content="Christian Eckardt" />
      <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <section class="text-white lg:w-3/4">
      <div
        class="h-32 bg-cover bg-center py-12 px-8 mb-8"
        :style="{
          backgroundImage:
            'linear-gradient(to bottom, rgba(47,27,27,0.6), rgba(67,27,27,0.7)),url(' +
            '/images/backdrop-scarymovie.jpg' +
            ')',
        }"
      >
        <h2 class="font-semibold text-4xl mb-2 uppercase">About</h2>
      </div>

      <p class="font-semibold text-2xl">
        {{ t("about.headline") }}
      </p>
      <hr class="my-6" />
      <p class="mt-2 leading-7 mb-4">
        {{ t("about.paragraph1") }}
      </p>
      <p class="mt-2 leading-7">
        {{ t("about.paragraph2") }}
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
const { t } = useI18n()
</script>
