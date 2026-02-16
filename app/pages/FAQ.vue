<template>
  <div class="container text-white py-6 px-4 md:py-12 xl:w-10/12 text-left text-sm md:text-base mx-auto md:rounded-lg">
    <Head>
      <Title>Triggerscore - FAQ / Frequently asked questions</Title>
      <Meta charset="UTF-8" />
      <Meta
        name="keywords"
        content="triggering movies, frequently asked questions, FAQ"
      />
      <Meta
        name="description"
        content="Frequently asked questions about Triggerscore"
      />
      <Meta name="author" content="Christian Eckardt" />
      <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div class="lg:w-3/4">
      <div
        class="h-32 bg-cover bg-center py-12 px-8 mb-8"
        :style="{
          backgroundImage:
            'linear-gradient(to bottom, rgba(47,27,27,0.6), rgba(67,27,27,0.7)),url(' +
            '/images/backdrop-scarymovie.webp' +
            ')',
        }"
      >
        <h2 class="font-semibold text-4xl mb-2 uppercase">
          {{ t("faq.headline") }}
        </h2>
      </div>
      <p class="font-semibold text-2xl">{{ t("faq.subheadline") }}</p>
      <hr class="my-6" >
      <section class="mt-4 leading-7">
        <p class="mb-2">
          <b>{{ t("faq.question1") }}</b>
        </p>
        <p>{{ t("faq.answer1") }}</p>
      </section>
      <section class="mt-4 leading-7">
        <p class="mb-2">
          <b>{{ t("faq.question2") }}</b>
        </p>
        <p>{{ t("faq.answer2") }}</p>
      </section>
      <section class="mt-4 leading-7">
        <p class="mb-2">
          <b>{{ t("faq.question3") }}</b>
        </p>
        <p>{{ t("faq.answer3") }}</p>
      </section>
      <section class="mt-4 leading-7">
        <p class="mb-2">
          <b>{{ t("faq.question4") }}</b>
        </p>
        <p>{{ t("faq.answer4") }}</p>
      </section>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useSeoMeta({
  title: 'Triggerscore - FAQ / Frequently asked questions',
  description: 'Frequently asked questions about Triggerscore',
  author: 'Christian Eckardt',
  ogTitle: 'Triggerscore - FAQ / Frequently asked questions',
  ogDescription: 'Frequently asked questions about Triggerscore',
  ogUrl: () => `https://www.triggerscore.de/faq`,
  ogType: 'website',
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1.0',
})
</script>
