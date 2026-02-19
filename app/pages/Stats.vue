<template>
	<LoadingAnimation v-if="isLoading" />
	<section v-if="!isLoading" class="stats-page">
		<div
			class="header"
			:style="{
				backgroundImage:
					'linear-gradient(to bottom, rgba(67,27,27,0.5), rgba(87,27,27,0.6)),url(' +
					'/images/backdrop-jurassicpark.webp' +
					')'
			}"
		>
			<div>
				<h2 aria-label="Triggerscore stats" class="headline">
					<span class="headline-text">
						TRIGGERSC<font-awesome-icon
							aria-hidden="true"
							:icon="['fas', 'angry']"
							class="text-white"
						/><span class="sr-only">O</span>RE
					</span>
					{{ t('general.stats') }}
				</h2>
				<p class="sub-headline">
					{{ t('general.statsCopy') }}
				</p>
			</div>
		</div>
		<div class="sm:pt-4">
			<Stats />
		</div>
	</section>
</template>

<script setup lang="ts">
import { useStore } from '~/stores/store'
import { useI18n } from 'vue-i18n'
import LoadingAnimation from '~/components/animations/LoadingAnimation.vue'

const { t } = useI18n()
const store = useStore()

const isLoading = computed(
	() =>
		store.highlightsLoading ||
		store.moviesLoading ||
		store.triggerscores.length == 0
)
</script>

<style scoped>
.stats-page {
	@apply sm:px-4 container xl:w-10/12 mx-auto;
}

.header {
	@apply py-16 md:py-20 text-left bg-center bg-cover px-4 rounded sm:my-6;
}

.headline {
	@apply text-2xl sm:text-4xl font-semibold mb-2 text-white uppercase;
}

.headline-text {
	@apply self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer;
}

.sub-headline {
	@apply text-base md:text-lg text-white font-semibold;
}
</style>
