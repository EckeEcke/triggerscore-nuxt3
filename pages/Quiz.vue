<template>
  <section class="container xl:w-10/12 mx-auto px-4 my-12 sm:my-24 max-w-800px">
    <Head>
      <Title>Triggerscore Quiz - Movie guessing based on keywords</Title>
      <Meta charset="UTF-8" />
      <Meta
        name="keywords"
        content="triggering movies, quiz, movie game"
      />
      <Meta
        name="description"
        content="Play Movie Quiz on Triggerscore"
      />
      <Meta name="author" content="Christian Eckardt" />
      <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div
    class="text-3xl self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200"
    >
    <h1 aria-label="TRIGGERSCORE QUIZ">
      TRIGGERSC<font-awesome-icon
        aria-hidden="true"
        :icon="['fas', 'angry']"
        class="text-white"
      /><span class="sr-only">O</span>RE QUIZ
    </h1>
    
    </div>
    <div v-if="gameRunning" class="grid grid-cols-2 bg-gradient-to-r from-gray-950 to-gray-800 text-white text-xl font-semibold p-4 my-8 rounded-lg">
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
        </transition>      
      </div>
    </div>
    <div v-if="gameRunning">
      <div class="text-2xl text-white font-semibold my-8">
        <span v-if="round === 10">{{  t("quiz.lastRound") }}</span>
        <span v-else>{{ t("quiz.round") }} {{  round }}</span>
      </div>
      <div class="min-h mb-8">
        <transition-group
          tag="div"
          class="flex flex-wrap gap-2"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          enter-active-class="transition duration-300"
        >
          <span v-for="keyword in displayedKeywords" :key="keyword" class="bg-gray-500 text-white font-semibold p-2 rounded text-sm md:text-lg transition-opacity duration-500 ease-in-out opacity-0">
            {{ keyword }}
          </span>
        </transition-group>
      </div>
      <h2 class="text-2xl text-white my-8 font-semibold">{{ t("quiz.question") }}</h2>
      <transition-group
          tag="div"
          class="grid grid-cols-2 gap-4"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          enter-active-class="transition duration-1000"
          mode="out-in"
        >
        <button v-for="(title, index) in movieTitlesForQuiz" :key="title" :class="buttonClass(index)" @click="checkForRightAnswer(index)">
          {{ title }}
        </button>
      </transition-group>
    </div>
    <div v-else class="mt-8 p-8 text-center text-balance">
      <h2 class="text-white text-xl font-semibold mb-4">{{ t("quiz.tagline") }}</h2>
      <hr class="my-6">
      <div class="flex flex-col gap-8 items-center align-center justify-center mb-8">
        <img class="quiz-image max-w-16 hidden md:block" src="/images/quiz-image.png" />
        <p class="text-white text-lg text-wrap-balance">
          {{ t("quiz.description") }}
        </p>
      </div>
      <button v-if="moviesForQuiz.length > 0" class="bg-yellow-600 transition hover:bg-yellow-700 p-3 rounded-lg text-white text-lg font-semibold uppercase" @click="startGame">
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
      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900">
        <div class="text-white text-xl font-semibold p-8 mx-4 rounded-lg shadow-lg text-center">
          <h2 class="text-3xl font-semibold mb-8">Game Over!</h2>
          <p>{{ t("quiz.finalScore") }}{{ score }}</p>
          <p class="mb-8">{{ t("quiz.correctGuesses", { correctGuesses: correctGuesses }) }}</p>
          <p>{{ t("quiz.congratulations") }}</p>
          <p class="mb-8 shiny-text text-3xl">{{  getPlayerTitle(score) }}</p>
          <div class="flex flex-col gap-4 mt-8">
            <button class="bg-yellow-600 transition hover:bg-yellow-700 p-3 rounded-lg text-white font-semibold text-lg uppercase" @click="playAgain">
              {{ t("quiz.playAgain") }}
            </button>
            <button class="bg-gray-500 transition hover:bg-yellow-700 p-3 rounded-lg text-white font-semibold text-lg uppercase" @click="navigateTo(localePath('/'))">
              {{ t("general.back") }}
            </button>
          </div>
        </div>
      </div>
    </transition>
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div v-if="showRoundModal" class="fixed inset-0 flex items-center justify-center bg-gradient-to-r bg-gray-900">
        <div class="shiny-text uppercase text-5xl font-semibold p-8 mx-4 rounded-lg shadow-lg text-center">
          <span v-if="round === 10">{{  t("quiz.lastRound") }}</span>
        <span v-else>{{ t("quiz.round") }} {{  round }}</span>
        </div>
      </div>
    </transition>
  </section>
</template>

<script lang="ts" setup>
import { useStore } from "~/stores/store"

const { t } = useI18n()

const store = useStore()
const localePath = useLocalePath()

const movies = computed(() => store.movies)

const gameRunning = ref(false)
const showModal = ref(false)
const showRoundModal = ref(false)

const correctIndex = ref(-1)
const selectedAnswer = ref<number | null>(null)
const displayedKeywords = ref<string[]>([])
const previousMovies = ref<number[]>([])
const intervalKeywords = ref<number | null>(null)
const intervalPoints = ref<number | null>(null)
const correctGuesses = ref(0)

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
    correctGuesses.value++
    score.value += currentPoints.value
  }
  
  if (round.value < 10) {
    setTimeout(() => {
      round.value++
      showRoundModal.value = true
      selectedAnswer.value = null
      setTimeout(() => {
        displayedKeywords.value = []
        previousMovies.value.push(...moviesForQuiz.value.map(movie => movie.id))
        setTimeout(() => {
          showRoundModal.value = false
          startNewRound()
        }, 2000)
      }, 400)
    }, 1900)
    
  } else {
    setTimeout(() => { showModal.value = true }, 1900)
  }
}

const buttonClass = (index: number) => {
  if (selectedAnswer.value === null) return 'bg-yellow-600 transition hover:bg-yellow-700 p-3 rounded-lg text-white font-semibold'
  if (index === correctIndex.value) return 'bg-green-500 p-3 transition rounded-lg text-white font-semibold hop'
  if (index === selectedAnswer.value) return 'bg-red-700 p-3 transition rounded-lg text-white font-semibold drop'
  return 'bg-yellow-600 p-3 rounded-lg text-white font-semibold'
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
  setRandomCorrectIndex()
  clearInterval(intervalKeywords.value)
  clearInterval(intervalPoints.value)
  displayKeywords()
  currentPoints.value = 1000
  setTimeout(() => {
      intervalPoints.value = setInterval(() => {
        if (currentPoints.value > 0) {
          currentPoints.value -= 50
        } else {
          clearInterval(intervalPoints.value)
        }
      }, 2000)}, 4000)
}

const getPlayerTitle = (score: number) => {
  if (score > 8500) return t("quiz.titles.worldClassCineast")
  if (score > 7500) return t("quiz.titles.cineast")
  if (score > 6500) return t("quiz.titles.movieExpert")
  if (score > 5500) return t("quiz.titles.movieFan")
  return t("quiz.titles.movieBeginner")
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

.quiz-image {
  max-width: 15rem;
}

.hop {
  animation: hop 1s ease-in-out;
  animation-delay: 0.8s;
}

.drop {
  animation: drop 1s ease-in-out;
}

@keyframes hop {
  0% {
    transform: translateY(0) scale(1);
  }
  30% {
    transform: translateY(-10px) scale(1.1);
  }
  50% {
    transform: translateY(0) scale(1);
  }
  70% {
    transform: translateY(-5px) scale(1.05);
  }
  100% {
    transform: translateY() scale(1);
  }
}

@keyframes drop {
  0% {
    transform: translate(0) scale(1);
  }
  30% {
    transform: translateY(5px) scale(0.9);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

</style>