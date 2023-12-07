<template>
  <client-only>
    <div class="container hidden lg:block sm:px-4 xl:w-10/12 mx-auto">
      <div class="text-left pt-4 lg:pt-0 pb-5">
        <h2 class="text-2xl md:text-3xl font-semibold mb-2 text-white">
          {{ $t("index.headline") }}
        </h2>
        <p class="text-sm text-white">
          {{ $t("index.intro1") }}
          <span
            class="text-yellow-500 transition hover:text-yellow-600 font-semibold cursor-pointer"
            @click="focusSearch"
          >
            {{ $t("index.search") }}
          </span>
          {{ $t("index.intro2") }}
        </p>
      </div>
      <div class="px-0 py-4 rounded-b text-white">
        <div class="flex items-end justify-between">
          <div class="flex">
            <div class="w-52 mr-4">
              <h2 class="font-semibold text-left mb-2">
                {{ $t("filter.sort") }}
              </h2>
              <div class="flex w-full my-3 border border-gray-200 rounded">
                <select
                  v-model="store.sortingOption"
                  class="w-full h-8 md:h-10 bg-white rounded p-2 outline-none text-sm md:text-base text-black"
                >
                  <option class="py-1" value="a-z">
                    {{ $t("filter.AtoZ") }}
                  </option>
                  <option class="py-1" value="z-a">
                    {{ $t("filter.ZtoA") }}
                  </option>
                  <option class="py-1" value="date-desc">
                    {{ $t("filter.yearDesc") }}
                  </option>
                  <option class="py-1" value="date-asc">
                    {{ $t("filter.yearAsc") }}
                  </option>
                  <option class="py-1" value="ts-desc">
                    {{ $t("filter.scoreDesc") }}
                  </option>
                  <option class="py-1" value="ts-asc">
                    {{ $t("filter.scoreAsc") }}
                  </option>
                </select>
              </div>
            </div>
            <div class="w-52">
              <h2 class="font-semibold text-left mb-2">
                {{ $t("filter.chooseScore") }}
              </h2>
              <div class="flex w-full my-3 border border-gray-200 rounded">
                <select
                  v-model="store.shownScore"
                  class="w-full h-8 md:h-10 bg-white rounded p-2 outline-none text-sm md:text-base text-black"
                >
                  <option class="py-1" value="rating_total">
                    {{ $t("categories.totalScore") }}
                  </option>
                  <option class="py-1" value="rating_sexism">
                    {{ $t("categories.sexism") }}
                  </option>
                  <option class="py-1" value="rating_racism">
                    {{ $t("categories.racism") }}
                  </option>
                  <option class="py-1" value="rating_others">
                    {{ $t("categories.others") }}
                  </option>
                  <option class="py-1" value="rating_cringe">
                    {{ $t("categories.cringe") }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="flex h-24 flex-col">
            <h2 class="font-semibold text-left mt-2 mb-7">
              {{ $t("filter.filterByScore") }}
            </h2>
            <Rangeslider />
          </div>
          <div class="">
            <h2 class="font-semibold text-left">
              {{ $t("filter.filterByRelease") }}
            </h2>
            <div class="flex">
              <div class="w-1/2 mr-2 flex flex-col my-3">
                <input
                  v-model="store.filterMoviesByYearMin"
                  type="number"
                  id="filter-start"
                  class="border border-gray-200 rounded w-20 p-2 text-center h-10 text-black"
                  min="1900"
                  max="2010"
                  :placeholder="$t('filter.from')"
                  @input="scrollToTop"
                />
              </div>
              <div class="w-1/2 mr-2 flex flex-col my-3">
                <input
                  v-model="store.filterMoviesByYearMax"
                  type="number"
                  id="filter-end"
                  class="border border-gray-200 rounded w-20 p-2 text-center h-10 text-black"
                  min="1900"
                  max="2010"
                  :placeholder="$t('filter.to')"
                  @input="scrollToTop"
                />
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between items-center">
          <div class="gap-4">
            <div class="flex items-center -mb-3">
              <div class="form-check text-left mb-1 h-8 mr-8">
                <input
                  v-model="netflixFilter"
                  class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer accent-yellow-500"
                  type="checkbox"
                  id="filter-netflix"
                  @change="
                    store.filterMoviesByNetflix = !store.filterMoviesByNetflix
                  "
                />
                <label
                  class="form-check-label inline-block text-gray-800 text-left"
                  for="filter-netflix"
                >
                  <img
                    alt="Logo Netflix"
                    class="h-4 mt-1 mx-2"
                    src="../assets/images/netflix-logo.svg"
                  />
                </label>
              </div>
              <div class="form-check text-left mb-1 h-8 mr-8">
                <input
                  v-model="primeFilter"
                  class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer accent-yellow-500"
                  type="checkbox"
                  id="filter-amazon"
                  @change="
                    store.filterMoviesByPrime = !store.filterMoviesByPrime
                  "
                />
                <label
                  class="form-check-label inline-block text-gray-800 text-left"
                  for="filter-amazon"
                >
                  <img
                    alt="Logo Prime Video"
                    class="h-5 mt-1 mx-2"
                    src="../assets/images/amazon-prime-logo3.png"
                  />
                </label>
              </div>
              <div class="form-check text-left mb-1 mr-8 h-8">
                <input
                  v-model="disneyFilter"
                  class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer accent-yellow-500"
                  type="checkbox"
                  id="filter-disney"
                  @change="
                    store.filterMoviesByDisney = !store.filterMoviesByDisney
                  "
                />
                <label
                  class="form-check-label inline-block text-gray-800 text-left"
                  for="filter-disney"
                >
                  <img
                    alt="Logo Disney Plus"
                    class="h-7 ml-2 mb-1"
                    src="../assets/images/disney+-logo2.svg"
                  />
                </label>
              </div>
              <div class="form-check text-left mb-1 h-8">
                <input
                  v-model="skyFilter"
                  class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer accent-yellow-500"
                  type="checkbox"
                  id="filter-disney"
                  @change="store.filterMoviesBySky = !store.filterMoviesBySky"
                />
                <label
                  class="form-check-label inline-block text-gray-800 text-left"
                  for="filter-disney"
                >
                  <img
                    alt="Logo WOW"
                    class="h-4 mt-1 ml-2"
                    src="../assets/images/sky-logo.svg"
                  />
                </label>
              </div>
            </div>
          </div>
          <div class="font-semibold p-3 ml-auto mr-4">
            {{ results }} {{ $t("filter.results") }}
          </div>
          <button
            class="font-semibold p-3 w-auto text-white uppercase"
            @click="resetFilter"
          >
            {{ $t("filter.resetFilter") }}
          </button>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t, locale } = useI18n();

const searchText = computed(() => t("index.intro"));
const netflixFilter = ref(store.filterMoviesByNetflix);
const primeFilter = computed(() => store.filterMoviesByPrime);
const disneyFilter = computed(() => store.filterMoviesByDisney);
const skyFilter = computed(() => store.filterMoviesBySky);
const sortingOption = computed(() => store.sortingOption);
const filterMin = computed(() => store.filterMoviesByYearMin);
const filterMax = computed(() => store.filterMoviesByYearMax);
const results = computed(() => store.filteredMovies.length);
const shownScore = computed(() => store.shownScore);

watch(
  () => store.filterMoviesByNetflix,
  (currentValue, oldValue) => {
    store.filterMovies(locale.value);
  }
);

watch(
  () => store.filterMoviesByPrime,
  (currentValue, oldValue) => {
    store.filterMovies(locale.value);
  }
);

watch(
  () => store.filterMoviesByDisney,
  (currentValue, oldValue) => {
    store.filterMovies(locale.value);
  }
);

watch(
  () => store.filterMoviesBySky,
  (currentValue, oldValue) => {
    store.filterMovies(locale.value);
  }
);

watch(
  () => store.sortingOption,
  (currentValue, oldValue) => {
    store.filterMovies(locale.value);
  }
);

watch(
  () => store.filterMoviesByYearMin,
  (currentValue, oldValue) => {
    store.filterMovies(locale.value);
  }
);

watch(
  () => store.filterMoviesByYearMax,
  (currentValue, oldValue) => {
    store.filterMovies(locale.value);
  }
);

watch(
  () => store.shownScore,
  (currentValue, oldValue) => {
    store.filterMovies(locale.value);
  }
);

function resetFilter() {
  store.resetFilter();
  store.filterMovies(locale.value);
}
function focusSearch() {
  const search = document.getElementById("search");
  search!.scrollIntoView({ block: "start" });
  search!.focus();
}
function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>
