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
    <div v-if="gameRunning" class="grid grid-cols-2 bg-gradient-to-r from-gray-950 to-gray-800 text-white text-lg font-extrabold p-4 my-8 rounded-lg">
      <div class="pr-4 border-r border-white">
        {{ t("quiz.yourScore") }}
        <br> 
        <transition 
          enter-active-class="duration-500 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
          mode="out-in"
        >
          <span :key="score">{{ score }}</span>
        </transition>
      </div>
      <div class="pl-4">
        {{ t("quiz.currentScore") }}
        <br>
        <transition enter-active-class="duration-300 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
          mode="out-in"
        >
          <span :key="currentPoints">{{ currentPoints }}</span>
        </transition>      </div>
    </div>
    <div v-if="gameRunning">
      <div class="text-xl text-white font-extrabold my-8">
        {{ t("quiz.round") }} {{  round }} / 10
      </div>
      <div class="min-h mb-8">
        <transition-group
          tag="div"
          class="flex flex-wrap gap-2"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          enter-active-class="transition duration-300"
        >
          <span v-for="keyword in displayedKeywords" :key="keyword" class="bg-gray-400 text-white font-extrabold p-2 rounded text-sm md:text-base transition-opacity duration-500 ease-in-out opacity-0">
            {{ keyword }}
          </span>
        </transition-group>
      </div>
      <h2 class="text-xl text-white my-8 font-extrabold">{{ t("quiz.question") }}</h2>
      <transition-group
          tag="div"
          class="grid grid-cols-2 gap-4"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          enter-active-class="transition duration-1000"
        >
        <button v-for="(title, index) in movieTitlesForQuiz" :key="title" :class="buttonClass(index)" @click="checkForRightAnswer(index)">
          {{ title }}
        </button>
      </transition-group>
    </div>
    <div v-else class="mt-8">
      <p class="text-white my-8 text-lg text-wrap-balance">
        {{ t("quiz.description") }}
      </p>
      <button class="bg-yellow-500 transition hover:bg-yellow-600 p-3 rounded-lg text-white font-semibold uppercase" @click="startGame">
        {{ t("quiz.startGame") }}
      </button>
    </div>
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-gradient-to-r from-gray-950 to-gray-800 text-white text-xl font-extrabold p-8 rounded-lg shadow-lg text-center">
          <h2 class="text-2xl font-bold mb-4">Game Over!</h2>
          <p class="mb-4">{{ t("quiz.finalScore") }}{{ score }}</p>
          <button class="bg-yellow-500 transition hover:bg-yellow-600 p-3 rounded-lg text-white font-semibold text-lg uppercase mt-8" @click="playAgain">
            {{ t("quiz.playAgain") }}
          </button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script lang="ts" setup>
import { useStore } from "~/stores/store"

const { t, locale } = useI18n()

const store = useStore()
store.setTriggerscores(locale.value)
const movies = computed(() => store.movies)

const gameRunning = ref(false)
const showModal = ref(false)

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
  if (selectedAnswer.value !== null) return
  clearInterval(intervalKeywords.value)
  clearInterval(intervalPoints.value)
  selectedAnswer.value = indexOfAnswerGiven
  if (indexOfAnswerGiven === correctIndex.value) {
    console.log('Correct!')
    score.value += currentPoints.value
  } else console.log('Wrong!')
  if (round.value < 10) {
    setTimeout(() => {
      previousMovies.value.push(...moviesForQuiz.value.map(movie => movie.id))
      startNewRound()
      round.value++
    }, 3000)
  } else {
    showModal.value = true
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
  selectedAnswer.value = null
  clearInterval(intervalKeywords.value)
  clearInterval(intervalPoints.value)
  setRandomCorrectIndex()
  displayKeywords()
  currentPoints.value = 1000
  intervalPoints.value = setInterval(() => {
    if (currentPoints.value > 0) {
      currentPoints.value -= 100
    } else {
      clearInterval(intervalPoints.value)
    }
  }, 4000)
}

const playAgain = () => {
  window.location.reload()
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