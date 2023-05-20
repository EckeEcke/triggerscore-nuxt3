<template>
    <section v-if="store.triggerscores.length > 0" class="bg-transparent text-white py-6 md:pt-4 md:pb-12 md:px-0 text-left text-sm mx-auto md:rounded flex flex-col gap-x-12">
      <div class="w-full px-4 sm:px-0 mb-8">
        <div class=" font-semibold w-full flex flex-col lg:flex-row  lg:gap-16">
          <div class="w-full lg:w-1/3">
            <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
              <span>{{ t('stats.totalRatings') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ store.stats.totalRatings }}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
              <span>{{ t('stats.moviesOnTS') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ store.stats.amountMovies }}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
              <span>{{ t('stats.totalComments') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ store.stats.amountComments }}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
              <span>{{ t('stats.totalLikes') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ store.stats.amountLikes }}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
              <span>{{ t('stats.totalDislikes') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ store.stats.amountDislikes }}</span>
            </div>
          </div>
          <div class="w-full lg:w-1/3">
            <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
              <span>{{ t('stats.averageComments') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ (store.stats.amountComments / store.stats.amountMovies).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
              <span>{{ t('stats.averageLikes') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ (store.stats.amountLikes / store.stats.amountMovies).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
              <span>{{ t('stats.averageDislikes') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ (store.stats.amountDislikes / store.stats.amountMovies).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
              <span>{{ t('stats.averageRatings') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ (store.stats.totalRatings / store.stats.amountMovies).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
              <span>{{ t('stats.launch') }}</span><span class="text-lg font-semibold h-12 flex items-center">2021</span>
            </div>
          </div>
        <div class="w-full lg:w-1/3">
          <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
          <span>{{ t('stats.average') }} Triggerscore</span>
          <div class="h-12 w-12 text-white rounded-lg font-semibold text-lg" :class="{'bg-red-700': store.stats.averageScoreTotal >= 7, 'bg-yellow-500':  store.stats.averageScoreTotal < 7 &&  store.stats.averageScoreTotal >=4, 'bg-green-600':  store.stats.averageScoreTotal < 4}">
              <div class="relative w-full h-full">
                  <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ store.stats.averageScoreTotal }}</span>
              </div>
          </div>
        </div>
        <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
          <span>{{ t('stats.average') }} {{ t('categories.sexism') }}</span>
          <div class="h-12 w-12 text-white rounded-lg font-semibold text-lg" :class="{'bg-red-700': store.stats.averageScoreSexism >= 7, 'bg-yellow-500':  store.stats.averageScoreSexism < 7 &&  store.stats.averageScoreSexism >=4, 'bg-green-600':  store.stats.averageScoreSexism < 4}">
              <div class="relative w-full h-full">
                  <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ store.stats.averageScoreSexism }}</span>
              </div>
          </div>
        </div>
        <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
          <span>{{ t('stats.average') }} {{ t('categories.racism') }}</span>
          <div class="h-12 w-12 text-white rounded-lg font-semibold text-lg" :class="{'bg-red-700': store.stats.averageScoreRacism >= 7, 'bg-yellow-500':  store.stats.averageScoreRacism < 7 &&  store.stats.averageScoreRacism >=4, 'bg-green-600':  store.stats.averageScoreRacism < 4}">
              <div class="relative w-full h-full">
                  <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ store.stats.averageScoreRacism }}</span>
              </div>
          </div>
        </div>
        <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
          <span>{{ t('stats.average') }} {{ t('categories.others') }}</span>
          <div class="h-12 w-12 text-white rounded-lg font-semibold text-lg" :class="{'bg-red-700': store.stats.averageScoreOthers >= 7, 'bg-yellow-500':  store.stats.averageScoreOthers < 7 &&  store.stats.averageScoreOthers >=4, 'bg-green-600':  store.stats.averageScoreOthers < 4}">
              <div class="relative w-full h-full">
                  <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ store.stats.averageScoreOthers }}</span>
              </div>
          </div>
        </div>
        <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
          <span>{{ t('stats.average') }} {{ t('categories.cringe') }}</span>
          <div class="h-12 w-12 text-white rounded-lg font-semibold text-lg" :class="{'bg-red-700': store.stats.averageScoreCringe >= 7, 'bg-yellow-500':  store.stats.averageScoreCringe < 7 &&  store.stats.averageScoreCringe >=4, 'bg-green-600':  store.stats.averageScoreCringe < 4}">
              <div class="relative w-full h-full">
                  <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ store.stats.averageScoreCringe }}</span>
              </div>
          </div>
        </div>
        </div>
        
        
      </div>
      </div>
      <div class="w-full sm:max-w-xl lg:max-w-none sm:flex-wrap px-4 sm:px-0 pb-2 flex sm:justify-center overflow-auto hide-scrollbar sm:mx-auto">
        <div>
          <h2 class="font-semibold mt-4 h-14 flex items-center pr-2">{{ t('stats.lowestScore') }}</h2>
          <MovieHighlightItem :scores="lowestScoreMovie" :movie="movie[0]" shownScore="rating_total" :loadItem=true />
        </div>
        <div>
          <h2 class="font-semibold mt-4 h-14 flex items-center pr-2">{{ t('stats.highestScore') }}</h2>
          <MovieHighlightItem :scores="highestScoreMovie" :movie="movieHighest[0]" shownScore="rating_total"  :loadItem=true />
        </div>
        <div>
          <h2 class="font-semibold mt-4 h-14 flex items-center pr-2 w-40" v-html="t('stats.mostRatings',[mostRatedMovie.ratings])"></h2>
          <MovieHighlightItem :scores="mostRatedMovie" :movie="mostRated[0]" shownScore="rating_total" :loadItem=true />
        </div>
        <div>
          <h2 class="font-semibold mt-4 h-14 flex items-center pr-2 w-40" v-html="t('stats.mostComments',[mostCommentedMovie.comments.filter(comment => {return comment.length > 3}).length])"></h2>
          <MovieHighlightItem :scores="mostCommentedMovie" :movie="mostCommented[0]" shownScore="rating_total" :loadItem=true />
        </div>
        <div>
          <h2 class="font-semibold mt-4 h-14 flex items-center pr-2 w-40" v-html="t('stats.mostLiked',[mostLikedMovie.likes])"></h2>
          <MovieHighlightItem :scores="mostLikedMovie" :movie="mostLiked[0]" shownScore="rating_total" :loadItem=true />
        </div>
        <div>
          <h2 class="font-semibold mt-4 h-14 flex items-center pr-2 w-40" v-html="t('stats.mostDisliked',[mostDislikedMovie.dislikes])"></h2>
          <MovieHighlightItem :scores="mostDislikedMovie" :movie="mostDisliked[0]" shownScore="rating_total" :loadItem=true />
        </div>
      </div>
  </section>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store"
import { useI18n } from 'vue-i18n'

const store = useStore()
store.setStats()

const { t } = useI18n()

const lowestScoreMovie: ComputedRef<any> = computed(() => store.triggerscores.length > 0 ? store.triggerscores.reduce(function(a: any,b: any){
    return a.rating_total < b.rating_total ? a : b
}) : undefined)

const highestScoreMovie: ComputedRef<any> = computed(() => store.triggerscores.length > 0 ? store.triggerscores.reduce(function(a: any,b: any){
    return a.rating_total > b.rating_total ? a : b
}) : undefined)
const mostRatedMovie = computed(() => store.triggerscores.length > 0 ? store.triggerscores.reduce(function(a: any,b: any){
    return a.ratings > b.ratings ? a : b
}) : undefined)
const mostLikedMovie = computed(() => store.triggerscores.length > 0 ? store.triggerscores.reduce(function(a: any,b: any){
    return a.likes > b.likes ? a : b
}) : undefined)
const mostDislikedMovie = computed(() => store.triggerscores.length > 0 ? store.triggerscores.reduce(function(a: any,b: any){
    return a.dislikes > b.dislikes ? a : b
}) : undefined)
const mostCommentedMovie = computed(() => store.triggerscores.length > 0 ? store.triggerscores.reduce(function(a: any,b: any){
    let filteredArrayA = a.comments.filter((comment: string) => {return comment.length > 3})
    let filteredArrayB = b.comments.filter((comment: string) => {return comment.length > 3})
    return filteredArrayA.length > filteredArrayB.length ? a : b
}) : undefined)
const movie = computed(() => {
if(lowestScoreMovie.value){
    return store.movies.filter((movie: any) => movie.id == lowestScoreMovie.value!.movie_id)
} else return {}
})
const movieHighest = computed(() => {
if(highestScoreMovie.value){
    return store.movies.filter(movie => movie.id == highestScoreMovie.value.movie_id)
} else return {}
})
const mostRated = computed(() => {
if(mostRatedMovie.value){
    return store.movies.filter(movie => movie.id == mostRatedMovie.value.movie_id)
} else return {}
})
const mostCommented = computed(() => {
if(mostCommentedMovie.value){
    return store.movies.filter(movie => movie.id == mostCommentedMovie.value.movie_id)
} else return {}
})
const mostLiked = computed(() => {
if(mostLikedMovie.value){
    return store.movies.filter(movie => movie.id == mostLikedMovie.value.movie_id)
} else return {}
})
const mostDisliked = computed(() => {
if(mostDislikedMovie.value){
    return store.movies.filter(movie => movie.id == mostDislikedMovie.value.movie_id)
} else return {}
})
</script>