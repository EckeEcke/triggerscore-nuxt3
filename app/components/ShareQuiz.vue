<template>
  <div class="mt-8">
    <h3 class="headline">
    {{ t("quiz.share") }}
  </h3>
  <div class="share-options-wrapper">
    <NuxtLink v-for="(option, index) in socialMediaOptions" :key="index" :to="option.url" target="_blank">
      <img class="w-10" :alt="option.alt" :src="option.logo">
    </NuxtLink>
    <NuxtLink :to="'mailto:?subject= Triggerscore Movie Quiz&body=Check out: ' + currentURL" title="Share by Email">
      <font-awesome-icon :icon="['fas', 'envelope']" class="text-white" style="width: auto; height: 2.5rem" />
    </NuxtLink>
    <div class="clipboard-option-wrapper">
      <font-awesome-icon :icon="['fas', 'link']" class="link-icon" @click="copyLink" />
      <div v-if="copied" class="clipboard-info">
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

<style scoped>
.link-icon {
  @apply text-white self-center text-3xl;
}

.headline {
  @apply pb-0 text-white text-center font-semibold text-lg my-4;
}

.share-options-wrapper {
  @apply flex justify-center gap-6;
}

.clipboard-info {
  @apply absolute top-full left-1/2 -translate-x-1/2 w-36 text-white text-center;
}

.clipboard-option-wrapper {
  @apply flex relative cursor-pointer;
}
</style>
