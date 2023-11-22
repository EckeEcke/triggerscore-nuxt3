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
import { useLocaleStore } from "~/stores/localeStore";
import { useStore } from "~/stores/store";

const store = useStore();
const localeStore = useLocaleStore();
const { locale } = useI18n();

useHead({
  script: [
    { src: "//static.getclicky.com/js", async: true, "data-id": "101434676" },
  ],
});

onBeforeMount(() => {
  locale.value = localeStore.locale;
  const AvailableLanguages = ["en", "fr", "de", "es"];
  const splitNavigatorLanguage = (language: string) => {
    return language.split("-")[0];
  };
  if (process.client && !localeStore.localeSetByUser) {
    if (navigator && navigator.language) {
      const lang =
        navigator.language === "en-US"
          ? "us"
          : splitNavigatorLanguage(navigator.language);
      if (AvailableLanguages.includes(lang)) {
        localeStore.locale = lang;
        locale.value = lang;
      }
    }
  }
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
