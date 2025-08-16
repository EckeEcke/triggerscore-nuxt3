<template>
  <div class="lg:flex lg:justify-center w-full md:pt-4">
    <div
      :class="{ 'bg-opacity-0 w-full': submitted }"
      class="text-white md:rounded-b lg:rounded-t md:px-4"
    >
    <Teleport to="#__nuxt">
      <div 
        v-if="submitted && showConfirmationModal" 
        class="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-40 overflow-none"
      >
        <ThankyouAnimation
          key="animation"
          @complete="showConfirmationModal = false"
        />
      </div>
    </Teleport>
      <div
        v-if="submitted"
        class="bg-green-550 text-white text-center text-2xl px-6 py-16 rounded-b lg:rounded h-72 lg:sticky lg:bottom-0"
      >
        <Transition name="fade" mode="out-in">
          <div v-if="animCompleted" key="text" class="font-bold pt-8">
            <p>{{ t("rating.thanks") }}</p>
            <button
              class="text-base bg-yellow-500 transition hover:bg-yellow-600 p-3 mt-6 rounded font-semibold text-white uppercase"
              @click="router.go(-1)"
            >
              <font-awesome-icon
                :icon="['fas', 'arrow-circle-left']"
                class="mr-2"
              />
              {{ t("general.back") }}
            </button>
          </div>
          <ThankyouAnimation
            v-else-if="!animCompleted"
            key="animation"
            @complete="animCompleted = true"
          />
        </Transition>
      </div>
      <div v-else class="mx-auto overflow-hidden text-left">
        <h2
          id="rating"
          class="font-semibold text-xl text-white py-6 px-4 lg:rounded-t"
        >
          {{ t("rating.submitFor") }}<br >"{{ movie.title ?? movie.original_title }}"
        </h2>
        <hr class="border-gray-800 hidden md:block max-w-lg ml-4" >
        <label class="px-4 my-2 mt-6 block text-lg font-semibold">{{
          t("categories.sexism")
        }}</label>
        <p class="px-4 mb-4 max-w-lg">{{ t("rating.descSexism") }}</p>
        <div
          class="max-w-full rating hide-scrollbar flex w-fit sm:justify-end ml-3 overflow-y-scroll sm:overflow-hidden mb-5"
        >
          <button
            v-for="(n, i) in 11"
            :key="i"
            :class="[
              ['rating' + (10 - i)],
              [ratingSexism == 10 - i ? 'opacity-100' : 'opacity-50'],
              [i == 0 ? 'mr-4' : ''],
            ]"
            class="w-12 sm:w-12 lg:w-10 xl:w-12 h-12 sm:h-12 lg:h-10 xl:h-12 p-1 text-center text-sm flex-none font-semibold text-white"
            @click="ratingSexism = ratingSexism == 10 - i ? null : 10 - i"
          >
            <div
              class="w-full h-full rounded-lg flex text-center justify-center font-semibold"
              :class="{
                'transform scale-110 text-lg': ratingSexism == 10 - i,
                'bg-green-600': 10 - i < 4,
                'bg-yellow-500': 10 - i > 3 && 10 - i < 7,
                'bg-red-700': 10 - i > 6,
                'opacity-100': ratingSexism == 10 - i,
              }"
            >
              <span class="self-center">{{ 10 - i }}</span>
            </div>
          </button>
        </div>

        <hr class="border-transparent" >
        <label class="px-4 my-2 block text-lg font-semibold">{{
          t("categories.racism")
        }}</label>
        <p class="px-4 mb-4 max-w-lg">{{ t("rating.descRacism") }}</p>
        <div
          class="max-w-full rating hide-scrollbar flex w-fit sm:justify-end ml-3 overflow-y-scroll sm:overflow-hidden mb-4"
        >
          <button
            v-for="(n, i) in 11"
            :key="i"
            :class="[
              ['rating' + (10 - i)],
              [ratingRacism == 10 - i ? 'opacity-100' : 'opacity-50'],
              [i == 0 ? 'mr-4' : ''],
            ]"
            class="w-12 sm:w-12 lg:w-10 xl:w-12 h-12 sm:h-12 lg:h-10 xl:h-12 p-1 text-center text-sm flex-none font-semibold text-white"
            @click="ratingRacism = ratingRacism == 10 - i ? null : 10 - i"
          >
            <div
              class="w-full h-full rounded-lg flex text-center justify-center font-semibold"
              :class="{
                'transform scale-110 text-lg': ratingRacism == 10 - i,
                'bg-green-600': 10 - i < 4,
                'bg-yellow-500': 10 - i > 3 && 10 - i < 7,
                'bg-red-700': 10 - i > 6,
                'opacity-100': ratingRacism == 10 - i,
              }"
            >
              <span class="self-center">{{ 10 - i }}</span>
            </div>
          </button>
        </div>
        <hr class="border-transparent" >
        <label class="px-4 my-2 block text-lg font-semibold">{{
          t("categories.others")
        }}</label>
        <p class="px-4 mb-4 max-w-lg">{{ t("rating.descOthers") }}</p>
        <div
          class="max-w-full rating hide-scrollbar flex w-fit sm:justify-end ml-3 overflow-y-scroll sm:overflow-hidden mb-4"
        >
          <button
            v-for="(n, i) in 11"
            :key="i"
            :class="[
              ['rating' + (10 - i)],
              [ratingOthers == 10 - i ? 'opacity-100' : 'opacity-50'],
              [i == 0 ? 'mr-4' : ''],
            ]"
            class="w-12 sm:w-12 lg:w-10 xl:w-12 h-12 sm:h-12 lg:h-10 xl:h-12 p-1 text-center text-sm flex-none font-semibold text-white"
            @click="ratingOthers = ratingOthers == 10 - i ? null : 10 - i"
          >
            <div
              class="w-full h-full rounded-lg flex text-center justify-center font-semibold"
              :class="{
                'transform scale-110 text-lg': ratingOthers == 10 - i,
                'bg-green-600': 10 - i < 4,
                'bg-yellow-500': 10 - i > 3 && 10 - i < 7,
                'bg-red-700': 10 - i > 6,
                'opacity-100': ratingOthers == 10 - i,
              }"
            >
              <span class="self-center">{{ 10 - i }}</span>
            </div>
          </button>
        </div>

        <hr class="border-transparent" >
        <label class="px-4 my-2 block text-lg font-semibold">{{
          t("categories.cringe")
        }}</label>
        <p class="px-4 mb-4 max-w-lg">{{ t("rating.descCringe") }}</p>
        <div
          class="max-w-full rating hide-scrollbar flex w-fit sm:justify-end ml-3 overflow-y-scroll sm:overflow-hidden mb-4"
        >
          <button
            v-for="(n, i) in 11"
            :key="i"
            :class="[
              ['rating' + (10 - i)],
              [ratingCringe == 10 - i ? 'opacity-100' : 'opacity-50'],
              [i == 0 ? 'mr-4' : ''],
            ]"
            class="w-12 sm:w-12 lg:w-10 xl:w-12 h-12 sm:h-12 lg:h-10 xl:h-12 p-1 text-center text-sm flex-none font-semibold text-white"
            @click="ratingCringe = ratingCringe == 10 - i ? null : 10 - i"
          >
            <div
              class="w-full h-full rounded-lg flex text-center justify-center font-semibold"
              :class="{
                'transform scale-110 text-lg': ratingCringe == 10 - i,
                'bg-green-600': 10 - i < 4,
                'bg-yellow-500': 10 - i > 3 && 10 - i < 7,
                'bg-red-700': 10 - i > 6,
                'opacity-100': ratingCringe == 10 - i,
              }"
            >
              <span class="self-center">{{ 10 - i }}</span>
            </div>
          </button>
        </div>
        <hr class="border-transparent" >
        <p class="my-4 text-lg font-semibold px-4 max-w-lg">
          {{ t("rating.leaveComment") }} (optional)
        </p>
        <div class="w-full px-4 mb-4">
          <textarea
            v-model="comment"
            rows="3"
            class="w-full max-w-lg bg-gray-950 p-2 resize-none rounded-lg"
            maxlength="100"
            :placeholder="t('rating.placeholder')"
          />
          <p v-if="comment.length > 0" class="text-right text-xs">
            {{ comment.length }}/100 {{ t("rating.characters") }}
          </p>
        </div>
        <hr class="border-transparent" >
        <div class="w-full">
          <p class="my-4 text-lg font-semibold px-4 max-w-lg">
            {{ t("rating.didYouLike") }} (optional)
          </p>
          <div class="flex justify-center md:justify-center gap-4 mx-4 mt-4 max-w-lg">
            <LikeAnimation
              :dislike-clicked="disliked"
              :class="{ 'opacity-30': !liked }"
              @like-clicked="handleLike"
            />
            <DislikeAnimation
              :like-clicked="liked"
              :class="{ 'opacity-30': !disliked }"
              @dislike-clicked="handleDislike"
            />
          </div>
        </div>
        <hr class="border-transparent" >
        <div class="flex justify-start pt-8 pb-12 px-4 rounded-b-lg">
          <button
            :disabled="
              !(
                ratingSexism != null &&
                ratingRacism != null &&
                ratingOthers != null &&
                ratingCringe != null
              )
            "
            class="max-w-lg w-full bg-yellow-500 text-white disabled:opacity-50 font-semibold p-3 rounded-lg shadow-lg transition duration-300 hover:scale-105 hover:bg-yellow-600 uppercase"
            @click="submitRating"
          >
            {{ t("rating.submit") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import DislikeAnimation from '~/components/animations/DislikeAnimation.vue'
import LikeAnimation from '~/components/animations/LikeAnimation.vue'
import ThankyouAnimation from '~/components/animations/ThankyouAnimation.vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '~/stores/store'

const ratingSexism: Ref<null | number> = ref(null)
const ratingRacism: Ref<null | number> = ref(null)
const ratingOthers: Ref<null | number> = ref(null)
const ratingCringe: Ref<null | number> = ref(null)
const comment = ref('')
const submitted = ref(false)
const liked = ref(false)
const disliked = ref(false)
const animCompleted = ref(false)
const showConfirmationModal = ref(true)

const { t } = useI18n()
const router = useRouter()
const store = useStore()

const movie: ComputedRef<any> = computed(() => store.selectedMovie)

const submitRating = (event: Event) => {
  event.preventDefault()
  submitted.value = true
  const data = {
    movieID: movie.value.id,
    sexism: ratingSexism.value,
    racism: ratingRacism.value,
    others: ratingOthers.value,
    cringe: ratingCringe.value,
    comment: comment.value,
    like: liked.value,
    dislike: disliked.value,
    title: movie.value.title,
    original_title: movie.value.original_title,
  }

  fetch('https://www.triggerscore.de/.netlify/functions/postData', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
}

const handleLike = (value: boolean) => {
  liked.value = value
  if (liked.value === true) {
    disliked.value = false
  }
}

const handleDislike = (value: boolean) => {
  disliked.value = value
  if (disliked.value === true) {
    liked.value = false
  }
}

onMounted(() => {
  const ratings = document.getElementsByClassName('rating') // for fixing issues with flex-end and overflow-hidden
  for (let i = 0; i < ratings.length; i++) {
    ratings[i].scrollLeft -= 500
  }
})
</script>

<style>
.rating {
  direction: rtl;
}

@media (min-width: 530px) {
  .rating {
    justify-content: flex-end;
  }
}

@media (min-width: 576px) {
  .rating button:hover {
    opacity: 1;
  }
  .rating0:hover ~ button,
  .rating1:hover ~ button,
  .rating2:hover ~ button,
  .rating3:hover ~ button,
  .rating4:hover ~ button,
  .rating5:hover ~ button,
  .rating6:hover ~ button,
  .rating7:hover ~ button,
  .rating8:hover ~ button,
  .rating9:hover ~ button,
  .rating10:hover ~ button {
    opacity: 1;
  }
}
</style>
