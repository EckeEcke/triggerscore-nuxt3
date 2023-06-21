<template>
  <Html :lang="store.locale"></Html>
  <div class="bg-gray-900 min-h-screen flex flex-col pt-14">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useStore } from '~/stores/store'

const store = useStore()
const { locale } = useI18n()
locale.value = store.locale

onMounted(() => {
  const AvailableLanguages = ['en', 'fr', 'de', 'es']
  const splitNavigatorLanguage = (language: string) => {
    return language.split('-')[0]
  }

  if(process.client && !store.localeSetByUser){
    if(navigator && navigator.language){
      const lang = navigator.language === 'en-US' ? 'us' : splitNavigatorLanguage(navigator.language)
      if(AvailableLanguages.includes(lang)){
        store.locale = lang
        locale.value = lang
      }
    }
  }
})



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