<template>
  <div class="relative flex align-center">
    <button
      v-if="locale == 'de'"
      @click="showSelection = !showSelection"
      class="mr-6 sm:mr-10"
    >
      <img
        alt="flag Germany"
        class="w-6 h-4 custom-shadow"
        src="../assets/images/germany.svg"
      />
    </button>
    <button
      v-if="locale == 'en'"
      @click="showSelection = !showSelection"
      class="mr-6 sm:mr-10"
    >
      <img
        alt="flag UK"
        class="w-6 h-4 custom-shadow"
        src="../assets/images/uk.svg"
      />
    </button>
    <button
      v-if="locale == 'us'"
      @click="showSelection = !showSelection"
      class="mr-6 sm:mr-10"
    >
      <img
        alt="flag US"
        class="w-6 h-4 custom-shadow"
        src="../assets/images/usa.svg"
      />
    </button>
    <button
      v-if="locale == 'fr'"
      @click="showSelection = !showSelection"
      class="mr-6 sm:mr-10"
    >
      <img
        alt="flag France"
        class="w-6 h-4 custom-shadow"
        src="../assets/images/france.svg"
      />
    </button>
    <button
      v-if="locale == 'es'"
      @click="showSelection = !showSelection"
      class="mr-6 sm:mr-10"
    >
      <img
        alt="flag Spain"
        class="w-6 h-4 custom-shadow"
        src="../assets/images/spain.svg"
      />
    </button>
    <ul
      v-if="showSelection"
      v-click-away="hideSelection"
      class="absolute -left-2 bg-gradient-to-r from-gray-950 to-gray-800 text-white top-9 md:top-10 p-2 flex flex-col gap-2 w-20"
    >
      <NuxtLink
        :to="switchLocalePath('us')"
        tag="li"
        class="flex gap-2 cursor-pointer hover:text-yellow-500"
      >
        <img class="w-6 self-center h-3" src="../assets/images/usa.svg" />US
      </NuxtLink>
      <NuxtLink
        :to="switchLocalePath('en')"
        tag="li"
        class="flex gap-2 cursor-pointer hover:text-yellow-500"
      >
        <img class="w-6 self-center h-3" src="../assets/images/uk.svg" />EN
      </NuxtLink>
      <NuxtLink
        :to="switchLocalePath('de')"
        tag="li"
        class="flex gap-2 cursor-pointer hover:text-yellow-500"
      >
        <img class="w-6 self-center h-3" src="../assets/images/germany.svg" />DE
      </NuxtLink>
      <NuxtLink
        :to="switchLocalePath('fr')"
        tag="li"
        class="flex gap-2 cursor-pointer hover:text-yellow-500"
      >
        <img class="w-6 self-center h-3" src="../assets/images/france.svg" />FR
      </NuxtLink>
      <NuxtLink
        :to="switchLocalePath('es')"
        tag="li"
        class="flex gap-2 cursor-pointer hover:text-yellow-500"
      >
        <img class="w-6 self-center h-3" src="../assets/images/spain.svg" />ES
      </NuxtLink>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useStore } from "../stores/store";

const { locale } = useI18n();
const selectedLocale = computed(() => locale.value);
const switchLocalePath = useSwitchLocalePath()

const showSelection = ref(false);
const store = useStore();

function hideSelection() {
  showSelection.value = false;
}

function switchLanguage(language: string) {
  locale.value = language;
  store.setTriggerscores(locale.value);
  store.setRecentRatings(locale.value);
  store.setTop10Sexism(locale.value);
  store.setTop10Racism(locale.value);
  store.setTop10Others(locale.value);
  store.setTop10Cringe(locale.value);
  store.setBondMovies(locale.value);
}
</script>

<style scoped>
.custom-shadow {
  box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 6px;
}
</style>
