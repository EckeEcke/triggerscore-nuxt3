<template>
  <div class="relative flex align-center">
    <button
      v-if="localeStore.locale == 'de'"
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
      v-if="localeStore.locale == 'en'"
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
      v-if="localeStore.locale == 'us'"
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
      v-if="localeStore.locale == 'fr'"
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
      v-if="localeStore.locale == 'es'"
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
      <li
        @click="switchLanguage('us')"
        class="flex gap-2 cursor-pointer hover:text-yellow-500"
      >
        <img class="w-6 self-center h-3" src="../assets/images/usa.svg" />US
      </li>
      <li
        @click="switchLanguage('en')"
        class="flex gap-2 cursor-pointer hover:text-yellow-500"
      >
        <img class="w-6 self-center h-3" src="../assets/images/uk.svg" />EN
      </li>
      <li
        @click="switchLanguage('de')"
        class="flex gap-2 cursor-pointer hover:text-yellow-500"
      >
        <img class="w-6 self-center h-3" src="../assets/images/germany.svg" />DE
      </li>
      <li
        @click="switchLanguage('fr')"
        class="flex gap-2 cursor-pointer hover:text-yellow-500"
      >
        <img class="w-6 self-center h-3" src="../assets/images/france.svg" />FR
      </li>
      <li
        @click="switchLanguage('es')"
        class="flex gap-2 cursor-pointer hover:text-yellow-500"
      >
        <img class="w-6 self-center h-3" src="../assets/images/spain.svg" />ES
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useLocaleStore } from "~/stores/localeStore";
import { useStore } from "../stores/store";

const { locale } = useI18n();
const selectedLocale = computed(() => locale.value);

const showSelection = ref(false);
const store = useStore();
const localeStore = useLocaleStore();

function hideSelection() {
  showSelection.value = false;
}

function switchLanguage(language: string) {
  locale.value = language;
  localeStore.locale = language;
  localeStore.localeSetByUser = true;
  store.setTriggerscores();
  store.setRecentRatings();
  store.setTop10Sexism();
  store.setTop10Racism();
  store.setTop10Others();
  store.setTop10Cringe();
  store.setBondMovies();
}
</script>

<style scoped>
.custom-shadow {
  box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 6px;
}
</style>
