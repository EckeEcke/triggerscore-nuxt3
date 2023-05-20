<template>
    <div class="bg-cover bg-center" :class="showTitle ? 'py-16 md:py-24' : 'py-8'"  :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(47,27,27,0.6), rgba(67,27,27,0.7)),url(' + ('/images/backdrop-scarymovie.jpg') + ')'}">
        <div class="container mx-auto px-4 xl:w-10/12">
            <h1 v-if="showTitle" class="text-white text-2xl md:text-4xl font-semibold text-left">
                {{ t('search.searchHeadline1') }}<NuxtLink to="/faq" class="text-yellow-500 transition hover:text-yellow-600">Triggerscore</NuxtLink> {{ t('search.searchHeadline2') }}
            </h1>
            <div class="flex flex-col md:flex-row mx-auto">
            <div class="flex mx-auto py-4 self-center w-full opacity-95">
                <div class="rounded-lg flex w-full justify-start focus-within:shadow-inner">
                <button class="flex items-center justify-center px-3 w-16 rounded-l-xl bg-yellow-500 transition hover:bg-yellow-600 text-white" @click="searchMovie" :disabled="store.searchInput.length == 0">
                    <font-awesome-icon :icon="['fas', 'search']" class="text-lg" />
                </button>
                <input type="text" id="search" v-model="store.searchInput" v-on:keyup.enter="searchMovie" @input="resetSearchResults" class="px-4 py-4 w-full rounded-r-xl outline-none transition scroll-my-4 lg:text-xl opacity-80 focus:opacity-100" style="scroll-margin-top: 10rem;" :placeholder="t('header.searchPlaceholder')">
                </div>
            </div>
        </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { useStore } from '~/stores/store'
import { useI18n } from 'vue-i18n'

const props = defineProps({
    showTitle: Boolean,
})

const { t } = useI18n()

const router = useRouter()
const store = useStore()

async function searchMovie() {
    if(store.searchInput.length > 0){
        await store.setSearchResults()
        console.log('waited')
        router.push('/search')
    } 
}
function resetSearchResults() {
    store.resetSearch()
}
</script>
