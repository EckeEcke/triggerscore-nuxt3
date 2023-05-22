<template>
    <Head>
        <Title>Triggerscore - rating triggering movies</Title>
        <Meta 
            charset="UTF-8"
        />
        <Meta 
            name="keywords" 
            content="triggering movies, ratings"
        />
        <Meta 
            name="desription" 
            content="a website for rating old movies based on how much these trigger viewers today"
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
    <Searchbox showTitle />
    <LoadingAnimation v-if="isLoading" />
    <template v-if="!isLoading">
        <MovieHighlightsContainer 
            :movies="store.bondMovies" 
            shownScore="rating_total"
            :title="$t('highlights.headline1')" 
            :subTitle="$t('highlights.copy1')"
            moreSpacing
        />
            <section class="sm:mb-12 px-0 sm:px-4  container mx-auto xl:w-10/12">
                <div class="py-16 md:py-20 sm:mb-12 bg-cover bg-center px-4 rounded" :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(27,7,7,0.7), rgba(47,7,7,0.8)),url(' + ('images/backdrop-ballermann6.jpg') + ')'}">
                    <h2 class="text-white text-2xl sm:text-4xl text-left font-semibold mb-2 uppercase">{{ $t('general.newest') }} 
                        <span class="text-2xl sm:text-4xl self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
                            TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RES
                        </span>
                    </h2>
                    <p class="text-base md:text-lg text-white font-semibold text-left">
                        {{ $t('general.recentRatings') }}
                    </p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 sm:gap-6 justify-content-start">
                    <RecentRatingsItem 
                        v-for="(rating,index) in store.recentRatings" 
                        :key="index" 
                        :movie="rating" 
                        :scores="store.recentScores[index]" 
                    />
                </div>      
            </section>
            <section>
                <div class="container xl:w-10/12 mx-auto sm:px-4 mb-3 sm:mb-6">
                    <div 
                        class="py-16 md:py-20 text-left bg-cover bg-center px-4 rounded" 
                        :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(27,27,27,0.5), rgba(67,27,27,0.6)),url(' + ('/images/backdrop-backtothefuture.jpg') + ')'}"
                    >
                        <div class="">
                            <h2 class="text-2xl sm:text-4xl font-semibold mb-2 text-white uppercase">
                                <span class="self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
                                    TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
                                </span> 
                                {{ $t('general.top10') }}
                            </h2>
                            <p class="text-base md:text-lg text-white font-semibold">
                                {{ $t('general.top10Copy') }}
                            </p>
                        </div> 
                    </div>
                </div>
                <MovieHighlightsContainer 
                    :movies="store.top10Sexism"  
                    shownScore="rating_sexism"
                    :title="$t('highlights.headline2')"
                    :subTitle="$t('highlights.copy2')"
                />
                <MovieHighlightsContainer 
                    :movies="store.top10Racism"  
                    shownScore="rating_racism"
                    :title="$t('highlights.headline3')"
                    :subTitle="$t('highlights.copy3')"
                    showBorder
                />
                <MovieHighlightsContainer 
                    :movies="store.top10Others"  
                    shownScore="rating_others"
                    :title="$t('highlights.headline4')"
                    :subTitle="$t('highlights.copy4')"
                    showBorder
                />
                <MovieHighlightsContainer 
                    :movies="store.top10Cringe"  
                    shownScore="rating_cringe"
                    :title="$t('highlights.headline5')"
                    :subTitle="$t('highlights.copy5')"
                    showBorder
                />
            </section>
            <section class="sm:px-4 container xl:w-10/12 mx-auto">
                <div 
                    v-if="!isLoading" class="py-16 md:py-20 text-left bg-center bg-cover px-4 rounded sm:my-6"  
                    :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(67,27,27,0.5), rgba(87,27,27,0.6)),url(' + ('/images/backdrop-jurassicpark.jpg') + ')'}"
                >
                    <div class="">
                        <h2 class="text-2xl sm:text-4xl font-semibold mb-2 text-white uppercase">
                            <span class="self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
                                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
                            </span> 
                            {{ $t('general.stats') }}
                        </h2>
                        <p class="text-base md:text-lg text-white font-semibold">{{ $t('general.statsCopy') }}</p>
                    </div> 
                </div>
                <div class="sm:pt-4">
                    <Stats />
                </div> 
            </section>
            <section class="container xl:w-10/12 mx-auto px-4 my-12 sm:my-24">
                <div class="bg-opacity-90 py-16">
                    <h2 class="text-white text-xl font-semibold my-4">{{ $t('general.discoverMoreMovies') }}</h2>
                    <div class="py-8">
                        <NuxtLink to="/all" class="bg-yellow-500 transition hover:bg-yellow-600 p-3 rounded-lg text-white font-semibold uppercase my-4">{{ $t('header.allMovies') }}</NuxtLink>
                    </div>
                </div>  
            </section>
    </template>
</template>

<script setup lang="ts">
import { useStore } from '~/stores/store'

const store = useStore()
store.setTriggerscores()
store.setBondMovies()
store.setRecentRatings()
store.setTop10Racism()
store.setTop10Sexism()
store.setTop10Others()
store.setTop10Cringe()

const isLoading = computed(() => store.highlightsLoading || store.moviesLoading || store.triggerscores.length == 0)

</script>