<template>
  <section class="container xl:w-10/12 mx-auto px-4 my-12 sm:my-24">
    <div
    class="text-2xl self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200"
    >
    TRIGGERSC<font-awesome-icon
        :icon="['fas', 'angry']"
        class="text-white"
    />RE QUIZ
    </div>
    <div class="flex bg-gray-500 text-white justify-between p-4 my-4 rounded-lg">
      <div>
        PUNKTE: {{ score }}
      </div>
      <div>
        DIESE RUNDE: {{ currentPoints }}
      </div>
    </div>
    <div v-if="gameRunning">
      <div class="min-h mb-8">
        <div class=" flex flex-wrap gap-2">
          <span v-for="keyword in displayedKeywords" class="bg-gray-400 text-white p-2 rounded text-xs md:text-base">
            {{ keyword }}
          </span>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <button v-for="(title, index) in movieTitlesForQuiz" class="bg-yellow-500 transition hover:bg-yellow-600 p-3 rounded-lg text-white font-semibold uppercase" @click="checkForRightAnswer(index)">
        {{ title }}
        </button>
      </div>
    </div>
    <div v-else>
      <button class="bg-yellow-500 transition hover:bg-yellow-600 p-3 rounded-lg text-white font-semibold uppercase" @click="startGame">
        Start Game
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useStore } from "~/stores/store"

const store = useStore()
const movies = computed(() => store.movies)

const gameRunning = ref(false)

const correctIndex = ref(-1)
const displayedKeywords = ref<string[]>([])
const previousMovies = ref<number[]>([])
const intervalKeywords = ref<number | null>(null)
const intervalPoints = ref<number | null>(null)

const round = ref(1)
const score = ref(0)
const currentPoints = ref(1000)


const moviesForQuiz = computed(() => {
  const availableMovies = movies.value.filter(movie => 
    !previousMovies.value.includes(movie.id) && 
    movie.keywords.keywords.length >= 4
  )

  const selectedMovies = []
  while (selectedMovies.length < 4 && availableMovies.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableMovies.length)
    selectedMovies.push(availableMovies.splice(randomIndex, 1)[0])
  }
  return selectedMovies
})

const movieTitlesForQuiz = computed(() => moviesForQuiz.value.map(movie => movie.title || movie.original_title))
const keywordsForMovies = computed(() => moviesForQuiz.value.map(movie => movie.keywords.keywords.map(keyword => keyword.name)))

const checkForRightAnswer = (indexOfAnswerGiven: Number) => {
  clearInterval(intervalKeywords.value)
  if (indexOfAnswerGiven === correctIndex.value) {
    console.log('Correct!')
    score.value += currentPoints.value
  } else console.log('Wrong!')
  previousMovies.value.push(...moviesForQuiz.value.map(movie => movie.id))
  previousMovies.value.push(...moviesForQuiz.value.map(movie => movie.id))
  if (round.value < 10) {
    round.value++
    startNewRound()
  } else {
    console.log('Game Over! Final Score:', score.value)
  }
}

const setRandomCorrectIndex = () => correctIndex.value = Math.floor(Math.random() * 4)

const displayKeywords = () => {
  const keywords = keywordsForMovies.value[correctIndex.value]
  if (!keywords) return
  let index = 0
  displayedKeywords.value = []

  intervalKeywords.value = setInterval(() => {
    if (index < keywords.length) {
      displayedKeywords.value.push(keywords[index])
      index++
    } else {
      clearInterval(intervalKeywords.value)
    }
    if (index === 10) clearInterval(intervalKeywords.value)
  }, 3000)
}

const startGame = () => {
  gameRunning.value = true
  startNewRound()
}

const startNewRound = () => {
  clearInterval(intervalPoints.value)
  currentPoints.value = 1000
  setRandomCorrectIndex()
  displayKeywords()
  intervalPoints.value = setInterval(() => {
    if (currentPoints.value > 0) {
      currentPoints.value -= 100
    } else {
      clearInterval(intervalPoints.value)
    }
  }, 3000)
}
</script>

<style>

.min-h {
  min-height: 10rem;
}

</style>