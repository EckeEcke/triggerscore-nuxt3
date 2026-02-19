<template>
	<div
		v-if="triggerscores.length > 0 && movies && movies?.length > 0"
		class="highlight-container container"
		:class="{ 'pt-4 pb-8': moreSpacing }"
	>
		<div
			class="title-wrapper"
			:class="{ 'border-t border-gray-800': showBorder }"
		>
			<h2 class="title">
				{{ title }}
			</h2>
			<p class="text-white">{{ subTitle }}</p>
		</div>
		<div class="relative group">
			<div ref="swiper" class="hide-scrollbar swiper">
				<MovieHighlightItem
					v-for="(movie, index) in movies"
					:key="index"
					:movie="movie"
					:shown-score="shownScore"
					:scores="
						triggerscores[
							triggerscores.map((score) => score.movie_id).indexOf(movie.id)
						]
					"
					:load-item="true"
				/>
				<div class="scroll-btns">
					<button
						class="bg-white rounded-full"
						@click="scrollHighlightContainer('left')"
					>
						<font-awesome-icon
							class="scroll-btn-icon"
							:icon="['fas', 'arrow-circle-left']"
						/>
					</button>
					<button
						class="bg-white rounded-full"
						@click="scrollHighlightContainer('right')"
					>
						<font-awesome-icon
							class="scroll-btn-icon"
							:icon="['fas', 'arrow-circle-right']"
						/>
					</button>
				</div>
			</div>
			<transition
				enter-from-class="opacity-0"
				enter-to-class="opacity-100"
				leave-active-class="duration-500 ease-in"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<div v-if="!scrolled" class="fade-overlay" />
			</transition>
		</div>
	</div>
</template>
<script setup lang="ts">
import { type ScoreKey, useStore } from '~/stores/store'
import type { Movie } from '~/types/movie'

const store = useStore()

defineProps({
	movies: {
		type: Array as PropType<Movie[]>,
		required: false,
		default: () => []
	},
	shownScore: {
		type: String as PropType<ScoreKey>,
		default: 'rating_total'
	},
	title: {
		type: String,
		default: undefined
	},
	subTitle: {
		type: String,
		default: undefined
	},
	showBorder: {
		type: Boolean,
		default: false
	},
	moreSpacing: {
		type: Boolean,
		default: false
	}
})

const scrolled = ref(false)
const swiper = ref()

const triggerscores = computed(() => store.triggerscores)

const handleScroll = () => {
	scrolled.value = !(swiper.value && swiper.value.scrollLeft === 0)
}

const scrollHighlightContainer = (direction: string) => {
	if (!swiper.value) return
	if (direction == 'left') {
		swiper.value.scrollBy({
			top: 0,
			left: -window.innerWidth / 2,
			behavior: 'smooth'
		})
	} else
		swiper.value.scrollBy({
			top: 0,
			left: window.innerWidth / 2,
			behavior: 'smooth'
		})
}

onMounted(() => {
	if (swiper.value) swiper.value.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
	if (swiper.value) swiper.value.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.highlight-container {
	@apply w-full bg-gray-900 bg-opacity-95 px-4 mb-0 mx-auto xl:w-10/12;
}

.title-wrapper {
	@apply font-semibold mb-4 pt-6 text-left;
}
.title {
	@apply text-xl text-yellow-500 mb-2;
}

.swiper {
	scroll-snap-type: x mandatory;
	@apply flex flex-none flex-row overflow-x-scroll py-4 px-0 -mr-4 md:mr-0;
}

.scroll-btns {
	@apply z-10 justify-between md:px-4 container mx-auto xl:w-10/12 hidden sm:group-hover:flex pointer-events-none absolute top-36 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
}

.scroll-btn-icon {
	@apply h-full text-yellow-500 text-4xl transition transform scale-125 hover:scale-150 pointer-events-auto;
}

.fade-overlay {
	background-image: linear-gradient(
		to right,
		rgba(5, 5, 15, 0),
		rgba(5, 5, 15, 1)
	);
	@apply absolute bottom-0 -right-4 w-12 lg:w-20 h-full pointer-events-none;
}
</style>
