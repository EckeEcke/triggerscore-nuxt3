<template>
    <Html :lang="locale"></Html>
    <div class="bg-gray-900 min-h-screen flex flex-col pt-14">
      <Header />
      <h2 class="text-white text-center p-16">ERROR</h2>
      <AngryAnimation class="flex justify-center h-32 w-full"/>
      <Footer />
    </div>
  </template>
  
  <script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useLocaleStore } from '~/stores/localeStore'
  import { useStore } from '~/stores/store'
  
  const store = useStore()
  const route = useRoute()
  const localeStore = useLocaleStore()
  const { locale } = useI18n()

  await navigateTo('/')
  window.location.reload()
  
  onBeforeMount(() => {
    locale.value = localeStore.locale
    const AvailableLanguages = ['en', 'fr', 'de', 'es']
    const splitNavigatorLanguage = (language: string) => {
      return language.split('-')[0]
    }
    if(process.client && !localeStore.localeSetByUser){
      if(navigator && navigator.language){
        const lang = navigator.language === 'en-US' ? 'us' : splitNavigatorLanguage(navigator.language)
        if(AvailableLanguages.includes(lang)){
          localeStore.locale = lang
          locale.value = lang
        }
      }
    }
  })
  
  
  
  </script>