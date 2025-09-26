<template>
  <div
      class="container text-white px-4 py-6 md:py-12 md:pb-8 text-left xl:w-10/12 mx-auto md:rounded-lg flex justify-start flex-wrap gap-12"
  >
    <div v-show="!submitted" class="mr-8 max-w-full">
      <h1 class="mb-4 text-xl md:text-2xl font-semibold uppercase">
        {{ route.query.comment ? t("contact.reportHeadline") : t("contact.sendFeedback") }}
      </h1>

      <form
          ref="formElement"
          name="contact-nuxt3"
          class="w-full p-8 bg-gradient-to-r from-gray-950 to-gray-800 rounded text-gray-900"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          :action="localePath('/form-success')"
          @submit="handleSubmit"
      >
        <div class="hidden">
          <label>Don't fill this out if you're human:</label>
          <input name="bot-field">
        </div>
        <input type="hidden" name="form-name" value="contact-nuxt3">

        <div class="flex flex-col gap-1 mb-4">
          <label class="font-semibold mb-2 text-white">{{
              t("contact.name")
            }}</label>
          <input
              v-model="form.name"
              type="text"
              name="name"
              class="border border-gray-300 p-2 rounded w-72 max-w-full"
              :placeholder="t('contact.placeholderName')"
              required
          >
        </div>

        <div class="flex flex-col gap-1 mb-4">
          <label class="font-semibold mb-2 text-white">
            {{ t("contact.email") }}
          </label>
          <input
              v-model="form.mail"
              type="email"
              name="mail"
              class="border border-gray-300 p-2 rounded w-72 max-w-full"
              :placeholder="t('contact.placeholderEmail')"
              required
          >
        </div>

        <div class="flex flex-col gap-1 mb-6">
          <label class="font-semibold mb-2 text-white">{{
              t("contact.message")
            }}</label>
          <textarea
              v-model="form.message"
              name="message"
              class="border border-gray-300 p-2 rounded w-72 max-w-full"
              :placeholder="t('contact.placeholderMessage')"
              required
          />
        </div>

        <p>
          <button
              class="w-full text-white bg-yellow-500 p-3 text-semibold rounded-lg shadow-lg transition hover:bg-yellow-600 font-semibold uppercase"
              type="submit"
              :disabled="isSubmitting"
          >
            {{ isSubmitting ? t("contact.sending") || "Sending..." : t("contact.send") }}
          </button>
        </p>
      </form>
    </div>

    <div
        v-show="submitted"
        class="w-full sm:w-1/2 lg:w-1/4 h-64 bg-green-500 rounded-lg flex flex-col align-center justify-center"
    >
      <SuccessAnimation />
      <p class="p-4 text-white font-semibold text-center self-center -mt-8">
        {{ t("contact.success") }}
      </p>
    </div>

    <div>
      <h1 class="mb-4 text-xl md:text-2xl font-semibold uppercase">
        {{ t("header.contact") }}
      </h1>
      <p class="font-semibold">Christian Eckardt</p>
      <p class="mb-8 font-semibold">22301 Hamburg</p>
      <p class="mb-8 font-semibold">
        <NuxtLink to="https://eckeecke.github.io">eckeecke.github.io</NuxtLink>
      </p>
      <p class="mb-8 flex">
        <NuxtLink to="https://github.com/EckeEcke" target="_blank">
          <img alt="Logo Github" class="h-10 mr-4 filter invert" src="../assets/images/github.svg">
        </NuxtLink>
        <NuxtLink to="https://www.linkedin.com/in/christian-eckardt-41527216a/" target="_blank">
          <img alt="Logo LinkedIn" class="h-10 mr-4" src="../assets/images/linkedin.svg">
        </NuxtLink>
        <NuxtLink to="https://www.xing.com/profile/Christian_Eckardt21/cv" target="_blank">
          <img alt="Logo Xing" class="h-10 mr-4" src="../assets/images/xing.svg">
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { ref, onMounted, nextTick } from 'vue'
import SuccessAnimation from '~/components/animations/SuccessAnimation.vue'

const localePath = useLocalePath()
const route = useRoute()
const { t } = useI18n()

const form = ref({
  name: '',
  mail: '',
  message: '',
})

const isSubmitting = ref(false)
const submitted = ref(false)
const formElement = ref<HTMLFormElement>()

if (route.query.comment) {
  form.value.message =
      t('contact.report') +
      route.query.id +
      " - '" +
      route.query.comment +
      "...'"
}

onMounted(() => {
  if (process.client && route.query.success) {
    submitted.value = true
  }
})

const handleSubmit = async (event: Event) => {
  isSubmitting.value = true

  await nextTick()

  if (formElement.value) {
    const nameInput = formElement.value.querySelector('input[name="name"]') as HTMLInputElement
    const mailInput = formElement.value.querySelector('input[name="mail"]') as HTMLInputElement
    const messageInput = formElement.value.querySelector('textarea[name="message"]') as HTMLTextAreaElement

    if (nameInput) nameInput.value = form.value.name
    if (mailInput) mailInput.value = form.value.mail
    if (messageInput) messageInput.value = form.value.message

    console.log('Form values synced:', {
      name: nameInput?.value,
      mail: mailInput?.value,
      message: messageInput?.value
    })
  }
}

useSeoMeta({
  title: 'Triggerscore - Contact / Feel free to reach out to me',
  description: 'contact page for Triggerscore',
  author: 'Christian Eckardt',
  ogTitle: 'Triggerscore - Contact',
  ogDescription: 'contact page for Triggerscore',
  ogUrl: () => `https://www.triggerscore.de/contact`,
  ogType: 'website',
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1.0',
})
</script>