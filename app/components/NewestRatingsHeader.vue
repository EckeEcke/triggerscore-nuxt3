<template>
	<div
		class="py-16 md:py-20 mb-12 bg-cover bg-center px-4 rounded"
		:style="{
			backgroundImage:
				'linear-gradient(to bottom, rgba(27,7,7,0.7), rgba(47,7,7,0.8)),url(' +
				'images/backdrop-ballermann6.webp' +
				')'
		}"
	>
		<h2
			class="text-white text-2xl sm:text-4xl text-left font-semibold mb-2 uppercase"
		>
			{{ t('general.newest') }}
			<span
				class="text-2xl sm:text-4xl self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer"
			>
				TRIGGERSC<font-awesome-icon
					:icon="['fas', 'angry']"
					class="text-white"
				/>RES
			</span>
		</h2>
		<p class="text-base md:text-lg text-white font-semibold text-left">
			{{ t('general.recentRatings') }}
		</p>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
