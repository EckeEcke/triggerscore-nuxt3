<template>
  <Searchbox show-title />
  <LoadingAnimation v-show="isLoading" />
  <template v-if="!isLoading">
    <MovieHighlightsContainer
      :movies="store.bondMovies"
      shown-score="rating_total"
      :title="t('highlights.headline1')"
      :sub-title="t('highlights.copy1')"
      more-spacing
      class="xl:w-10/12"
    />
    <section class="container mb-12 px-0 sm:px-4 mx-auto xl:w-10/12">
      <NewestRatingsHeader />
      <div class="recently-added-wrapper">
        <div class="recent-ratings">
          <RecentRatingsItem
            v-for="(rating, index) in store.recentRatings"
            :id="index"
            :key="index"
            :movie="rating"
            :scores="store.recentScores[index]"
          />
        </div>
        <div class="recent-comments">
          <h3 class="text-2xl font-semibold my-8">
            {{ t("general.recentComments") }}
          </h3>
          <RecentComments />
        </div>
      </div>
    </section>
    <section>
      <Top10Header />
      <MovieHighlightsContainer
        v-for="movie in movieHighlights"
        :key="movie.title"
        :movies="movie.movies"
        :shown-score="movie.shownScore"
        :title="movie.title"
        :sub-title="movie.subTitle"
        :show-border="movie.showBorder"
      />
    </section>
    <section class="container definition-wrapper">
      <DefinitionTriggered />
    </section>
    <section class="mb-4 mt-32 container xl:w-10/12 mx-auto">
      <QuizDisturber />
    </section>
    <section class="container all-movies-disturber">
      <AllMoviesDisturber />
    </section>
  </template>
</template>

<script setup lang="ts">
import AllMoviesDisturber from "~/components/AllMoviesDisturber.vue";
import Top10Header from "~/components/Top10Header.vue";
import NewestRatingsHeader from "~/components/NewestRatingsHeader.vue";
import QuizDisturber from "~/components/QuizDisturber.vue";
import { useStore } from "~/stores/store";
import LoadingAnimation from "~/components/animations/LoadingAnimation.vue";

const { t } = useI18n();
const store = useStore();

const isLoading = computed(
  () =>
    store.highlightsLoading ||
    store.moviesLoading ||
    store.triggerscores.length == 0 ||
    store.loadingSelectedMovie,
);

const movieHighlights = computed(() => [
  {
    movies: store.top10Sexism,
    shownScore: "rating_sexism" as ScoreKey,
    title: t("highlights.headline2"),
    subTitle: t("highlights.copy2"),
    showBorder: false,
  },
  {
    movies: store.top10Racism,
    shownScore: "rating_racism" as ScoreKey,
    title: t("highlights.headline3"),
    subTitle: t("highlights.copy3"),
    showBorder: true,
  },
  {
    movies: store.top10Others,
    shownScore: "rating_others" as ScoreKey,
    title: t("highlights.headline4"),
    subTitle: t("highlights.copy4"),
    showBorder: true,
  },
  {
    movies: store.top10Cringe,
    shownScore: "rating_cringe" as ScoreKey,
    title: t("highlights.headline5"),
    subTitle: t("highlights.copy5"),
    showBorder: true,
  },
]);

useSeoMeta({
  title: "Triggerscore - rating movies based on triggering potential",
  description:
    "Triggerscore offers a new way of watching old movies from back in the day: could this movie still be made like this nowadays? Or would it cause a huge sh*tstorm?",
  author: "Christian Eckardt",
  ogTitle: "Triggerscore - rating movies based on triggering potential",
  ogDescription:
    "Triggerscore offers a new way of watching old movies from back in the day: could this movie still be made like this nowadays? Or would it cause a huge sh*tstorm?",
  ogUrl: () => `https://www.triggerscore.netlify.app/`,
  ogType: "website",
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1.0",
});
</script>

<style scoped>
.definition-wrapper {
  @apply rounded p-4 py-8 sm:p-12 my-4 xl:w-10/12 mx-auto bg-gradient-to-r from-gray-950 to-gray-800 text-white text-left;
}

.all-movies-disturber {
  @apply xl:w-10/12 mx-auto px-4 my-12 sm:my-24;
}

.recently-added-wrapper {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 justify-start items-center;
}

.recent-ratings {
  @apply grid grid-cols-1 sm:grid-cols-2 sm:gap-8 col-span-2 justify-start;
}

.recent-comments {
  @apply text-left text-white px-4 sm:px-0 col-span-2 lg:col-span-1;
}

@media (min-width: 768px) {
  .recent-ratings {
    grid-auto-rows: min(10rem, 100%);
  }
}
</style>
