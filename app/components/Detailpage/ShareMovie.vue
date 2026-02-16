<template>
  <h3
    class="pb-0 text-white text-left font-semibold text-lg mb-4"
  >
    {{ t("rating.share") }}
  </h3>
  <div class="flex gap-6">
    <NuxtLink
      :to="whatsAppLink"
      class=""
      data-action="share/whatsapp/share"
      target="_blank"
      aria-label="WhatsApp Sharing"
    >
      <img
        class="w-10"
        alt=""
        src="~/assets/images/WhatsApp.svg"
      >
    </NuxtLink>
    <NuxtLink
      :to="redditLink"
      target="_blank"
      aria-label="Reddit Sharing"
    >
      <img
        alt=""
        class="w-10"
        src="~/assets/images/reddit-logo.svg"
      >
    </NuxtLink>
    <NuxtLink
      :to="facebookLink"
      target="_blank"
      aria-label="Facebook Sharing"
    >
      <img
        alt=""
        class="w-10"
        src="~/assets/images/facebook-logo.svg"
      >
    </NuxtLink>
    <NuxtLink
      :to="eMailLink"
      aria-label="Share by Email"
    >
      <font-awesome-icon
        :icon="['fas', 'envelope']"
        class="text-white"
        style="width: auto; height: 2.5rem"
      />
    </NuxtLink>
    <button class="flex relative cursor-pointer" aria-label="Copy link to clipboard" @click="copyLink">
      <font-awesome-icon
        :icon="['fas', 'link']"
        class="text-white self-center text-3xl"
      />
      <span
        v-if="copied"
        class="absolute top-full left-1/2 -translate-x-1/2 w-36 text-white text-center"
      >
        Kopiert in Zwischenablage
      </span>
    </button>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps({
  movie: {
    type: Object,
    default: undefined
  },
})

const copied = ref(false)
const route = useRoute()
const currentURL = computed(
  () => `https://www.triggerscore.de/${locale.value}/movie/${route.params.id}`
)

const whatsAppLink = computed(() => 'whatsapp://send?text=' + 'Triggerscore - ' + props.movie?.title.replace('&', 'and') + ' ' + currentURL.value)
const redditLink = computed(() => 'https://www.reddit.com/submit?url=' + currentURL.value)
const facebookLink = computed(() => 'https://www.facebook.com/sharer/sharer.php?u=' + currentURL.value)
const eMailLink = computed(() => 'mailto:?subject= ' + props.movie?.title + ' on Triggerscore&body=Check out ' + props.movie?.title + ' on Triggerscore: ' + currentURL.value)

const copyLink = () => {
  navigator.clipboard.writeText(currentURL.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1000)
}
</script>
