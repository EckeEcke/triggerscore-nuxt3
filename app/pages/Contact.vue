<template>
  <div class="container">
    <div v-show="!submitted" class="form-wrapper">
      <h1 class="headline">
        {{
          route.query.comment
            ? t("contact.reportHeadline")
            : t("contact.sendFeedback")
        }}
      </h1>

      <form
        ref="formElement"
        name="contact-nuxt3"
        class="contact-form"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <div class="hidden">
          <label>Don't fill this out if you're human:</label>
          <input name="bot-field" />
        </div>
        <input type="hidden" name="form-name" value="contact-nuxt3" />

        <div class="form-element">
          <label class="form-label">{{ t("contact.name") }}</label>
          <input
            v-model="form.name"
            type="text"
            name="name"
            class="form-input"
            :placeholder="t('contact.placeholderName')"
            required
          />
        </div>

        <div class="form-element">
          <label class="form-label">
            {{ t("contact.email") }}
          </label>
          <input
            v-model="form.mail"
            type="email"
            name="mail"
            class="form-input"
            :placeholder="t('contact.placeholderEmail')"
            required
          />
        </div>

        <div class="form-element">
          <label class="form-label">{{ t("contact.message") }}</label>
          <textarea
            v-model="form.message"
            name="message"
            class="form-input"
            :placeholder="t('contact.placeholderMessage')"
            required
          />
        </div>

        <p>
          <button class="btn" type="submit" :disabled="isSubmitting">
            {{
              isSubmitting
                ? t("contact.sending") || "Sending..."
                : t("contact.send")
            }}
          </button>
        </p>
      </form>
    </div>

    <div v-show="submitted" class="success-info">
      <SuccessAnimation />
      <p class="success-message">
        {{ t("contact.success") }}
      </p>
    </div>

    <div>
      <h1 class="headline-2">
        {{ t("header.contact") }}
      </h1>
      <p class="font-semibold">Christian Eckardt</p>
      <p class="font-semibold">22339 Hamburg</p>
      <p class="my-8 font-semibold">
        <NuxtLink to="https://eckeecke.github.io">eckeecke.github.io</NuxtLink>
      </p>
      <p class="mb-8 flex">
        <NuxtLink to="https://github.com/EckeEcke" target="_blank">
          <img
            alt="Logo Github"
            class="h-10 mr-4 filter invert"
            src="../assets/images/github.svg"
          />
        </NuxtLink>
        <NuxtLink
          to="https://www.linkedin.com/in/christian-eckardt-41527216a/"
          target="_blank"
        >
          <img
            alt="Logo LinkedIn"
            class="h-10 mr-4"
            src="../assets/images/linkedin.svg"
          />
        </NuxtLink>
        <NuxtLink
          to="https://www.xing.com/profile/Christian_Eckardt097954"
          target="_blank"
        >
          <img
            alt="Logo Xing"
            class="h-10 mr-4"
            src="../assets/images/xing.svg"
          />
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
import SuccessAnimation from "~/components/animations/SuccessAnimation.vue";

const route = useRoute();
const { t } = useI18n();

const form = ref({
  name: "",
  mail: "",
  message: "",
});

const isSubmitting = ref(false);
const submitted = ref(false);
const formElement = ref<HTMLFormElement>();

if (route.query.comment) {
  form.value.message =
    t("contact.report") +
    route.query.id +
    " - '" +
    route.query.comment +
    "...'";
}

onMounted(() => {
  if (import.meta.client && route.query.success) {
    submitted.value = true;
  }
});

/*
currently outcommented since using default submit by html form

const handleSubmit = async () => {
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
*/

useSeoMeta({
  title: "Triggerscore - Contact / Feel free to reach out to me",
  description: "contact page for Triggerscore",
  author: "Christian Eckardt",
  ogTitle: "Triggerscore - Contact",
  ogDescription: "contact page for Triggerscore",
  ogUrl: () => `https://www.triggerscore.netlify.app/contact`,
  ogType: "website",
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1.0",
});
</script>

<style scoped>
.headline {
  @apply mb-4 text-xl md:text-2xl font-semibold uppercase;
}

.headline {
  @apply text-white px-4 py-6 md:py-12 md:pb-8 text-left xl:w-10/12 mx-auto md:rounded-lg flex justify-start flex-wrap gap-12;
}

.headline-2 {
  @apply mb-4 text-xl md:text-2xl font-semibold uppercase;
}

.container {
  @apply text-white px-4 py-6 md:py-12 md:pb-8 text-left xl:w-10/12 mx-auto md:rounded-lg flex justify-start flex-wrap gap-12;
}

.form-wrapper {
  @apply mr-8 max-w-full;
}

.form-element {
  @apply flex flex-col gap-1 mb-4;
}

.form-input {
  @apply border border-gray-300 p-2 rounded w-72 max-w-full;
}

.form-label {
  @apply font-semibold mb-2 text-white;
}

.contact-form {
  @apply w-full p-8 bg-gradient-to-r from-gray-950 to-gray-800 rounded text-gray-900;
}

.btn {
  @apply w-full text-white bg-yellow-500 p-3 font-semibold rounded-lg shadow-lg transition hover:bg-yellow-600 font-semibold uppercase;
}

.success-info {
  @apply w-full sm:w-1/2 lg:w-1/4 h-64 bg-green-500 rounded-lg flex flex-col items-center justify-center;
}

.success-message {
  @apply p-4 text-white font-semibold text-center self-center -mt-8;
}
</style>
