import { defineStore } from "pinia"
import placeholderTriggerscores from "~/assets/triggerscores.json"
import placeholderBondMovies from "~/assets/bondMovies.json"
import type { Movie } from "~/types/movie"

function sortAtoZ(x: Movie, y: Movie): 1 | -1 | 0 {
  const titleX = x.title ? x.title : x.original_title
  const titleY = y.title ? y.title : y.original_title
  if (titleX < titleY) {
    return -1
  }
  if (titleX > titleY) {
    return 1
  }
  return 0
}

function sortZtoA(x: Movie, y: Movie) {
  const titleX = x.title ? x.title : x.original_title
  const titleY = y.title ? y.title : y.original_title
  if (titleX > titleY) {
    return -1
  }
  if (titleX < titleY) {
    return 1
  }
  return 0
}

function sortByDateDesc(x: Movie, y: Movie) {
  return Number(new Date(y.release_date as any)) - Number(new Date(x.release_date as any))
}

function sortByDateAsc(
  x: { release_date: number },
  y: { release_date: number }
) {
  return Number(new Date(x.release_date)) - Number(new Date(y.release_date))
}

function sortByTsDesc(array: any[], key: string): any {
  return function (x: { id: number }, y: { id: number }) {
    const triggerscoreX =
      array[
        array.map((score: { movie_id: number }) => score.movie_id).indexOf(x.id)
      ][key]
    const triggerscoreY =
      array[
        array.map((score: { movie_id: number }) => score.movie_id).indexOf(y.id)
      ][key]
    if (triggerscoreX > triggerscoreY) {
      return -1
    }
    if (triggerscoreX < triggerscoreY) {
      return 1
    }
  }
}

function sortByTsAsc(array: any[], key: any): any {
  return function (x: { id: string }, y: { id: string }): any {
    const triggerscoreX =
      array[array.map((score: any) => score.movie_id).indexOf(x.id)][key]
    const triggerscoreY =
      array[
        array.map((score: { movie_id: string }) => score.movie_id).indexOf(y.id)
      ][key]
    if (triggerscoreX < triggerscoreY) {
      return -1
    }
    if (triggerscoreX > triggerscoreY) {
      return 1
    }
  }
}

function adjustLocale(locale: string) {
  if (locale == "us") {
    return "en"
  }
  return locale
}

export const useStore = defineStore({
  id: "store",
  state: () => {
    return {
      triggerscores: placeholderTriggerscores,
      movies: [],
      selectedMovie: undefined,
      loadingSelectedMovie: false,
      providerData: {
        netflix: [],
        prime: [],
        disney: [],
        sky: [],
      },
      selectedMovieScore: undefined,
      recentRatings: [],
      recentComments: [],
      recentScores: [],
      filteredMovies: [] as any[],
      searchInput: "",
      searchTerm: "",
      searchResults: [],
      searchError: false,
      bondMovies: placeholderBondMovies,
      bondMovieIDs: [
        646, 657, 658, 660, 667, 668, 681, 253, 682, 691, 698, 699, 700, 707,
        708, 709, 710, 714, 36643, 36669,
      ],
      filterMoviesByYearMin: 1900,
      filterMoviesByYearMax: 2011,
      filterMoviesByNetflix: false,
      filterMoviesByPrime: false,
      filterMoviesByDisney: false,
      filterMoviesBySky: false,
      sortingOption: "a-z",
      highlightsLoading: true,
      moviesLoading: true,
      shownScore: "rating_total",
      top10Sexism: [],
      top10Racism: [],
      top10Others: [],
      top10Cringe: [],
      stats: [],
      minScore: 0,
      maxScore: 10,
      isFiltering: false,
    }
  },
  actions: {
    async setTriggerscores(locale: string) {
      if (process.client && localStorage.getItem("store")) {
        this.moviesLoading = false
      } //also loads movies for now
      const scores = await fetch('https://www.triggerscore.de/.netlify/functions/fetchScores')
      const triggerscores = await scores.json()
      this.triggerscores = triggerscores
      const loadedMovies = await fetch(`https://www.triggerscore.de/.netlify/functions/fetchMovies?locale=${locale}`)
      const movies = await loadedMovies.json()
      this.movies = movies
      this.moviesLoading = false
    },
    async setRecentRatings(locale: string) {
      const data = await fetch('https://www.triggerscore.de/.netlify/functions/fetchRecentRatings') 
      if (!data.ok) { 
        throw new Error('Network response was not ok')
      }
      const ratings = await data.json()
      this.recentScores = ratings
      const recentRatings = Promise.all(
        ratings.map((entry: any) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${entry.movie_id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${locale}`
          )
            .then((res) => res.json())
            .catch(() => console.log("oopsy"))
        )
      )
      recentRatings.then((res: any) => (this.recentRatings = res))
    },
    async setRecentComments() {
      const data = await fetch('https://www.triggerscore.de/.netlify/functions/fetchRecentComments')
      const comments = await data.json()
      this.recentComments = comments
    },
    async setTop10Sexism(locale: string) {
      const data = await fetch('https://www.triggerscore.de/.netlify/functions/fetchTop10Sexism')
      const top10 = await data.json()
      const loadedTop10 = Promise.all(
        top10.map((entry: any) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${entry.movie_id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${locale}`
          )
            .then((res) => res.json())
            .catch(() => console.log("oopsy"))
        )
      )
      loadedTop10.then((res: any) => (this.top10Sexism = res))
    },
    async setTop10Racism(locale: string) {
      const scores = await fetch('https://www.triggerscore.de/.netlify/functions/fetchTop10Racism')
      const top10 = await scores.json()
      const loadedTop10 = Promise.all(
        top10.map((entry: any) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${entry.movie_id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${locale}`
          )
            .then((res) => res.json())
            .catch(() => console.log("oopsy"))
        )
      )
      loadedTop10.then((res: any) => (this.top10Racism = res))
    },
    async setTop10Others(locale: string) {
      const scores = await fetch('https://www.triggerscore.de/.netlify/functions/fetchTop10Others')
      const top10 = await scores.json()
      const loadedTop10 = Promise.all(
        top10.map((entry: any) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${entry.movie_id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${locale}`
          )
            .then((res) => res.json())
            .catch(() => console.log("oopsy"))
        )
      )
      loadedTop10.then((res: any) => (this.top10Others = res))
    },
    async setTop10Cringe(locale: string) {
      const scores = await fetch('https://www.triggerscore.de/.netlify/functions/fetchTop10Cringe')
      const top10 = await scores.json()
      const loadedTop10 = Promise.all(
        top10.map((entry: any) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${entry.movie_id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${locale}`
          )
            .then((res) => res.json())
            .catch(() => console.log("oopsy"))
        )
      )
      loadedTop10.then((res: any) => (this.top10Cringe = res))
    },
    async setStats() {
      const response = await fetch('https://www.triggerscore.de/.netlify/functions/fetchStats')
      const stats = await response.json()
      this.stats = stats
    },
    setSearchInput(state: any, payload: any) {
      this.searchInput = payload
    },
    setSearchTerm(payload: any) {
      this.searchTerm = payload
    },
    async setSearchResults() {
      this.searchResults = []
      this.searchError = false
      this.searchTerm = this.searchInput
      const adjustedLocale = "en"
      const fetchedSearchResults = fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${adjustedLocale}&include_adult=false&page=1&query=${this.searchTerm}`
      )
        .then((res) => res.json())
        .catch((error) => console.log(error))
      fetchedSearchResults.then((res) => {
        let filteredResults = res.results.filter((result: any) => {
          return (
            result.poster_path &&
            result.overview &&
            result.release_date &&
            parseInt(result.release_date.substring(0, 4)) <= 2017
          )
        })
        // filter search results to not show garbage entries
        this.searchResults = filteredResults
        if (this.searchResults.length == 0) {
          this.searchError = true
        }
      })
    },
    async searchMore(page: number, locale: string) {
      const searchTerm = this.searchTerm
      const adjustedLocale = adjustLocale(locale) // turns US locale into EN for search request
      const fetchedSearchResults = fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${adjustedLocale}&include_adult=false&page=${page}&query=${searchTerm}`
      )
        .then((res) => res.json())
        .catch((error) => console.log(error))
      fetchedSearchResults.then((res) => {
        let filteredResults = res.results.filter((result: any) => {
          return (
            result.poster_path &&
            result.overview &&
            result.release_date &&
            parseInt(result.release_date.substring(0, 4)) <= 2017
          )
        })
        // filter search results to not show garbage entries
        let currentSearchResults: any = this.searchResults
        filteredResults.map((entry: any) => currentSearchResults.push(entry))
        this.searchResults = currentSearchResults
        if (this.searchResults.length === 0) {
          this.searchError = true
        }
      })
    },
    resetSearch() {
      this.searchError = false
    },
    setSearchError(payload: any) {
      this.searchError = payload
    },
    async setBondMovies(locale: string) {
      const data = await fetch(`https://www.triggerscore.de/api/bondMovies?locale=${locale}`)
      const bondMovieData = await data.json()
      this.bondMovies = bondMovieData
      this.highlightsLoading = false
    },
    async filterMovies(locale: string) {
      this.isFiltering = true
      this.sortMovies(
        this.sortingOption,
        this.movies,
        this.triggerscores,
        this.shownScore
      )
      this.filterByYear(
        this.filterMoviesByYearMax,
        this.filterMoviesByYearMin,
        this.filteredMovies
      )
      this.filterByScore(
        this.filteredMovies,
        this.triggerscores,
        this.minScore,
        this.maxScore,
        this.shownScore
      )
      this.filterByProvider()
      this.isFiltering = false
    },
    resetFilter() {
      this.filterMoviesByPrime = false
      this.filterMoviesByNetflix = false
      this.filterMoviesByDisney = false
      this.filterMoviesBySky = false
      this.filterMoviesByYearMin = 0
      this.filterMoviesByYearMax = 2100
      this.minScore = 0
      this.maxScore = 10
    },
    setSortingOption(state: any, payload: any) {
      this.sortingOption = payload
    },
    setMovieYearMin(state: any, payload: any) {
      this.filterMoviesByYearMin = payload
    },
    setMovieYearMax(state: any, payload: any) {
      this.filterMoviesByYearMax = payload
    },
    setShownScore(state: any, payload: any) {
      this.shownScore = payload
    },
    setMinScore(state: any, payload: any) {
      this.minScore = payload
    },
    setMaxScore(state: any, payload: any) {
      this.maxScore = payload
    },
    setIsFiltering(payload: any) {
      this.isFiltering = payload
    },
    sortMovies(
      sortingOption: string,
      array: any[],
      triggerscores: any[],
      shownScore: string
    ) {
      let clonedArray = [...array]
      if (sortingOption == "a-z") {
        clonedArray = clonedArray.sort(sortAtoZ)
      }
      if (sortingOption == "z-a") {
        clonedArray = clonedArray.sort(sortZtoA)
      }
      if (sortingOption == "date-desc") {
        clonedArray = clonedArray.sort(sortByDateDesc)
      }
      if (sortingOption == "date-asc") {
        clonedArray = clonedArray.sort(sortByDateAsc)
      }
      if (sortingOption == "ts-desc") {
        clonedArray = clonedArray.sort(sortByTsDesc(triggerscores, shownScore))
      }
      if (sortingOption == "ts-asc") {
        clonedArray = clonedArray.sort(sortByTsAsc(triggerscores, shownScore))
      }
      this.filteredMovies = clonedArray
    },
    filterByYear(filterMax: number, filterMin: number, array: any[]) {
      let clonedArray = [...array]
      if (filterMin != null && filterMin >= 1900 && filterMin <= 2011) {
        clonedArray = clonedArray.filter(
          (movie: any) => Number(movie.release_date.slice(0, 4)) >= filterMin
        )
      }
      if (filterMax != null && filterMax >= 1900 && filterMax <= 2011) {
        clonedArray = clonedArray.filter(
          (movie: any) =>
            Number(movie.release_date.slice(0, 4)) <= filterMax + 1
        )
      }
      this.filteredMovies = clonedArray
    },
    filterByScore(
      array: any[],
      triggerscores: any[],
      min: number,
      max: number,
      shownScore: string
    ) {
      let clonedArray = [...array]
      let clonedScores = [...triggerscores]
      clonedScores = clonedScores.filter((score) => {
        return score[shownScore] >= min && score[shownScore] <= max
      })
      clonedArray = clonedArray.filter((movie: { id: number }) => {
        return (
          clonedScores
            .map((score: { movie_id: number }) => score.movie_id)
            .indexOf(movie.id) > -1
        )
      })
      this.filteredMovies = clonedArray
    },
    async loadProviderData(locale: string) {
      const data = await fetch(`https://www.triggerscore.de/.netlify/functions/fetchProviders?locale=${locale}`)
      const providerData = await data.json()
      this.providerData = providerData
    },
    async filterByProvider() {
      if (!this.filterMoviesByNetflix && !this.filterMoviesByPrime && !this.filterMoviesByDisney && !this.filterMoviesBySky) {
        return
      }
      const clonedArray = [...this.filteredMovies]
      const validIds: number[] = []
      if (this.filterMoviesByNetflix) validIds.push(...this.providerData.netflix)
      if (this.filterMoviesByPrime) validIds.push(...this.providerData.prime)
      if (this.filterMoviesByDisney) validIds.push(...this.providerData.disney)
      if (this.filterMoviesBySky) validIds.push(...this.providerData.sky)
      this.filteredMovies = clonedArray.filter((movie: any) => validIds.includes(movie.id))
    }
  },
  getters: {
    getTriggerscores: (state) => state.triggerscores,
    getMovies: (state) => state.movies,
    getRecentRatings: (state) => state.recentRatings,
    getSearchInput: (state) => state.searchInput,
    getSearchTerm: (state) => state.searchTerm,
    getSearchResults: (state) => state.searchResults,
    getSearchError: (state) => state.searchError,
    getBondMovies: (state) => state.bondMovies,
    getBondMovieIDs: (state) => state.bondMovieIDs,
    getFilteredMovies: (state) => state.filteredMovies,
    getSortingOption: (state) => state.sortingOption,
    getHighlightsLoading: (state) => state.highlightsLoading,
    getMoviesLoading: (state) => state.moviesLoading,
    getShownScore: (state) => state.shownScore,
    getTop10Sexism: (state) => state.top10Sexism,
    getTop10Racism: (state) => state.top10Racism,
    getTop10Others: (state) => state.top10Others,
    getTop10Cringe: (state) => state.top10Cringe,
    getRecentScores: (state) => state.recentScores,
    getStats: (state) => state.stats,
    getIsFiltering: (state) => state.isFiltering,
    getSelectedMovie: (state) => state.selectedMovie,
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
