<template>
  <div class="mt-8">
    <h3 class="pb-0 text-white text-center font-semibold text-lg my-4">
    {{ t("quiz.share") }}
  </h3>
  <div class="flex justify-center gap-6">
    <a v-for="(option, index) in socialMediaOptions" :key="index" :href="option.url" target="_blank">
      <img class="w-10" :alt="option.alt" :src="option.logo">
    </a>
    <a :href="'mailto:?subject= Triggerscore Movie Quiz&body=Check out: ' + currentURL" title="Share by Email">
      <font-awesome-icon :icon="['fas', 'envelope']" class="text-white" style="width: auto; height: 2.5rem" />
    </a>
    <div class="flex relative cursor-pointer">
      <font-awesome-icon :icon="['fas', 'link']" class="text-white self-center text-3xl" @click="copyLink" />
      <div v-if="copied" class="absolute top-full left-1/2 -translate-x-1/2 w-36 text-white text-center">
        {{  t("general.copiedToClipBoard") }}
        Kopiert in Zwischenablage
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import WhatsAppLogo from '~/assets/images/WhatsApp.svg'
import RedditLogo from '~/assets/images/reddit-logo.svg'
import FacebookLogo from '~/assets/images/facebook-logo.svg'

const { t } = useI18n()

const copied = ref(false)
const currentURL = window.location.href

const socialMediaOptions = computed(() => [
  {
    url: 'whatsapp://send?text=' + 'Triggerscore Movie Quiz ' + currentURL,
    alt: 'WhatsApp Sharing',
    logo: WhatsAppLogo,
  },
  {
    url: 'https://www.reddit.com/submit?url=' + currentURL,
    alt: 'Reddit Sharing',
    logo: RedditLogo,
  },
  {
    url: 'https://www.facebook.com/sharer/sharer.php?u=' + currentURL,
    alt: 'Facebook Sharing',
    logo: FacebookLogo,
  },
])

const copyLink = () => {
  navigator.clipboard.writeText(currentURL)
  copied.value = true
  setTimeout(() => (copied.value = false), 1000)
}
</script>
