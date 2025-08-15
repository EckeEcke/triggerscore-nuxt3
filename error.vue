<template>
    <Html :lang="locale"></Html>
    <div class="bg-gray-900 min-h-screen flex flex-col pt-14">
      <Header />
      <h2 class="text-white text-center p-16">ERROR</h2>
      <AngryAnimation class="flex justify-center h-32 w-full" />
      <Footer />
    </div>
  </template>
  
  <script setup lang='ts'>
  import { useI18n } from 'vue-i18n'
  import AngryAnimation from '~/components/animations/AngryAnimation.vue'

  const { locale } = useI18n()

  await navigateTo('/')
  window.location.reload()
  
  </script>