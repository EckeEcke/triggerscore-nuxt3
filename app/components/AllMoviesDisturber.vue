<template>
	<div class="bg-opacity-90 py-16">
		<h2 class="text-white text-xl font-semibold my-4">
			{{ t('general.discoverMoreMovies') }}
		</h2>
		<div class="py-8">
			<NuxtLink
				:to="localePath('/all')"
				class="bg-yellow-500 transition hover:bg-yellow-600 p-3 rounded-lg text-white font-semibold uppercase my-4"
			>
				{{ t('header.allMovies') }}
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const localePath = useLocalePath()
const { t } = useI18n()
</script>
