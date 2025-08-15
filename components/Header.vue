<template>
  <header
    class="w-screen h-auto bg-red-950 bg-opacity-95 z-30 shadow-md flex flex-col fixed top-0"
    :class="isFixed ? 'fixed' : 'absolute'"
  >
    <section
      class="container mx-auto h-full p-4 xl:w-10/12 flex justify-between"
    >
      <div class="flex" style="transform: translateY(-3px)">
        <NuxtLink
        :to="localePath('/')"
          tag="h1"
          class="leading-none text-xl md:leading-6 md:text-2xl self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer"
        >
          TRIGGERSC<AngryAnimation />RE
          <!--<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />-->
        </NuxtLink>
      </div>
      <div class="flex sm:text-sm">
        <NuxtLink
          :to="localePath('/all')"
          tag="a"
          class="animated-link text-white font-semibold self-center mr-6 md:mr-10 hidden md:block hover:text-yellow-500 uppercase"
          >{{ t("header.allMovies") }}</NuxtLink
        >
        <NuxtLink
          :to="localePath('/quiz')"
          tag="a"
          class="animated-link text-white font-semibold self-center mr-6 md:mr-10 hidden md:block hover:text-yellow-500 uppercase"
          >QUIZ</NuxtLink
        >
        <NuxtLink
          :to="localePath('/stats')"
          tag="a"
          class="animated-link text-white font-semibold self-center mr-6 md:mr-10 hidden md:block hover:text-yellow-500 uppercase"
          >STATS</NuxtLink
        >
        <NuxtLink
          :to="localePath('/about')"
          tag="a"
          class="animated-link text-white font-semibold self-center mr-6 md:mr-10 hidden md:block hover:text-yellow-500 uppercase"
          >{{ t("header.about") }}</NuxtLink
        >
        <LanguageSelect />
        <font-awesome-icon
          :icon="['fas', 'search']"
          class="text-lg text-white mr-6 sm:mr-10 md:mr-0 self-center hover:text-yellow-500"
          @click="openSearch"
        />
        <span class="md:hidden flex self-center"
          ><font-awesome-icon
            :icon="['fas', 'bars']"
            class="text-white text-lg self-center"
            @click="
              showNav = !showNav;
              showMenu = false;
              showSearch = false;
            "
        /></span>
      </div>
    </section>
    <Teleport to="#__nuxt">
      <transition-group
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-500 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showNav"
          key="backdrop"
          class="fixed bg-gray-900 bg-opacity-40 top-0 left-0 w-full h-screen overflow-none"
          @click="showNav = false"
        />
        <nav
          v-if="showNav"
          key="sidebar"
          class="w-80 bg-gray-900 bg-opacity-80 backdrop-blur h-screen fixed top-0 right-0 shadow-lg md:hidden z-40"
        >
          <div class="text-right text-xl p-4 text-white">
            <font-awesome-icon
              :icon="['fas', 'times']"
              @click="showNav = false"
            />
          </div>
          <div class="mb-6">
            <NuxtLink
              :to="localePath('/')"
              tag="div"
              class="text-2xl md:text-2xl self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer"
              @click="showNav = false"
            >
              TRIGGERSC<font-awesome-icon
                :icon="['fas', 'angry']"
                class="text-white"
              />RE
            </NuxtLink>
          </div>
          <NuxtLink
            :to="localePath('/')"
            tag="a"
            class="text-lg text-white font-semibold self-center hover:text-yellow-500 uppercase"
            ><div class="py-6" @click="showNav = false">
              {{ t("header.home") }}
            </div></NuxtLink
          >
          <NuxtLink
            :to="localePath('/all')"
            tag="a"
            class="text-lg text-white font-semibold self-center hover:text-yellow-500 uppercase"
            ><div class="py-6" @click="showNav = false">
              {{ t("header.allMovies") }}
            </div></NuxtLink
          >
          <NuxtLink
            :to="localePath('/quiz')"
            tag="a"
            class="text-lg text-white font-semibold self-center hover:text-yellow-500 uppercase"
            ><div class="py-6" @click="showNav = false">
              Quiz
            </div></NuxtLink
          >
          <NuxtLink
            :to="localePath('/stats')"
            tag="a"
            class="text-lg text-white font-semibold self-center hover:text-yellow-500 uppercase"
            ><div class="py-6" @click="showNav = false">Stats</div></NuxtLink
          >
          <NuxtLink
            :to="localePath('/about')"
            tag="a"
            class="text-lg text-white font-semibold self-center hover:text-yellow-500 uppercase"
            ><div class="py-6" @click="showNav = false">
              {{ t("header.about") }}
            </div></NuxtLink
          >
          <NuxtLink
            :to="localePath('/faq')"
            tag="a"
            class="text-lg text-white font-semibold self-center hover:text-yellow-500 uppercase"
            ><div class="py-6" @click="showNav = false">
              {{ t("header.faq") }}
            </div></NuxtLink
          >
          <NuxtLink
            :to="localePath('/contact')"
            tag="a"
            class="text-lg text-white font-semibold self-center hover:text-yellow-500 uppercase"
            ><div class="py-6" @click="showNav = false">
              {{ t("header.contact") }}
            </div></NuxtLink
          >
        </nav>
      </transition-group>
    </Teleport>

    <div v-if="showSearch" class="absolute top-0 left-0">
      <div
        class="relative h-screen w-screen bg-gray-900 bg-opacity-90 overflow-none backdrop-blur"
      >
        <div
          class="absolute top-0 left-0 w-full h-full"
          @click="showSearch = false"
        />
        <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-500 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            class="container flex flex-col md:flex-row mx-auto md:px-4 xl:w-10/12 absolute top-1/3 left-1/2 transform -translate-x-1/2 h-32"
          >
            <div
              class="flex mx-auto mt-6 p-4 sm:px-0 h-24 self-center w-full"
              style="max-width: 40rem"
            >
              <div class="rounded-lg flex w-full justify-start">
                <button
                  class="flex items-center justify-center px-3 w-16 rounded-l-xl bg-yellow-500 text-white"
                  @click="searchMovie"
                >
                  <font-awesome-icon
                    :icon="['fas', 'search']"
                    class="text-lg"
                  />
                </button>
                <input
                  type="text"
                  v-model="searchInput"
                  v-on:keyup.enter="searchMovie"
                  @input="resetSearchResults"
                  class="lg:text-xl px-4 w-full outline-none transition"
                  ref="searchHeader"
                  :placeholder="t('header.searchPlaceholder')"
                />
                <div
                  class="bg-white rounded-r-xl h-full w-8 flex justify-center"
                >
                  <font-awesome-icon
                    :icon="['fas', 'times']"
                    class="self-center"
                    @click="showSearch = false"
                  />
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup lang='ts'>
import { useStore } from '~/stores/store'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import AngryAnimation from '~/components/animations/AngryAnimation.vue'

const route = useRoute()
const localePath = useLocalePath()
const { t, locale } = useI18n()
const store = useStore()

const isFixed = computed(() => {
return route.path !== '/Quiz'
})

const showSearch = ref(false)
const showMenu = ref(false)
const showNav = ref(false)

const searchHeader = ref()
const searchInput = ref('')

const searchMovie = () => {
  if (searchInput.value.length > 0) {
    store.searchInput = searchInput.value
    store.setSearchResults(locale.value)
    showSearch.value = false
    navigateTo(localePath('/search'))
  }
}

const resetSearchResults = () => {
  store.resetSearch()
}

const focusSearch = () => {
  searchHeader.value.focus()
}

const openSearch = () => {
  showSearch.value = !showSearch.value
  showMenu.value = false
  showNav.value = false
  setTimeout(focusSearch, 200)
}
</script>

<style>
.animated-link {
  text-decoration: none;
  position: relative;
}

.animated-link::before {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 4px;
  bottom: -4px;
  border-radius: 8px;
  left: 0;
  background-color: rgba(255, 255, 255);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.animated-link:hover::before {
  transform: scaleX(1);
  background-color: rgba(245, 158, 11);
}
</style>
