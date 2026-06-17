<template>
  <div class="ratings-section">
    <div :class="{ 'bg-opacity-0 w-full': submitted }" class="ratings-wrapper">
      <Teleport to="#__nuxt">
        <div
          v-if="submitted && showConfirmationModal"
          class="animation-wrapper"
        >
          <ThankyouAnimation
            key="animation"
            class="animation"
            @complete="showConfirmationModal = false"
          />
        </div>
      </Teleport>
      <div v-if="submitted" class="submitted-info">
        <Transition name="fade" mode="out-in">
          <div v-if="animCompleted" key="text" class="font-bold pt-8">
            <p>{{ t("rating.thanks") }}</p>
            <button class="back-btn" @click="router.go(-1)">
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
      <div v-else class="title-wrapper">
        <h2 id="rating" class="rated-movie-title">
          {{ t("rating.submitFor") }}<br />"{{
            movie?.title ?? movie?.original_title
          }}"
        </h2>

        <template v-for="cat in categories" :key="cat.id">
          <hr class="category-divider" />

          <label class="category-label">
            {{ t(cat.label) }}
          </label>

          <p class="category-desc">{{ t(cat.desc) }}</p>

          <div class="rating-btns-wrapper hide-scrollbar rating">
            <button
              v-for="i in 11"
              :key="i"
              :class="[
                'rating' + (11 - i),
                i === 1 ? 'mr-4' : '',
                cat.ref.value === 11 - i ? 'opacity-100' : 'opacity-50',
              ]"
              class="rating-btn"
              @click="setRating(cat.ref, 11 - i)"
            >
              <span
                class="rating-btn-background"
                :class="{
                  'transform scale-110 text-lg ring-2 ring-white':
                    cat.ref.value === 11 - i,
                  'bg-green-600': 11 - i < 4,
                  'bg-yellow-500': 11 - i > 3 && 11 - i < 7,
                  'bg-red-700': 11 - i > 6,
                }"
              >
                <span class="self-center">{{ 11 - i }}</span>
              </span>
            </button>
          </div>
        </template>

        <hr class="border-transparent" />
        <p class="comment-cta">{{ t("rating.leaveComment") }} (optional)</p>
        <div class="w-full px-4 mb-4">
          <textarea
            v-model="comment"
            rows="3"
            class="comment-input"
            maxlength="100"
            :placeholder="t('rating.placeholder')"
          />
          <p v-if="comment.length > 0" class="text-right text-xs">
            {{ comment.length }}/100 {{ t("rating.characters") }}
          </p>
        </div>
        <hr class="border-transparent" />
        <div class="w-full">
          <p class="like-desc">{{ t("rating.didYouLike") }} (optional)</p>
          <div class="like-animation">
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
        <hr class="border-transparent" />
        <div class="submit-btn-wrapper">
          <button
            :disabled="
              !(
                ratingSexism != null &&
                ratingRacism != null &&
                ratingOthers != null &&
                ratingCringe != null
              )
            "
            class="submit-btn"
            @click="submitRating"
          >
            {{ t("rating.submit") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DislikeAnimation from "~/components/animations/DislikeAnimation.vue";
import LikeAnimation from "~/components/animations/LikeAnimation.vue";
import ThankyouAnimation from "~/components/animations/ThankyouAnimation.vue";
import { useI18n } from "vue-i18n";
import { useStore } from "~/stores/store";

const ratingSexism: Ref<null | number> = ref(null);
const ratingRacism: Ref<null | number> = ref(null);
const ratingOthers: Ref<null | number> = ref(null);
const ratingCringe: Ref<null | number> = ref(null);
const comment = ref("");
const submitted = ref(false);
const liked = ref(false);
const disliked = ref(false);
const animCompleted = ref(false);
const showConfirmationModal = ref(true);

const { t } = useI18n();
const router = useRouter();
const store = useStore();

const movie = computed(() => store.selectedMovie);

const categories = [
  {
    id: "sexism",
    ref: ratingSexism,
    label: "categories.sexism",
    desc: "rating.descSexism",
  },
  {
    id: "racism",
    ref: ratingRacism,
    label: "categories.racism",
    desc: "rating.descRacism",
  },
  {
    id: "others",
    ref: ratingOthers,
    label: "categories.others",
    desc: "rating.descOthers",
  },
  {
    id: "cringe",
    ref: ratingCringe,
    label: "categories.cringe",
    desc: "rating.descCringe",
  },
];

const setRating = (categoryRef: Ref<null | number>, rating: number) => {
  categoryRef.value = rating;
};

const submitRating = (event: Event) => {
  event.preventDefault();
  submitted.value = true;
  const data = {
    movieID: movie.value?.id,
    sexism: ratingSexism.value,
    racism: ratingRacism.value,
    others: ratingOthers.value,
    cringe: ratingCringe.value,
    comment: comment.value,
    like: liked.value,
    dislike: disliked.value,
    title: movie.value?.title,
    original_title: movie.value?.original_title,
  };

  fetch("https://www.triggerscore.netlify.app/.netlify/functions/postData", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

const handleLike = (value: boolean) => {
  liked.value = value;
  if (liked.value === true) {
    disliked.value = false;
  }
};

const handleDislike = (value: boolean) => {
  disliked.value = value;
  if (disliked.value === true) {
    liked.value = false;
  }
};

onMounted(() => {
  const ratings = document.getElementsByClassName("rating"); // for fixing issues with flex-end and overflow-hidden
  for (let i = 0; i < ratings.length; i++) {
    ratings[i]!.scrollLeft -= 500;
  }
});
</script>

<style scoped>
.ratings-section {
  @apply lg:flex lg:justify-center w-full md:pt-0;
}

.ratings-wrapper {
  @apply text-white md:rounded-b lg:rounded-t md:px-4;
}

.rated-movie-title {
  @apply font-semibold text-xl text-white py-6 px-4 lg:rounded-t;
}

.title-wrapper {
  @apply mx-auto overflow-hidden text-left;
}

.rating {
  direction: rtl;
}

.rating-btn {
  @apply w-12 h-12 p-1 text-center text-sm flex-none font-semibold text-white;
}

.rating-btn-background {
  @apply w-full h-full rounded-lg flex text-center justify-center font-semibold transition-all duration-200;
}

.rating-btns-wrapper {
  @apply max-w-full flex w-fit sm:justify-end ml-3 overflow-y-scroll sm:overflow-hidden mb-5;
}

.submit-btn-wrapper {
  @apply flex justify-start pt-8 pb-12 px-4 rounded-b-lg;
}

.submit-btn {
  @apply max-w-lg w-full bg-yellow-500 text-white disabled:opacity-50 font-semibold p-3 rounded-lg shadow-lg transition duration-300 hover:scale-105 hover:bg-yellow-600 uppercase;
}

.animation-wrapper {
  @apply fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-40 overflow-hidden;
}

.animation {
  @apply h-72 pt-12 bg-green-550 rounded;
}

.like-animation {
  @apply flex justify-center md:justify-center gap-4 mx-4 mt-4 max-w-lg;
}

.comment-cta {
  @apply my-4 text-lg font-semibold px-4 max-w-lg;
}

.comment-input {
  @apply w-full max-w-lg bg-gray-950 p-2 resize-none rounded-lg;
}

.like-desc {
  @apply my-4 text-lg font-semibold px-4 max-w-lg;
}

.submitted-info {
  @apply bg-green-550 text-white text-center text-2xl px-6 py-16 rounded-b lg:rounded h-72 lg:sticky lg:bottom-0;
}

.back-btn {
  @apply text-base bg-yellow-500 transition hover:bg-yellow-600 p-3 mt-6 rounded font-semibold text-white uppercase;
}

.category-divider {
  @apply border-gray-800 hidden md:block max-w-lg ml-4;
}

.category-label {
  @apply px-4 my-2 mt-6 block text-lg font-semibold;
}

.category-desc {
  @apply px-4 mb-4 max-w-lg;
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
