<template>
  <section class="container xl:w-10/12 mx-auto px-4 my-12 sm:my-24 max-w-800px">
    <div
    class="text-2xl self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200"
    >
    TRIGGERSC<font-awesome-icon
        :icon="['fas', 'angry']"
        class="text-white"
    />RE QUIZ
    </div>
    <div v-if="gameRunning" class="grid grid-cols-2 bg-gray-400 text-white font-extrabold p-4 my-8 rounded-lg">
      <div class="pr-4 border-r border-white">
        DEINE PUNKTE: {{ score }}
      </div>
      <div class="pl-4">
        DIESE RUNDE: {{ currentPoints }}
      </div>
    </div>
    <div v-if="gameRunning">
      <div class="text-xl text-white font-extrabold my-8">
      ROUND {{  round }} / 10
      </div>
      <div class="min-h mb-8">
        <transition-group
          tag="div"
          class="flex flex-wrap gap-2"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          enter-active-class="transition duration-300"
        >
          <span v-for="keyword in displayedKeywords" :key="keyword" class="bg-gray-400 text-white p-2 rounded text-xs md:text-base transition-opacity duration-500 ease-in-out opacity-0">
            {{ keyword }}
          </span>
        </transition-group>
      </div>
      <h2 class="text-xl text-white my-8 font-extrabold">Welcher Film wird gesucht?</h2>
      <div class="grid grid-cols-2 gap-4">
        <button v-for="(title, index) in movieTitlesForQuiz" :key="index" :class="buttonClass(index)" @click="checkForRightAnswer(index)">
        {{ title }}
        </button>
      </div>
    </div>
    <div v-else class="mt-8">
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
const selectedAnswer = ref<number | null>(null)
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
  if (selectedAnswer.value) return
  clearInterval(intervalKeywords.value)
  clearInterval(intervalPoints.value)
  selectedAnswer.value = indexOfAnswerGiven
  if (indexOfAnswerGiven === correctIndex.value) {
    console.log('Correct!')
    score.value += currentPoints.value
  } else console.log('Wrong!')
  if (round.value < 10) {
    round.value++
    setTimeout(() => {
      selectedAnswer.value = null
      previousMovies.value.push(...moviesForQuiz.value.map(movie => movie.id))
      startNewRound()
    }, 3000)
  } else {
    alert('Game Over! Final Score: ' + score.value)
  }
}

const buttonClass = (index: number) => {
  if (selectedAnswer.value === null) return 'bg-yellow-500 transition hover:bg-yellow-600 p-3 rounded-lg text-white font-semibold uppercase'
  if (index === correctIndex.value) return 'bg-green-500 p-3 rounded-lg text-white font-semibold uppercase'
  if (index === selectedAnswer.value) return 'bg-red-950 p-3 rounded-lg text-white font-semibold uppercase'
  return 'bg-yellow-500 p-3 rounded-lg text-white font-semibold uppercase'
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
  clearInterval(intervalKeywords.value)
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
  }, 4000)
}
</script>

<style>

.min-h {
  min-height: 10rem;
}

.max-w-800px {
  max-width: 800px;
}

</style>