<template>
  <section
    :class="isFullscreen ? 'my-0 center-big-screen' : 'my-12'"
    class="container xl:w-10/12 mx-auto px-4 max-w-800px">
    <Head>
      <Title>Triggerscore Quiz - Movie guessing based on keywords</Title>
      <Meta charset="UTF-8" />
      <Meta
        name="keywords"
        content="triggering movies, quiz, movie game, movie quiz"
      />
      <Meta
        name="description"
        content="Play Movie Quiz on Triggerscore"
      />
      <Meta name="author" content="Christian Eckardt" />
      <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Meta :property="'og:title'" :content="JSON.stringify(title)" />
        <Meta
          property="og:description"
          content="Triggerscore Quiz - Movie guessing based on keywords"
        />
        <Meta property="og:image" content="https://www.triggerscore.de/images/quiz-image-komprimiert.png" />
        <Meta property="og:image:url" content="https://www.triggerscore.de/images/quiz-image-komprimiert.png" />
        <Meta property="og:image:secure_url" content="https://www.triggerscore.de/images/quiz-image-komprimiert.png" />
        <Meta
          property="og:url"
          content="https://www.triggerscore.de/Quiz"
        />
        <Meta property="og:type" content="game" />
    </Head>
    <div
      v-if="!gameRunning"
      :class="isFullscreen ? 'mt-8' : 'mt-0'"
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
    <div v-if="gameRunning" class="score-board grid grid-cols-2 bg-gradient-to-r from-gray-950 to-gray-800 text-white text-xl font-semibold p-4 my-8 rounded-xl" :class="isFullscreen ? 'my-8 md:mt-36' : 'my-8'">
      <div class="pr-4 border-r border-white">
        <transition 
          enter-active-class="duration-500 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
          mode="out-in"
        >
          <span :key="score">
            <font-awesome-icon :icon="['fas', 'user']" class="text-white mr-2" />
            {{ score }}
          </span>
        </transition>
      </div>
      <div class="pl-4" :class="currentPointsClass">
        <transition enter-active-class="duration-300 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
          mode="out-in"
        >
          <span :key="currentPoints"><font-awesome-icon :icon="['fas', 'clock']" class="text-white mr-2" /> {{ currentPoints }}</span>
        </transition>      
      </div>
    </div>
    <div v-if="gameRunning">
      <div v-if="playMode === 'poster'" class="image-wrapper" style="display: flex; justify-content: center">
        <img :src="poster" :style="posterStyle" />
      </div>
      <div v-if="playMode === 'keywords'" class="keywords-wrapper mb-8">
      <h2 class="text-center font-semibold text-2xl mb-4 text-white">Keywords</h2>
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
          class="grid grid-cols-2 gap-4 mb-2"
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
    <div v-else class="p-8 text-center text-balance">
      <h2 class="text-white text-xl font-semibold mb-8">{{ t("quiz.tagline") }}</h2>
      <div class="flex flex-col gap-8 items-center align-center justify-center mb-8">
        <img class="quiz-image max-w-16 hidden md:block" src="/images/quiz-image-komprimiert.png" />
        <p class="text-white text-lg text-wrap-balance">
          {{ t("quiz.description") }}
        </p>
      </div>
      <div class="flex flex-col gap-4 mx-auto" style="width: 260px;">
        <div>
          <button v-if="moviesForQuiz.length > 0" class="bg-yellow-600 transition hover:bg-yellow-700 p-3 rounded-lg text-white text-lg font-semibold uppercase w-full" @click="startGame">
            {{ t("quiz.startGame") }} <font-awesome-icon
              aria-hidden="true"
              :icon="['fas', 'circle-question']"
              class="text-white"
            />
          </button>
          <button v-else disabled class="opacity-80 bg-yellow-600 transition hover:bg-yellow-700 p-3 rounded-lg text-white text-lg font-semibold uppercase w-full" @click="startGame">
            <font-awesome-icon
              aria-hidden="true"
              :icon="['fas', 'spinner']"
              class="text-white animate-spin"
            />
          </button>
        </div>
        <div class="fullscreen-button text-white">
          <button @click="toggleFullscreen" class="bg-gray-600 hover:bg-yellow-700 p-3 rounded-lg text-white text-lg font-semibold uppercase w-full">
            Fullscreen an/aus <font-awesome-icon
              aria-hidden="true"
              :icon="['fas', 'expand']"
              class="text-white"
            />
          </button>
        </div>
      </div>  
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
            <button class="bg-gray-500 transition hover:bg-yellow-700 p-3 rounded-lg text-white font-semibold text-lg uppercase" @click="goBack">
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
const intervalPosterBlur = ref<number | null>(null)
const playMode = ref('keywords')
const isFullscreen = computed(() => store.isFullscreen)

const correctGuesses = ref(0)

const round = ref(1)
const score = ref(0)
const currentPoints = ref(1000)


const moviesForQuiz = computed(() => {
  const availableMovies = movies.value.filter(movie => 
    !previousMovies.value.includes(movie.id) && 
    movie.keywords.keywords.length >= 4 &&
    movie.vote_count > 500
  )

  const selectedMovies = []
  while (selectedMovies.length < 4 && availableMovies.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableMovies.length)
    selectedMovies.push(availableMovies.splice(randomIndex, 1)[0])
  }
  return selectedMovies
})

const poster = computed(
  () => `https://image.tmdb.org/t/p/original/${moviesForQuiz.value[correctIndex.value].poster_path}`
)

const posterBlurLevels = [2, 1.5, 1.25, 1, 0.75, 0.5, 0.2, 0.1, 0]
const posterBlurIndex = ref(0)
const posterStyle = ref(`filter:blur(${posterBlurLevels[posterBlurIndex.value]}rem)`)

const updatePosterBlur = () => {
  if (posterBlurIndex.value < posterBlurLevels.length - 1) {
    posterBlurIndex.value += 1
    posterStyle.value = `filter:blur(${posterBlurLevels[posterBlurIndex.value]}rem)`
  } else {
    clearInterval(intervalPosterBlur.value)
  }
}

const resetPosterBlur = () => {
  posterBlurIndex.value = 0
  posterStyle.value = `filter:blur(${posterBlurLevels[posterBlurIndex.value]}rem)`
}
const movieTitlesForQuiz = computed(() => moviesForQuiz.value.map(movie => movie.title || movie.original_title))
const keywordsForMovies = computed(() => moviesForQuiz.value.map(movie => movie.keywords.keywords.map(keyword => keyword.name)))

const checkForRightAnswer = (indexOfAnswerGiven: Number) => {
  if (selectedAnswer.value !== null) return
  clearInterval(intervalPosterBlur.value)
  posterBlurIndex.value = posterBlurLevels.length - 1
  posterStyle.value = `filter:blur(${posterBlurLevels[posterBlurIndex.value]}rem)`
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

const currentPointsClass = computed(() => {
  if (currentPoints.value < 400) {
    return 'text-red-500'
  } else if (currentPoints.value >= 400 && currentPoints.value <= 600) {
    return 'text-yellow-500'
  } else {
    return ''
  }
})

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
  showRoundModal.value = true
  setTimeout(() => {
    showRoundModal.value = false
    gameRunning.value = true
    startNewRound()
  }, 2000)
}

const startNewRound = () => {
  setRandomCorrectIndex()
  playMode.value = round.value % 2 === 0 ? 'poster' : 'keywords'
  clearInterval(intervalKeywords.value)
  clearInterval(intervalPoints.value)
  resetPosterBlur()
  displayKeywords()
  intervalPosterBlur.value = setInterval(() => updatePosterBlur(), 3000)
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
    gameRunning.value = false
  	showModal.value = false
    showRoundModal.value = false
    correctIndex.value = -1
    selectedAnswer.value = null
    displayedKeywords.value = []
    previousMovies.value = []
    intervalKeywords.value = null
    intervalPoints.value = null
    correctGuesses.value = 0
    round.value = 1
    score.value = 0
    currentPoints.value = 1000
}

const toggleFullscreen = () => {
  const elem = document.documentElement
  if (!document.fullscreenElement) {
      elem.requestFullscreen()
      store.isFullscreen = true
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
      store.isFullscreen = false
    }
  }
}

const goBack = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
    store.isFullscreen = false
  }
  navigateTo(localePath('/'))
}
</script>

<style>
.score-board {
  border: 4px solid orange;
}

.keywords-wrapper {
  min-height: 30vh;
}

.max-w-800px {
  max-width: 600px;
}

.quiz-image {
  width: 600px;
  max-width: 100%;
}

.hop {
  animation: hop 1s ease-in-out;
  animation-delay: 0.8s;
}

.drop {
  animation: drop 1s ease-in-out;
}

.image-wrapper, .image-wrapper img {
  max-height: 30vh;
  width: auto;
}

@media screen and (min-width: 450px) {
  .image-wrapper, .image-wrapper img {
    max-height: 35vh;
  }

  .keywords-wrapper {
    min-height: 35vh;
  }
}

@media screen and (min-width: 1024px) {
  .center-big-screen {
    position: absolute;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, -50%);
  }
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