<template>
	<div class="about-page">
		<section class="content-wrapper">
			<div
				class="header-background"
				:style="{
					backgroundImage:
						'linear-gradient(to bottom, rgba(47,27,27,0.6), rgba(67,27,27,0.7)),url(' +
						'/images/backdrop-scarymovie.webp' +
						')'
				}"
			>
				<h2 class="headline">About</h2>
			</div>

			<p class="sub-headline">
				{{ t('about.headline') }}
			</p>
			<hr class="my-6">
			<p class="about-paragraph mb-4">
				{{ t('about.paragraph1') }}
			</p>
			<p class="about-paragraph">
				{{ t('about.paragraph2') }}
			</p>
		</section>
		<div class="github-logo-wrapper">
			<img
				class="h-8 cursor-pointer"
				src="../assets/images/github-logo.svg"
				alt="github link"
				@click="toGithub()"
			>
			<NuxtLink
				class="github-logo"
				to="https://github.com/EckeEcke/triggerscore-nuxt3"
				target="_blank"
			>
				Triggerscore Github
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const toGithub = () =>
	navigateTo('https://github.com/EckeEcke/triggerscore-nuxt3', {
		external: true
	})

useSeoMeta({
	title: 'Triggerscore - About / What is Triggerscore',
	description: 'information on what Triggerscore is about',
	author: 'Christian Eckardt',
	ogTitle: 'Triggerscore - About / What is Triggerscore',
	ogDescription:
		'Triggerscore - rating old movies based on how much users today get triggered',
	ogUrl: () => `https://www.triggerscore.de/about`,
	ogType: 'website',
	charset: 'utf-8',
	viewport: 'width=device-width, initial-scale=1.0'
})
</script>

<style scoped>
.about-page {
	@apply container px-4 py-6 md:py-12 text-left text-sm md:text-base xl:w-10/12 mx-auto;
}

.content-wrapper {
	@apply text-white lg:w-3/4;
}

.header-background {
	@apply h-32 bg-cover bg-center py-12 px-8 mb-8;
}

.headline {
	@apply font-semibold text-4xl mb-2 uppercase;
}

.sub-headline {
  @apply font-semibold text-2xl;
}

.about-paragraph {
  @apply mt-2 leading-7;
}

.github-logo-wrapper {
	@apply flex items-center gap-4 mt-8;
}

.github-logo {
	@apply text-white underline cursor-pointer hover:font-bold;
}
</style>
