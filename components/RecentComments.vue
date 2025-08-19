<template>
    <div ref="container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        <template
            v-for="(comment, index) in store.recentComments"
            :key="comment.movie_id"
        >
            <div
            v-if="(index % 2 === 0) === toggleBool"
            class="bg-gradient-to-r from-gray-950 to-gray-800 p-4"
            >
            <div class="mb-4 flex gap-2 items-center">
                <div
                class="flex shrink-0 justify-center rounded-lg w-8 h-8 mr-2 bg-opacity-80"
                :class="{
                    'bg-red-700':
                    commentTotalRating(comment.movie_id, 11, 7),
                    'bg-yellow-500':
                    commentTotalRating(comment.movie_id, 7, 4),
                    'bg-green-600':
                    commentTotalRating(comment.movie_id, 4, 0),
                }"
                >
                <div class="self-center text-white">
                    {{
                    store.triggerscores.filter(
                        (score) => score.movie_id === comment.movie_id
                    )[0].rating_total
                    }}
                </div>
                </div>
                <h4
                    class="font-semibold cursor-pointer text-sm"
                    @click="navigateTo(localePath(`/movie/${comment.movie_id}`))"
                >
                  {{
                      store.movies.filter(
                      (movie) => movie.id === comment.movie_id
                      )[0].title
                  }}
                </h4>
            </div>
            <hr class="mb-4 w-36 border-yellow-500" >
            <div class="flex justify-between gap-2">
                <p class="italic text-sm">"{{ comment.comment }}"</p>
                <div v-if="comment.liked === 1 || comment.liked === true">
                    <font-awesome-icon
                        :icon="['fas', 'thumbs-up']"
                        class="text-green-500 text-xl"
                    />
                </div>
                <div v-if="comment.disliked === 1 || comment.disliked === true">
                    <font-awesome-icon
                        :icon="['fas', 'thumbs-down']"
                        class="text-red-500 text-xl"
                    />
                </div>
            </div>
            </div>
        </template>
    </div>
    <div class="flex gap-2 justify-center my-4">
      <button @click="handleToggle(true)">
        <font-awesome-icon
            :icon="['fas', 'circle']"
            class="text-xl transform transition-300 hover:scale-110"
            :class="[
                toggleBool ? 'text-yellow-500' : 'text-grey-500 opacity-50',
              ]"
        />
      </button>
      <button @click="handleToggle(false)">
        <font-awesome-icon
            :icon="['fas', 'circle']"
            class="text-xl transform transition-300 hover:scale-110"
            :class="[
                !toggleBool ? 'text-yellow-500' : 'text-grey-500 opacity-50',
              ]"
        />
      </button>
    </div>
</template>

<script setup lang='ts'>
import { useStore } from '~/stores/store'

const store = useStore()
const container: Ref<HTMLElement | null> = ref(null)
const touchstartX = ref(0)
const touchstartY = ref(0)
const commentTotalRating = (commentId: number, limitTop: number, limitBottom: number) => {
  const wantedMovie = store.triggerscores.filter(score => score.movie_id === commentId)[0]
  return wantedMovie !== undefined &&
      wantedMovie.rating_total !== undefined &&
      wantedMovie.rating_total < limitTop &&
      wantedMovie.rating_total >= limitBottom
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
    if (!(touchendY <= touchstartY.value + 40 && touchendY >= touchstartY.value - 40)) return
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