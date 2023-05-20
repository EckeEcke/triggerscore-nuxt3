<template>
    <main class="bg-gray-900">
        <Head>
            <Title>Triggerscore - Searchpage</Title>
            <Meta 
                charset="UTF-8"
            />
            <Meta 
                name="keywords" 
                content="triggering movies, search page"
            />
            <Meta 
                name="desription" 
                content="search results for triggering movies"
            />
            <Meta 
                name="author" 
                content="Christian Eckardt"
            />
            <Meta 
                name="viewport" 
                content="width=device-width, initial-scale=1.0"
            />
        </Head>
        <div v-if="store.searchResults.length == 0 && store.searchError" class=" text-center font-semibold container mx-auto my-8  xl:w-10/12 md:px-4">
            <div class="py-6 px-2 md:rounded-lg">
                <p class="text-white text-lg">{{ t('search.noResults1') }} <i>"{{store.searchTerm}}"</i>&nbsp; {{ t('search.noResults2') }}</p>
                <NoResultsAnimation />
                <button class="bg-yellow-500 transition hover:bg-yellow-600 p-3 my-6 rounded font-semibold text-white uppercase" @click="resetSearch"><font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="mr-2" />{{ t('general.back') }}</button>
            </div>
        </div>
        <div v-if="store.searchResults.length > 0 && !store.searchError" class=" text-center font-semibold container mx-auto my-8  xl:w-10/12 md:px-4">
            <div class="py-6 px-2 md:rounded">
                <p class="text-white text-lg">{{ t('search.results',[store.searchTerm,store.searchResults.length])}}</p>
                <button class="bg-yellow-500 transition hover:bg-yellow-600 p-3 mt-3 rounded font-semibold text-white uppercase" @click="$router.go(-1)"><font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="mr-2" />{{ t('general.back') }}</button>
            </div>
        </div>
        <transition-group v-if="store.searchResults.length > 0" tag="section" class="movielist grid gap-0 md:gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full relative container mx-auto md:mt-4 mb-24 md:px-4 xl:w-10/12"
            enter-active-class="duration-500 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-500 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >       
            <MovieListitem v-for="movie in store.searchResults" :key="movie.id" :movie="movie" :scores="store.triggerscores[store.triggerscores.map(score => score.movie_id).indexOf(movie.id)]" />
        </transition-group>
        <button v-if="store.searchResults.length > 0 && !hideLoadMore" @click="searchMore" :disabled="loadingMore" class="bg-yellow-500 transition hover:bg-yellow-600 p-3 my-6 rounded font-semibold text-white uppercase -mt-8 mb-20 disabled:opacity-50">{{ t('search.searchMore') }}</button>
    </main>
</template>

<script setup lang="ts">
import { useStore } from '~/stores/store'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const store = useStore()
const router = useRouter()

const page = ref(2)
const hideLoadMore = ref(false)
const loadingMore = ref(false)

function resetSearch() {
    store.resetSearch
    router.go(-1)
}

async function searchMore(){
    loadingMore.value = true
    const lengthBeforeLoad = store.searchResults.length.valueOf()
    await store.searchMore(page.value)
    page.value += 1
    setTimeout(()=>{
        loadingMore.value = false
        if(lengthBeforeLoad == store.searchResults.length){
            hideLoadMore.value = true
        }
    },2000)
}

if(store.searchTerm == ""){
    router.push("/")
}

</script>

<style scoped>
main {
    min-height: calc(100vh - 20rem);
}
</style>