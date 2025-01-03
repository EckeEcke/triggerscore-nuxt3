<template>
  <div class="flex justify-between my-4 mb-4 align-end">
    <div class="streaming-services flex gap-4 w-full">
      <a
        v-if="onNetflix"
        href="https://www.netflix.com"
        target="_blank"
        class="self-center"
      >
        <img
          class="w-16"
          alt="Logo Netflix"
          src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
        />
      </a>
      <a
        v-if="onPrime"
        href="https://www.amazon.de/primevideo"
        target="_blank"
        class="self-center -mx-2"
      >
        <img
          class="w-16"
          alt="Logo Prime Video"
          src="~/assets/images/amazon-prime-logo3.svg"
        />
      </a>
      <a
        v-if="onDisney"
        href="https://www.disneyplus.com/"
        target="_blank"
        class="self-center"
      >
        <img
          class="w-16"
          alt="Logo Disney Plus"
          src="~/assets/images/disney+-logo2.svg"
        />
      </a>
      <a
        v-if="onSky"
        href="https://skyticket.sky.de/home/login"
        target="_blank"
        class="self-center"
      >
        <img
          class="w-16"
          alt="Logo WOW"
          src="~/assets/images/sky-logo.svg"
        />
      </a>
      <a
        class="self-center"
        v-if="tmdbURL"
        :href="tmdbURL"
        target="_blank"
      >
        <img
          class="w-16"
          alt="Logo TMDB"
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
        />
      </a>
      <a
        class="self-center"
        v-if="imdbURL"
        :href="imdbURL"
        target="_blank"
      >
        <img
          class="w-16"
          alt="Logo IMDB"
          src="~/assets/images/imdb-logo.svg"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "../../stores/store"

const { t, locale } = useI18n()
const route = useRoute()
const store = useStore()
const movie: any = computed(() => store.selectedMovie)

const imdbURL = computed(
  () => movie.value.imdb_id ? `https://www.imdb.com/title/${movie.value.imdb_id}` : undefined
)

const tmdbURL = computed(
  () => movie.value.id ? `https://www.themoviedb.org/movie/${movie.value.id}` : undefined
)

const onNetflix = ref(false)
const onPrime = ref(false)
const onDisney = ref(false)
const onSky = ref(false)

const regionProvider = computed(() => {
  if (locale.value === "en") {
    return "GB"
  }
  return locale.value.toUpperCase()
})

const loadProviders = async () => {
  try {
    const { data } = await useFetch(
    `/api/providers/${route.params.id}`
    )
    const providers = data.value as any
    const regionProviders =
      providers.results[regionProvider.value]?.flatrate || []
    onNetflix.value = regionProviders.some(
      (provider: any) => provider.provider_name === "Netflix"
    )
    onPrime.value = regionProviders.some(
      (provider: any) => provider.provider_name === "Amazon Prime Video"
    )
    onDisney.value = regionProviders.some(
      (provider: any) => provider.provider_name === "Disney Plus"
    )
    onSky.value = regionProviders.some(
      (provider: any) => provider.provider_name === "WOW"
    )
  } catch (error) {
    console.log(
      "Oops, an error occurred while loading the providers:",
      error
    )
  }
}

const providerData = computed(() => store.providerData)

const checkProviders = () => {
  const movieId = parseInt(route.params.id)
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