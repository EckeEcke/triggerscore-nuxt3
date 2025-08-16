<template>
  <h3
    class="pb-0 text-white text-left font-semibold text-lg mb-4"
  >
    {{ t("rating.share") }}
  </h3>
  <div class="flex gap-6">
    <a
      :href="
        'whatsapp://send?text=' +
        'Triggerscore - ' +
        movie.title.replace('&', 'and') +
        ' ' +
        currentURL
      "
      class=""
      data-action="share/whatsapp/share"
      target="_blank"
    >
      <img
        class="w-10"
        alt="Logo WhatsApp"
        src="~/assets/images/WhatsApp.svg"
      >
    </a>
    <a
      :href="'https://www.reddit.com/submit?url=' + currentURL"
      target="_blank"
    >
      <img
        alt="Logo Reddit"
        class="w-10"
        src="~/assets/images/reddit-logo.svg"
      >
    </a>
    <a
      :href="'https://www.facebook.com/sharer/sharer.php?u=' + currentURL"
      target="_blank"
    >
      <img
        alt="Logo Facebook"
        class="w-10"
        src="~/assets/images/facebook-logo.svg"
      >
    </a>
    <a
      :href="
        'mailto:?subject= ' +
        movie.title +
        ' on Triggerscore&body=Check out ' +
        movie.title +
        ' on Triggerscore: ' +
        currentURL
      "
      title="Share by Email"
    >
      <font-awesome-icon
        :icon="['fas', 'envelope']"
        class="text-white"
        style="width: auto; height: 2.5rem"
      />
    </a>
    <div class="flex relative cursor-pointer">
      <font-awesome-icon
        :icon="['fas', 'link']"
        class="text-white self-center text-3xl"
        @click="copyLink"
      />
      <div
        v-if="copied"
        class="absolute top-full left-1/2 -translate-x-1/2 w-36 text-white text-center"
      >
        Kopiert in Zwischenablage
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

defineProps({
  movie: {
    type: Object,
    default: {}
  },
})

const copied = ref(false)
const route = useRoute()
const currentURL = computed(
  () => `https://www.triggerscore.de/${locale.value}/movie/${route.params.id}`
)

const copyLink = () => {
  navigator.clipboard.writeText(currentURL.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1000)
}
</script>
