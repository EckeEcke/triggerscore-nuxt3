<template>
	<div class="container xl:w-10/12 mx-auto sm:px-4 mb-3 sm:mb-6">
		<div
			class="py-16 md:py-20 text-left bg-cover bg-center px-4 rounded"
			:style="{
				backgroundImage:
					'linear-gradient(to bottom, rgba(27,27,27,0.5), rgba(67,27,27,0.6)),url(' +
					'/images/backdrop-backtothefuture.webp' +
					')'
			}"
		>
			<div>
				<h2
					class="text-2xl sm:text-4xl font-semibold mb-2 text-white uppercase"
				>
					<span
						class="self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer"
					>
						TRIGGERSC<font-awesome-icon
							:icon="['fas', 'angry']"
							class="text-white"
						/>RE
					</span>
					{{ t('general.top10') }}
				</h2>
				<p class="text-base md:text-lg text-white font-semibold">
					{{ t('general.top10Copy') }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
