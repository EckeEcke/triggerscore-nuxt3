<template>
    <section class="detailpage w-full bg-center bg-cover bg-fixed" 
        :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), ${backdrop}`,minHeight: 'calc(100vh - 20rem)'}"
    >
    <Head>
        <client-only>
            <Title>{{ movie.title }}</Title>
            <Meta 
                charset="UTF-8"
            />
            <Meta 
                name="keywords" 
                :content="'Triggerscore, triggering movies'+ movie.title"
            />
            <Meta 
                name="description" 
                :content="'triggerscore rating for ' + movie.title"
            />
            <Meta 
                name="author" 
                content="Christian Eckardt"
            />
            <Meta 
                name="viewport" 
                content="width=device-width, initial-scale=1.0"
            />
            <Meta
                property="og:title"
                :content="JSON.stringify(title)"
            />
            <Meta
                property="og:description"
                content="Triggerscore - rating old movies based on how much users today get triggered"
            />
            <Meta
                property="og:image"
                :content="poster"
            />
            <Meta
                property="og:url"
                :content="`https://triggerscore.netlify.app/movie/${route.params.id}`"
            />
            <Meta
                property="og:type"
                content="website"
            />
        </client-only>
        </Head>
        <div class="container mx-auto sm:pt-6 sm:pb-12 xl:w-10/12 md:px-4">
            <LoadingAnimation v-if="movieLoading"/>
            <div v-else class="flex flex-col lg:flex-row lg:rounded-b px-0 sm:px-4 md:px-0">
                <div class="flex flex-col w-full radial-background text-white rounded-t lg:rounded justify-start lg:mr-6 md:p-4">
                    <div class="flex justify-between w-full sm:rounded-t p-4 pr-0">
                        <img :src=poster alt="movie poster" class="w-1/2 lg:w-76 h-auto object-contain self-start rounded self-center" />
                        <div v-if="scoreAvailable" class="w-full flex flex-col mx-2 self-center rounded-tr">
                            <div class="text-base md:text-2xl lg:text-lg self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
                            </div>
                            <div class="mx-auto bg-opacity-90 w-12 sm:w-20 md:w-24 lg:w-20 h-12 sm:h-20 md:h-24 lg:h-20 border border-gray-900 p-2 text-3xl rounded-lg flex justify-center my-3" :class="{'bg-red-700': score.rating_total >= 7, 'bg-yellow-500': score.rating_total < 7 && score.rating_total >=4, 'bg-green-600': score.rating_total < 4}">
                                <p class="self-center text-white text-lg md:text-xl font-semibold">{{score.rating_total}}</p>
                            </div>
                            <div class="text-left w-auto mx-auto text-white text-xs sm:text-base">
                                <div class="flex my-2 md:text-lg lg:text-base">
                                    <div class="flex rounded sm:rounded-lg justify-center w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 mr-2"  :class="{'bg-red-700': score.rating_sexism >= 7, 'bg-yellow-500': score.rating_sexism < 7 && score.rating_sexism >=4, 'bg-green-600': score.rating_sexism < 4}">
                                        <div class="self-center">{{score.rating_sexism}}</div>
                                    </div>
                                    <p class="self-center">{{ t('categories.sexism') }}</p>
                                </div>
                                <div class="flex my-2 md:text-lg lg:text-base">
                                    <div class="flex rounded sm:rounded-lg justify-center w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 mr-2" :class="{'bg-red-700': score.rating_racism >= 7, 'bg-yellow-500': score.rating_racism < 7 && score.rating_racism >=4, 'bg-green-600': score.rating_racism < 4}">
                                        <div class="self-center">{{score.rating_racism}}</div>
                                    </div>
                                    <p class="self-center">{{ t('categories.racism') }}</p>
                                </div>
                                <div class="flex my-2 md:text-lg lg:text-base">
                                    <div class="flex rounded sm:rounded-lg justify-center w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 mr-2" :class="{'bg-red-700': score.rating_others >= 7, 'bg-yellow-500': score.rating_others < 7 && score.rating_others >=4, 'bg-green-600': score.rating_others < 4}">
                                        <div class="self-center">{{score.rating_others}}</div>
                                    </div>
                                    <p class="self-center">{{ t('categories.others') }}</p>
                                </div>
                                <div class="flex my-2 md:text-lg lg:text-base">
                                    <div class="flex rounded sm:rounded-lg justify-center w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 mr-2" :class="{'bg-red-700': score.rating_cringe >= 7, 'bg-yellow-500': score.rating_cringe < 7 && score.rating_cringe >=4, 'bg-green-600': score.rating_cringe < 4}">
                                        <div class="self-center">{{score.rating_cringe}}</div>
                                    </div> 
                                    <p class="self-center">{{ t('categories.cringe') }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="w-full flex flex-col mx-2 self-center rounded-tr">
                            <div class="text-base md:text-2xl lg:text-lg self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
                            </div>
                            <p class="text-white mt-4">{{ t('general.noRatings') }}</p>
                        </div>
                    </div>
                    <div class="flex flex-col xl:flex-row">
                        <div class="w-full text-left px-4 py-2 flex flex-col">
                            <div class="flex justify-between">
                                <h2 class="text-xl font-semibold md:text-2xl self-center mb-1 sm:mb-2">
                                {{ movie.title }}
                                </h2>
                            </div>
                            <div class="mb-4 text-xs md:text-md text-gray-400">
                                {{ releaseDate }}
                                <span class="mx-2">|</span>
                                <span>{{ movie.runtime }} {{ t('general.minutes') }}</span>
                                <template v-if="totalRatings.length">
                                    <span v-if="totalRatings[0]" class="mx-2">|</span>
                                    <span v-if="totalRatings[0]">{{ totalRatings[0].ratings }} {{ t('general.ratings') }}</span>
                                </template>
                                <span v-if="movie.vote_average" class="mx-2">|</span>
                                <span v-if="movie.vote_average"><wbr>{{ t('rating.tmdb-rating') }}: {{ movie.vote_average.toFixed(2) }}</span>
                                <span v-if="score" class="mx-2 mb-2">|</span>
                                <div v-if="score" class="inline-block mt-2 sm:mt-0">
                                    <font-awesome-icon :icon="['fas', 'thumbs-up']" class="mr-1" />
                                    <span class="mr-3">{{ score.likes }}</span>
                                    <font-awesome-icon :icon="['fas', 'thumbs-down']" class="mr-1" />
                                    <span>{{ score.dislikes }}</span>
                                </div>
                            </div>
                            
                            <i v-if="movie.tagline && movie.tagline.length > 1" class="text-sm md: text-md">"{{ movie.tagline }}"</i>
                            <p class="my-4 flex flex-wrap gap-1">
                                <span class="text-xs bg-gray-400 text-white p-2 rounded" v-for="genre in genres" :key="genre">{{ genre }}</span>
                            </p>
                            <article class="my-4 text-sm md:text-md">
                                {{ movie.overview }}
                            </article>
                            <div class="flex justify-between my-4 mb-8 align-end">   
                                <div class="streaming-services flex gap-4 w-full">
                                    <a  v-if="onNetflix" href="https://www.netflix.com" target="_blank" class="self-center">
                                    <img class="w-16" alt="Logo Netflix" src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg">
                                    </a>
                                    <a v-if="onAmazon" href="https://www.amazon.de/primevideo" target="_blank" class="self-center -mx-2">
                                        <img  class="w-16" alt="Logo Prime Video" src="../assets/images/amazon-prime-logo3.svg">
                                    </a>
                                    <a v-if="onDisney" href="https://www.disneyplus.com/" target="_blank" class="self-center">
                                        <img class="w-16" alt="Logo Disney Plus" src="../assets/images/disney+-logo2.svg">
                                    </a>
                                    <a v-if="onSky" href="https://skyticket.sky.de/home/login" target="_blank" class="self-center">
                                        <img class="w-16" alt="Logo WOW" src="../assets/images/sky-logo.svg">
                                    </a>
                                    <a class="self-center" v-if="movie.id" :href="tmdbURL" target="_blank">
                                        <img class="w-16" alt="Logo TMDB" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg">
                                    </a>
                                    <a class="self-center" v-if="movie.imdb_id" :href="imdbURL" target="_blank">
                                        <img class="w-16" alt="Logo IMDB" src="../assets/images/imdb-logo.svg">
                                    </a>
                                    
                                </div>
                            </div>
                            <div class="hidden md:block">
                                <ShareMovie :movie="movie" />
                            </div>
                        </div>
                    </div>
                    <div v-if="comments && comments.length > 0" class="px-4 mb-12 mt-4">
                        <h2 class="text-white font-semibold text-lg text-left mb-6">{{ t('general.comments') }}</h2>
                        <div class="grid sm:grid-cols-2 gap-2">
                            <div v-for="(comment,index) in comments" :key="comment" class="text-white text-left text-sm p-4 md:p-6 pb-10 md:pb-8 bg-gradient-to-br from-gray-950 to-gray-800 italic rounded relative" :class="{'hidden': index >= 2 && !showMoreComments}">
                                <p>"{{ comment }}"</p>
                                <p class="text-gray-500 absolute bottom-2 right-3 transition hover:text-yellow-500 cursor-pointer" @click="pushToContact(comment)">
                                    <font-awesome-icon :icon="['fas', 'flag']" class="mr-1" />
                                    {{ t('rating.report') }}
                                </p>
                            </div>
                        </div>
                        
                        <p v-if="comments.length > 2 && !showMoreComments" @click="showMoreComments = !showMoreComments" class="text-right mt-3 cursor-pointer transition hover:text-yellow-500">{{ t('general.showMore') }} <font-awesome-icon :icon="['fas', 'caret-down']" class="" /></p>
                        <p v-if="comments.length > 2 && showMoreComments" @click="showMoreComments = !showMoreComments" class="text-right mt-3 cursor-pointer transition hover:text-yellow-500">{{ t('general.showLess') }} <font-awesome-icon :icon="['fas', 'caret-up']" class="" /></p>
                    </div>
                </div>
                <Ratingpage :title="movie.title" :id="movie.id" />
                <hr class="border-gray-800 md:hidden">
                <div class="md:hidden py-12 px-2 radial-background">
                    <ShareMovie :movie="movie" align-center />
                </div>     
            </div>          
        </div>
    </section>   
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useStore } from '../stores/store'
import { Movie, emptyMovie } from '~/types/movie'

const store = useStore()
const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()

const movie: Ref<Movie> = ref(emptyMovie)
const backdrop = ref("")
const onNetflix = ref(false)
const onAmazon = ref(false)
const onDisney = ref(false)
const onSky = ref(false)
const releaseDate: Ref<number> = ref(1900)
const score = ref(undefined)
const movieLoading = ref(true)
const showMoreComments = ref(false)

const title = computed(() => movie.value !== emptyMovie ? movie.value?.title : 'Movie on Triggerscore')
const poster = computed(() => `https://image.tmdb.org/t/p/original/${movie.value.poster_path}`)
const genres = computed(() => movie.value.genres.map(genre => genre.name))
const triggerscores = computed(() => loadTriggerscore())
const scoreAvailable = computed(() => score.value !== undefined)
const totalRatings: any = computed(() => 
    store.triggerscores.length > 0
        ? store.triggerscores.filter(movieFromStore => movieFromStore.movie_id == movie.value.id)
        : []
)
const regionProvider = computed(() => {
    if(store.locale === "en"){
        return "GB"
    }
    return store.locale.toUpperCase()
})

const imdbURL = computed(() => `https://www.imdb.com/title/` + movie.value.imdb_id)
const tmdbURL = computed(() => `https://www.themoviedb.org/movie/` + movie.value.id)
const comments = computed(() => score.value ? score.value.comments.filter((comment: string) => {return comment.length > 3}) : null)

async function loadMovie() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${route.params.id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${store.locale}`)
        const loadedMovie = await response.json()
        movie.value = loadedMovie
        releaseDate.value = movie.value.release_date.substring(0,4)
        backdrop.value = `url(https://image.tmdb.org/t/p/original/${loadedMovie.backdrop_path})`
    }
    catch {
        console.log("oops")
    }
    finally {
        movieLoading.value = false
    }
}
async function loadProviders(){
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${route.params.id}/watch/providers?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c`)
        const providers = await response.json()
        onNetflix.value = false
        onAmazon.value = false
        onDisney.value = false
        onSky.value = false
        onNetflix.value = providers.results[regionProvider.value].flatrate.some((provider: any) => provider.provider_name == "Netflix")
        onAmazon.value = providers.results[regionProvider.value].flatrate.some((provider: any) => provider.provider_name == "Amazon Prime Video")
        onDisney.value = providers.results[regionProvider.value].flatrate.some((provider: any) => provider.provider_name == "Disney Plus")
        onSky.value = providers.results[regionProvider.value].flatrate.some((provider: any) => provider.provider_name == "WOW")
    }
    catch {
        console.log("ooops")
    }
}
async function loadTriggerscore(){
    const response = await fetch(`https://triggerscore-backend2.onrender.com/movie/${route.params.id}`)
    const scores = await response.json()
    score.value = scores[0]
}
function pushToContact(comment: string){
    router.push({ path: '/contact', query: { id: route.params.id, comment: comment.substring(0,Math.min(20,comment.length)) } })
}
  
watch(locale, () => {
    loadMovie()
    loadProviders()
})

await loadMovie()  
loadProviders()
loadTriggerscore()
store.setTriggerscores()
store.filterMovies()

</script>

<style lang="css" scoped>
.detailpage {
    min-height: calc(100vh-5rem);
}
</style>