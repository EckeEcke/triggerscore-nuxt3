<template>
  <div class="flex justify-between my-4 mb-4 align-end">
    <div class="streaming-services flex gap-4 w-full">
      <a
          v-for="service in visibleServices"
          :key="service.key"
          :href="service.href"
          target="_blank"
          class="self-center"
          :aria-label="`Watch on ${service.alt}`"
      >
        <img
            class="w-16"
            alt=""
            :src="service.logo"
            loading="lazy"
        >
      </a>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useStore } from '~/stores/store'
import type { Movie } from '~/types/movie'
import type { Provider, ProviderData, ProviderResponse } from '~/types/provider'
import netflixLogo from '~/assets/images/netflix-logo.svg'
import primeLogo from '~/assets/images/amazon-prime-logo3.svg'
import disneyLogo from '~/assets/images/disney+-logo2.svg'
import skyLogo from '~/assets/images/sky-logo.svg'
import imdbLogo from '~/assets/images/imdb-logo.svg'

const { locale } = useI18n()
const route = useRoute()
const store = useStore()
const movie: ComputedRef<Movie | undefined> = computed(() => store.selectedMovie)

const imdbURL = computed(
  () => movie.value?.imdb_id ? `https://www.imdb.com/title/${movie.value.imdb_id}` : undefined
)

const tmdbURL = computed(
  () => movie.value?.id ? `https://www.themoviedb.org/movie/${movie.value?.id}` : undefined
)

const onNetflix = ref(false)
const onPrime = ref(false)
const onDisney = ref(false)
const onSky = ref(false)

const streamingServicesAndWebsites = computed(() => [  {
  key: 'netflix',
  enabled: onNetflix.value,
  href: 'https://www.netflix.com',
  alt: 'Netflix',
  logo: netflixLogo
},
  {
    key: 'prime',
    enabled: onPrime.value,
    href: 'https://www.amazon.de/primevideo',
    alt: 'Prime Video',
    logo: primeLogo
  },
  {
    key: 'disney',
    enabled: onDisney.value,
    href: 'https://www.disneyplus.com/',
    alt: 'Disney Plus',
    logo: disneyLogo
  },
  {
    key: 'sky',
    enabled: onSky.value,
    href: 'https://skyticket.sky.de/home/login',
    alt: 'WOW',
    logo: skyLogo
  },
  {
    key: 'tmdb',
    enabled: !!tmdbURL.value,
    href: tmdbURL.value,
    alt: 'TMDb',
    logo: 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
  },
  {
    key: 'imdb',
    enabled: !!imdbURL.value,
    href: imdbURL.value,
    alt: 'IMDB',
    logo: imdbLogo
  }
])

const visibleServices = computed(() =>
    streamingServicesAndWebsites.value.filter(service => service.enabled)
)

const regionProvider = computed(() => {
  if (locale.value === 'en') {
    return 'GB'
  }
  return locale.value.toUpperCase()
})

const loadProviders = async () => {
  try {
    const { data } = await useFetch(
    `/api/providers/${route.params.id}`
    )
    const providers = data.value as unknown as ProviderResponse
    const regionProviders = providers.results[regionProvider.value]?.flatrate || []
    onNetflix.value = regionProviders.some(
      (provider: Provider) => provider.provider_name === 'Netflix'
    )
    onPrime.value = regionProviders.some(
      (provider: Provider) => provider.provider_name === 'Amazon Prime Video'
    )
    onDisney.value = regionProviders.some(
      (provider: Provider) => provider.provider_name === 'Disney Plus'
    )
    onSky.value = regionProviders.some(
      (provider: Provider) => provider.provider_name === 'WOW'
    )
  } catch (error) {
    console.log(
      'Oops, an error occurred while loading the providers:',
      error
    )
  }
}

const providerData: ComputedRef<ProviderData> = computed(() => store.providerData)

const checkProviders = () => {
  const movieId: number = parseInt(route.params.id as string)
  onNetflix.value = providerData.value.netflix.includes(movieId)
  onPrime.value = providerData.value.prime.includes(movieId)
  onDisney.value = providerData.value.disney.includes(movieId)
  onSky.value = providerData.value.sky.includes(movieId)

  if (!onNetflix.value && !onPrime.value && !onDisney.value && !onSky.value) {
    loadProviders()
  }
}

watch(locale, () => {
  loadProviders()
})

onMounted(() => {
  checkProviders()
})

</script>