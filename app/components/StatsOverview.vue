<template>
	<div class="stats-overview-wrapper">
		<div class="w-full lg:w-1/3">
			<div v-for="stat in statsColumn1" :key="stat.name" class="stat">
				<span>{{ stat.name }}</span>
				<span class="stat-value">{{ stat.stat }}</span>
			</div>
		</div>
		<div class="w-full lg:w-1/3">
			<div v-for="stat in statsColumn2" :key="stat.name" class="stat">
				<span>{{ stat.name }}</span>
				<span class="stat-value">{{ stat.stat }}</span>
			</div>
		</div>

		<div class="w-full lg:w-1/3">
			<div v-for="stat in statsColumn3" :key="stat.name" class="stat">
				<span>{{ stat.name }}</span>
				<div
					class="stat-score-background"
					:class="getScoreBackground(stat.stat)"
				>
					<div class="relative w-full h-full">
						<span class="stat-score">
							{{ stat.stat }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useStore } from '~/stores/store'
import { useI18n } from 'vue-i18n'
import { getScoreBackground } from '~/utils/getScoreBackground'

const { t } = useI18n()

const store = useStore()

const totalRatings = computed(() => store.stats?.totalRatings)
const amountMovies = computed(() => store.stats?.totalMovies)
const amountComments = computed(() => store.stats?.amountComments)
const amountLikes = computed(() => store.stats?.amountLikes)
const amountDislikes = computed(() => store.stats?.amountDislikes)

const averageTotal = computed(() => store.stats?.averageTotal)
const averageSexism = computed(() => store.stats?.averageSexism)
const averageRacism = computed(() => store.stats?.averageRacism)
const averageCringe = computed(() => store.stats?.averageCringe)
const averageOthers = computed(() => store.stats?.averageOthers)

const statsColumn1 = computed(() => [
	{
		name: t('stats.totalRatings'),
		stat: totalRatings.value
	},
	{
		name: t('stats.moviesOnTS'),
		stat: amountMovies.value
	},
	{
		name: t('stats.totalComments'),
		stat: amountComments.value
	},
	{
		name: t('stats.totalLikes'),
		stat: amountMovies.value
	},
	{
		name: t('stats.totalDislikes'),
		stat: amountDislikes.value
	}
])

const statsColumn2 = computed(() => {
	if (
		amountComments.value &&
		amountMovies.value &&
		amountLikes.value &&
		amountDislikes.value &&
		totalRatings.value
	) {
		return [
			{
				name: t('stats.averageComments'),
				stat: (amountComments.value / amountMovies.value).toFixed(2)
			},
			{
				name: t('stats.averageLikes'),
				stat: (amountLikes.value / amountMovies.value).toFixed(2)
			},
			{
				name: t('stats.averageDislikes'),
				stat: (amountDislikes.value / amountMovies.value).toFixed(2)
			},
			{
				name: t('stats.averageRatings'),
				stat: (totalRatings.value / amountMovies.value).toFixed(2)
			},
			{
				name: t('stats.launch'),
				stat: 2021
			}
		]
	} else return []
})

const statsColumn3 = computed(() => [
	{
		name: t('stats.average') + ' ' + 'Triggerscore',
		stat: averageTotal.value
	},
	{
		name: t('stats.average') + ' ' + t('categories.sexism'),
		stat: averageSexism.value
	},
	{
		name: t('stats.average') + ' ' + t('categories.racism'),
		stat: averageRacism.value
	},
	{
		name: t('stats.average') + ' ' + t('categories.others'),
		stat: averageOthers.value
	},
	{
		name: t('stats.average') + ' ' + t('categories.cringe'),
		stat: averageCringe.value
	}
])
</script>

<style scoped>
.stats-overview-wrapper {
	@apply font-semibold w-full flex flex-col lg:flex-row lg:gap-16;
}

.stat {
	@apply flex justify-between items-center border-b border-gray-800 py-4 gap-4;
}

.stat-value {
	@apply text-lg font-semibold h-12 flex items-center;
}

.stat-score-background {
	@apply h-12 w-12 text-white rounded-lg font-semibold text-lg;
}

.stat-score {
	@apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
}
</style>
