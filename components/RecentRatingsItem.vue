<template>
  <NuxtLink
    :to="`movie/${movie.id}`"
    tag="div"
    class="movie-highlight-item bg-transparent text-white sm:rounded shadow-md flex flex-col relative border-b md:border-b-0 border-gray-800 cursor-pointer min-w-sm lg:hover:shadow-inner transform transition duration-300"
  >
    <div class="md:hidden sm:rounded-t p-3 pb-0 bg-transparent text-inherit">
      <div class="flex items-center gap-2 text-left">
        <div
          class="flex rounded-lg justify-center w-10 h-10 mr-2"
          :class="{
            'bg-red-700': scoreTotal >= 7,
            'bg-yellow-500': scoreTotal < 7 && scoreTotal >= 4,
            'bg-green-600': scoreTotal < 4,
          }"
        >
          <p class="self-center text-white text-lg font-semibold">
            {{ scoreTotal !== -1 ? scoreTotal : "-" }}
          </p>
        </div>
        <div class="w-9/12">
          <h3
            v-if="movie.title.length > 0"
            class="text-base font-semibold h-6 overflow-hidden whitespace-nowrap custom-headline"
          >
            {{ movie.title }}
          </h3>
          <h3 v-else class="text-base font-semibold overflow-hidden">
            {{ movie.original_title }}
          </h3>
          <div class="text-xs pt-1">
            <span>{{ movie.release_date.substring(0, 4) }}</span>
            <span class="mx-2">|</span>
            <span>{{ movie.runtime }} {{ $t("general.minutes") }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full px-3 md:px-0 pt-4 pb-3 gap-4 flex">
      <div class="relative hidden md:block">
        <img
          class="h-36 w-32 rounded-sm"
          :alt="movie.original_title"
          :src="poster2"
        />
        <div
          class="flex absolute top-1 right-1 rounded-lg justify-center w-12 h-12 bg-opacity-80"
          :class="{
            'bg-red-700': scoreTotal >= 7,
            'bg-yellow-500': scoreTotal < 7 && scoreTotal >= 4,
            'bg-green-600': scoreTotal < 4,
          }"
        >
          <p class="self-center text-white text-xl font-semibold">
            {{ scoreTotal !== -1 ? scoreTotal : "-" }}
          </p>
        </div>
        <div class="absolute bottom-0 right-0">
          <div
            v-if="totalRatings[0].ratings == 1"
            class="flex items-center w-16 h-16 relative rounded-full justify-center drop-shadow"
          >
            <NewAnimation />
          </div>
        </div>
      </div>

      <article class="text-left relative w-full h-full flex flex-col">
        <h3
          v-if="movie.title.length > 0"
          class="hidden md:block text-base mb-1 font-semibold h-6 overflow-hidden"
        >
          {{ movie.title }}
        </h3>
        <h3
          v-else
          class="hidden md:block text-base mb-1 font-semibold overflow-hidden"
        >
          {{ movie.original_title }}
        </h3>
        <div class="text-xs mb-1 py-1 hidden md:block">
          <span>{{ movie.release_date.substring(0, 4) }}</span>
          <span class="mx-2">|</span>
          <span>{{ movie.runtime }} {{ $t("general.minutes") }}</span>
        </div>
        <div class="grid grid-cols-2 text-sm max-w-xs mt-auto">
          <div class="flex my-1 text-sm">
            <div
              class="flex justify-center rounded-lg w-8 h-8 mr-2 bg-opacity-80"
              :class="{
                'bg-red-700': scores?.rating_sexism >= 7,
                'bg-yellow-500':
                  scores?.rating_sexism < 7 && scores?.rating_sexism >= 4,
                'bg-green-600': scores?.rating_sexism < 4,
              }"
            >
              <div class="self-center text-white">
                {{ scores?.rating_sexism }}
              </div>
            </div>
            <p class="self-center">{{ $t("categories.sexism") }}</p>
          </div>
          <div class="flex my-1 text-sm">
            <div
              class="flex rounded-lg justify-center w-8 h-8 mr-2 bg-opacity-80"
              :class="{
                'bg-red-700': scores?.rating_racism >= 7,
                'bg-yellow-500':
                  scores?.rating_racism < 7 && scores?.rating_racism >= 4,
                'bg-green-600': scores?.rating_racism < 4,
              }"
            >
              <div class="self-center text-white">
                {{ scores?.rating_racism }}
              </div>
            </div>
            <p class="self-center">{{ $t("categories.racism") }}</p>
          </div>
          <div class="flex my-1 text-sm">
            <div
              class="flex rounded-lg justify-center w-8 h-8 mr-2 bg-opacity-80"
              :class="{
                'bg-red-700': scores?.rating_others >= 7,
                'bg-yellow-500':
                  scores?.rating_others < 7 && scores?.rating_others >= 4,
                'bg-green-600': scores?.rating_others < 4,
              }"
            >
              <div class="self-center text-white">
                {{ scores?.rating_others }}
              </div>
            </div>
            <p class="self-center">{{ $t("categories.others") }}</p>
          </div>
          <div class="flex my-1 text-sm">
            <div
              class="flex rounded-lg justify-center w-8 h-8 mr-2 bg-opacity-80"
              :class="{
                'bg-red-700': scores?.rating_cringe >= 7,
                'bg-yellow-500':
                  scores?.rating_cringe < 7 && scores?.rating_cringe >= 4,
                'bg-green-600': scores?.rating_cringe < 4,
              }"
            >
              <div class="self-center text-white">
                {{ scores?.rating_cringe }}
              </div>
            </div>
            <p class="self-center">{{ $t("categories.cringe") }}</p>
          </div>
        </div>
      </article>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store";
import placeholderRatings from "~/assets/recentRatings.json";

const store = useStore();
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  scores: Object,
  id: {
    type: Number,
    required: true,
  },
});

const poster2 = computed(
  () =>
    `https://image.tmdb.org/t/p/original/${
      props.movie.poster_path ?? placeholderRatings[props.id].poster_path
    }`
);
const poster = computed(() => {
  if (props.movie.backdrop_path ?? placeholderRatings[props.id].backdrop_path) {
    return `https://image.tmdb.org/t/p/original/${props.movie.backdrop_path}`;
  } else return "/images/film-poster-placeholder.png";
});
const scoreAvailable = computed(() => props.scores !== undefined);
const scoreTotal: ComputedRef<number> = computed(() => {
  if (scoreAvailable.value) {
    return (
      Math.floor(
        ((props.scores?.rating_sexism +
          props.scores?.rating_racism +
          props.scores?.rating_others) /
          3) *
          10
      ) / 10
    );
  } else return -1;
});
const totalRatings = computed(() =>
  store.triggerscores.filter((movie) => movie.movie_id == props.movie.id)
);
</script>

<style>
.custom-headline {
  width: calc(100% - 10px);
  text-overflow: ellipsis;
}
.drop-shadow {
  filter: drop-shadow(0 1px 0px white) drop-shadow(1px 0px 0px white)
    drop-shadow(-1px 0px 0px white) drop-shadow(0 -1px 0px white);
}
</style>
