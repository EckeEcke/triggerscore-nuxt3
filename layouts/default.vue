<template>
  <Html :lang="locale"></Html>
  <div class="bg-gray-900 min-h-screen flex flex-col pt-14">
    <template v-if="isMaintained">
      <div class="fixed top-1/2 -translate-y-1/2 flex flex-col justify-center gap-8 w-full text-white text-xl font-semibold items-center">
        <MaintenanceAnimation />
        Currenty under maintenance
      </div>
    </template>   
    <template v-else>
      <Header />
      <slot />
      <Footer />
    </template> 
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useStore } from "~/stores/store"

const { locale } = useI18n()
const store = useStore()

const isMaintained = store.isMaintenanceMode

if (!isMaintained){
  store.setTriggerscores(locale.value)
  store.setRecentRatings(locale.value)
  store.setBondMovies(locale.value)
  store.setRecentComments()
}

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
