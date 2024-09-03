<template>
  <section
    class="bg-transparent text-white py-6 md:pt-4 md:pb-12 md:px-0 text-left text-sm mx-auto md:rounded flex flex-col gap-x-12"
  >
    <div class="w-full px-4 sm:px-0 mb-12">
      <div class="font-semibold w-full flex flex-col lg:flex-row lg:gap-16">
        <StatsOverview />
      </div>
    </div>
    <div
      v-if="store.triggerscores.length > 0 && !store.moviesLoading"
      class="w-full sm:max-w-xl lg:max-w-none sm:flex-wrap px-4 sm:px-0 pb-2 flex sm:justify-center overflow-auto hide-scrollbar sm:mx-auto"
    >
      <div>
        <h2 class="font-semibold mt-4 h-14 flex items-center pr-2">
          {{ t("stats.lowestScore") }}
        </h2>
        <MovieHighlightItem
          :scores="lowestScoreMovie"
          :movie="movie[0]"
          shownScore="rating_total"
          :loadItem="true"
        />
      </div>
      <div>
        <h2 class="font-semibold mt-4 h-14 flex items-center pr-2">
          {{ t("stats.highestScore") }}
        </h2>
        <MovieHighlightItem
          :scores="highestScoreMovie"
          :movie="movieHighest[0]"
          shownScore="rating_total"
          :loadItem="true"
        />
      </div>
      <div>
        <h2
          class="font-semibold mt-4 h-14 flex items-center pr-2 w-40"
          v-html="t('stats.mostRatings', [mostRatedMovie.ratings])"
        ></h2>
        <MovieHighlightItem
          :scores="mostRatedMovie"
          :movie="mostRated[0]"
          shownScore="rating_total"
          :loadItem="true"
        />
      </div>
      <div>
        <h2
          class="font-semibold mt-4 h-14 flex items-center pr-2 w-40"
          v-html="
            t('stats.mostComments', [
              mostCommentedMovie.comments.filter((comment) => {
                return comment.length > 3;
              }).length,
            ])
          "
        ></h2>
        <MovieHighlightItem
          :scores="mostCommentedMovie"
          :movie="mostCommented[0]"
          shownScore="rating_total"
          :loadItem="true"
        />
      </div>
      <div>
        <h2
          class="font-semibold mt-4 h-14 flex items-center pr-2 w-40"
          v-html="t('stats.mostLiked', [mostLikedMovie.likes])"
        ></h2>
        <MovieHighlightItem
          :scores="mostLikedMovie"
          :movie="mostLiked[0]"
          shownScore="rating_total"
          :loadItem="true"
        />
      </div>
      <div>
        <h2
          class="font-semibold mt-4 h-14 flex items-center pr-2 w-40"
          v-html="t('stats.mostDisliked', [mostDislikedMovie.dislikes])"
        ></h2>
        <MovieHighlightItem
          :scores="mostDislikedMovie"
          :movie="mostDisliked[0]"
          shownScore="rating_total"
          :loadItem="true"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store";
import { useI18n } from "vue-i18n";

const store = useStore();
store.setStats();

const { t } = useI18n();

const lowestScoreMovie: ComputedRef<any> = computed(() =>
  store.triggerscores.length > 0
    ? store.triggerscores.reduce(function (a: any, b: any) {
        return a.rating_total < b.rating_total ? a : b;
      })
    : undefined
);

const highestScoreMovie: ComputedRef<any> = computed(() =>
  store.triggerscores.length > 0
    ? store.triggerscores.reduce(function (a: any, b: any) {
        return a.rating_total > b.rating_total ? a : b;
      })
    : undefined
);
const mostRatedMovie = computed(() =>
  store.triggerscores.length > 0
    ? store.triggerscores.reduce(function (a: any, b: any) {
        return a.ratings > b.ratings ? a : b;
      })
    : undefined
);
const mostLikedMovie = computed(() =>
  store.triggerscores.length > 0
    ? store.triggerscores.reduce(function (a: any, b: any) {
        return a.likes > b.likes ? a : b;
      })
    : undefined
);
const mostDislikedMovie = computed(() =>
  store.triggerscores.length > 0
    ? store.triggerscores.reduce(function (a: any, b: any) {
        return a.dislikes > b.dislikes ? a : b;
      })
    : undefined
);
const mostCommentedMovie = computed(() =>
  store.triggerscores.length > 0
    ? store.triggerscores.reduce(function (a: any, b: any) {
        let filteredArrayA = 
        a.comments ? 
        a.comments.filter((comment: string) => {
          return comment.length > 3 }) : []
        
        let filteredArrayB = 
        b.comments ?
        b.comments.filter((comment: string) => {
          return comment.length > 3
        }) : []
        return filteredArrayA.length > filteredArrayB.length ? a : b;
      })
    : undefined
);
const movie = computed(() => {
  if (lowestScoreMovie.value) {
    return store.movies.filter(
      (movie: any) => movie.id == lowestScoreMovie.value!.movie_id
    );
  } else return {};
});
const movieHighest = computed(() => {
  if (highestScoreMovie.value) {
    return store.movies.filter(
      (movie) => movie.id == highestScoreMovie.value.movie_id
    );
  } else return {};
});
const mostRated = computed(() => {
  if (mostRatedMovie.value) {
    return store.movies.filter(
      (movie) => movie.id == mostRatedMovie.value.movie_id
    );
  } else return {};
});
const mostCommented = computed(() => {
  if (mostCommentedMovie.value) {
    return store.movies.filter(
      (movie) => movie.id == mostCommentedMovie.value.movie_id
    );
  } else return {};
});
const mostLiked = computed(() => {
  if (mostLikedMovie.value) {
    return store.movies.filter(
      (movie) => movie.id == mostLikedMovie.value.movie_id
    );
  } else return {};
});
const mostDisliked = computed(() => {
  if (mostDislikedMovie.value) {
    return store.movies.filter(
      (movie) => movie.id == mostDislikedMovie.value.movie_id
    );
  } else return {};
});
</script>
