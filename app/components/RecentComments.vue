<template>
	<div v-if="recentComments" ref="container" class="comments-grid">
		<template
			v-for="(comment, index) in recentComments"
			:key="comment.movie_id"
		>
			<div v-if="(index % 2 === 0) === toggleBool" class="comment-background">
				<div class="mb-4 flex gap-2 items-center">
					<div
						class="rating"
						:class="{
							'bg-red-700': commentTotalRating(comment.movie_id, 11, 7),
							'bg-yellow-500': commentTotalRating(comment.movie_id, 7, 4),
							'bg-green-600': commentTotalRating(comment.movie_id, 4, 0)
						}"
					>
						<div class="rating-value">
							{{ totalRating(comment) }}
						</div>
					</div>
					<h3
						class="movie-title"
						@click="navigateTo(localePath(`/movie/${comment.movie_id}`))"
					>
						{{ movieTitle(comment) }}
					</h3>
				</div>
				<hr>
				<div class="comment">
					<p class="comment-text">"{{ comment.comment }}"</p>
					<div v-if="comment.liked === 1 || comment.liked === true">
						<font-awesome-icon
							:icon="['fas', 'thumbs-up']"
							class="like-icon"
						/>
					</div>
					<div v-if="comment.disliked === 1 || comment.disliked === true">
						<font-awesome-icon
							:icon="['fas', 'thumbs-down']"
							class="dislike-icon"
						/>
					</div>
				</div>
			</div>
		</template>
	</div>
	<div class="toggle-btns">
		<button @click="handleToggle(true)">
			<font-awesome-icon
				:icon="['fas', 'circle']"
				class="toggle-btn"
				:class="[toggleBool ? 'text-yellow-500' : 'text-grey-500 opacity-50']"
			/>
		</button>
		<button @click="handleToggle(false)">
			<font-awesome-icon
				:icon="['fas', 'circle']"
				class="toggle-btn"
				:class="[!toggleBool ? 'text-yellow-500' : 'text-grey-500 opacity-50']"
			/>
		</button>
	</div>
</template>

<script setup lang="ts">
import { type RecentComment, useStore } from '~/stores/store'

const store = useStore()
const container: Ref<HTMLElement | null> = ref(null)
const touchstartX = ref(0)
const touchstartY = ref(0)

const recentComments: RecentComment[] = store.recentComments

const totalRating = (comment: RecentComment) => {
	if (!store.triggerscores || store.triggerscores.length === 0) return
	return store.triggerscores.find(
		(score) => score.movie_id === comment.movie_id
	)?.rating_total
}

const movieTitle = (comment: RecentComment) => {
	if (
		!store.triggerscores ||
		store.triggerscores.length === 0 ||
		!Array.isArray(store.movies)
	)
		return
	return store.movies.find((movie) => movie.id === comment.movie_id)?.title
}

const commentTotalRating = (
	commentId: number,
	limitTop: number,
	limitBottom: number
) => {
	const wantedMovie = store.triggerscores.find(
		(score) => score.movie_id === commentId
	)
	return (
		wantedMovie !== undefined &&
		wantedMovie.rating_total !== undefined &&
		wantedMovie.rating_total < limitTop &&
		wantedMovie.rating_total >= limitBottom
	)
}
const localePath = useLocalePath()
const toggleBool = ref(false)
const startTime = ref(Date.now())
const TOGGLE_INTERVAL = 10000
const animationFrameId: Ref<number | undefined> = ref(undefined)

const checkToggle = () => {
	const now = Date.now()
	if (now - startTime.value >= TOGGLE_INTERVAL) {
		toggleBool.value = !toggleBool.value
		startTime.value = now
	}
	animationFrameId.value = requestAnimationFrame(checkToggle)
}

const handleToggle = (value: boolean) => {
	toggleBool.value = value
	startTime.value = Date.now()
}

const handleTouchStart = (event: TouchEvent) => {
	touchstartX.value = event.changedTouches[0].screenX
	touchstartY.value = event.changedTouches[0].screenY
}

const handleTouchEnd = (event: TouchEvent) => {
	const touchendX = event.changedTouches[0].screenX
	const touchendY = event.changedTouches[0].screenY
	if (
		!(
			touchendY <= touchstartY.value + 40 && touchendY >= touchstartY.value - 40
		)
	)
		return
	if (touchendX + 60 < touchstartX.value) {
		toggleBool.value = !toggleBool.value
	}
	if (touchendX - 60 > touchstartX.value) {
		toggleBool.value = !toggleBool.value
	}
}

onMounted(() => {
	animationFrameId.value = requestAnimationFrame(checkToggle)
	container.value!.addEventListener('touchstart', handleTouchStart, false)
	container.value!.addEventListener('touchend', handleTouchEnd, false)
})

onUnmounted(() => {
	if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value)
	container.value?.removeEventListener('touchstart', handleTouchStart, false)
	container.value?.removeEventListener('touchend', handleTouchEnd, false)
})
</script>

<style scoped>
hr {
  @apply mb-4 w-36 border-yellow-500;
}
.comments-grid {
	@apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4;
}

.comment-background {
	@apply bg-gradient-to-r from-gray-950 to-gray-800 p-4;
}

.rating {
  @apply flex shrink-0 justify-center rounded-lg w-10 h-10 mr-2 bg-opacity-80;
}

.rating-value {
  @apply self-center text-white text-lg font-semibold;
}

.movie-title {
  @apply font-semibold cursor-pointer text-base;
}

.comment {
  @apply flex justify-between gap-2;
}

.comment-text {
  @apply flex justify-between gap-2;
}

.like-icon {
  @apply text-green-500 text-xl;
}

.dislike-icon {
  @apply text-red-500 text-xl;
}

.toggle-btns {
  @apply flex gap-2 justify-center my-4;
}

.toggle-btn {
  @apply text-xl transform transition duration-300 hover:scale-110;
}
</style>
