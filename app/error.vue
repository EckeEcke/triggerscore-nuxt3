<template>
	<Html :lang="locale" />
	<div class="error-page">
		<Header />
		<h2 class="error-message">ERROR</h2>
		<AngryAnimation class="animation" />
		<Footer />
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AngryAnimation from '~/components/animations/AngryAnimation.vue'

const { locale } = useI18n()

await navigateTo('/')
window.location.reload()
</script>

<style scoped>
.error-page {
  @apply bg-gray-900 min-h-screen flex flex-col pt-14
}

.error-message {
  @apply text-white text-center p-16;
}

.animation {
  @apply flex justify-center h-32 w-full;
}
</style>
