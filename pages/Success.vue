<template>
  <div class="container mx-auto px-4 py-12 text-center text-white min-h-screen flex items-center justify-center">
    <div class="max-w-md mx-auto bg-gradient-to-r from-gray-950 to-gray-800 rounded-lg p-8 shadow-lg">
      <div class="mb-6">
        <SuccessAnimation />
        <h1 class="text-2xl md:text-3xl font-bold text-green-400 mb-4 uppercase">
          {{ t('contact.success') }}
        </h1>
        <p class="text-gray-300 mb-6 text-lg">
          {{ t('contact.successMessage') }}
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
            :to="localePath('/')"
            class="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 font-semibold transition uppercase"
        >
          {{ t('contact.backToHome') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import SuccessAnimation from '~/components/animations/SuccessAnimation.vue'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: 'Triggerscore - Message Sent Successfully',
  description: 'Your message has been sent successfully',
  robots: 'noindex',
})
</script>