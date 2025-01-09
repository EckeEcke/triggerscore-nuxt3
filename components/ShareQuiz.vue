<template>
  <div class="mt-8">
    <h3
    class="pb-0 text-white text-center font-semibold text-lg my-4"
    target="_blank"
  >
    {{ t("quiz.share") }}
  </h3>
  <div class="flex justify-center gap-6">
    <a
      :href="
        'whatsapp://send?text=' +
        'Triggerscore Movie Quiz ' + currentURL
      "
      class=""
      data-action="share/whatsapp/share"
      target="_blank"
    >
      <img
        class="w-10"
        alt="Logo WhatsApp"
        src="~/assets/images/WhatsApp.svg"
      />
    </a>
    <a
      :href="'https://www.reddit.com/submit?url=' + currentURL"
      target="_blank"
    >
      <img
        alt="Logo Reddit"
        class="w-10"
        src="~/assets/images/reddit-logo.svg"
      />
    </a>
    <a
      :href="'https://www.facebook.com/sharer/sharer.php?u=' + currentURL"
      target="_blank"
    >
      <img
        alt="Logo Facebook"
        class="w-10"
        src="~/assets/images/facebook-logo.svg"
      />
    </a>
    <a
      :href="
        'mailto:?subject= Triggerscore Movie Quiz&body=Check out: ' +
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
        @click="copyLink"
        :icon="['fas', 'link']"
        class="text-white self-center text-3xl"
      />
      <div
        v-if="copied"
        class="absolute top-full left-1/2 -translate-x-1/2 w-36 text-white text-center"
      >
      {{  t("general.copiedToClipBoard") }}
        Kopiert in Zwischenablage
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const copied = ref(false)
const currentURL = window.location.href

function copyLink() {
  navigator.clipboard.writeText(currentURL)
  copied.value = true
  setTimeout(() => (copied.value = false), 1000)
}
</script>
