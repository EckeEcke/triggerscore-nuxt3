import { defineStore } from 'pinia'
import type { Movie } from '~/types/movie'
import placeholderTriggerscores from '~/assets/triggerscores.json'
import placeholderBondMovies from '~/assets/bondMovies.json'

export type ScoreKey = 'rating_total' | 'rating_sexism' | 'rating_racism' | 'rating_others' | 'rating_cringe'


export interface TriggerScore {
    id: number,
    movie_id: number,
    rating_sexism: number,
    rating_racism: number,
    rating_others: number,
    rating_cringe: number,
    comment?: string,
    liked?: number,
    disliked?: number,
    rating_total: number,
    ratings: number,
    comments: string[],
    likes: number,
    dislikes: number
}

interface ProviderData {
    netflix: number[]
    prime: number[]
    disney: number[]
    sky: number[]
}

interface Stats {
    totalMovies?: number
    totalRatings?: number
    averageScore?: number
}

interface RecentRating {
    movie_id: number
    rating: number
    created_at: string
}

interface RecentComment {
    id: number
    movie_id: number
    comment: object
    created_at: string
}

interface StoreState {
    triggerscores: TriggerScore[]
    movies: Movie[]
    selectedMovie: Movie | undefined
    loadingSelectedMovie: boolean
    providerData: ProviderData
    selectedMovieScore: TriggerScore | undefined
    recentRatings: Movie[]
    recentComments: RecentComment[]
    recentScores: RecentRating[]
    filteredMovies: Movie[]
    searchInput: string
    searchTerm: string
    searchResults: Movie[]
    searchError: boolean
    bondMovies: Movie[]
    bondMovieIDs: number[]
    filterMoviesByYearMin: number
    filterMoviesByYearMax: number
    filterMoviesByNetflix: boolean
    filterMoviesByPrime: boolean
    filterMoviesByDisney: boolean
    filterMoviesBySky: boolean
    sortingOption: string
    highlightsLoading: boolean
    moviesLoading: boolean
    shownScore: ScoreKey
    top10Sexism: Movie[]
    top10Racism: Movie[]
    top10Others: Movie[]
    top10Cringe: Movie[]
    stats: Stats | undefined
    minScore: number
    maxScore: number
    isFiltering: boolean
    isMaintenanceMode: boolean
    isFullscreen: boolean
}

const apiBaseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8888/.netlify/functions'
  : 'https://www.triggerscore.de/.netlify/functions'

const sortAtoZ = (x: Movie, y: Movie): 1 | -1 | 0 => {
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

const sortZtoA = (x: Movie, y: Movie) => {
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

const sortByDateDesc = (x: Movie, y: Movie) => Number(new Date(y.release_date)) - Number(new Date(x.release_date))

const sortByDateAsc =(
  x: { release_date: number },
  y: { release_date: number }
) => Number(new Date(x.release_date)) - Number(new Date(y.release_date))

const sortByTsDesc = (array: TriggerScore[], key: ScoreKey) =>
    (x: { id: number }, y: { id: number }) => {
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

const sortByTsAsc = (array: TriggerScore[], key: ScoreKey) =>
  (x: { id: number }, y: { id: number }) => {
    const triggerscoreX =
      array[array.map((score) => score.movie_id).indexOf(x.id)][key]
    const triggerscoreY =
      array[
        array.map((score: { movie_id: number }) => score.movie_id).indexOf(y.id)
      ][key]
    if (triggerscoreX < triggerscoreY) {
      return -1
    }
    if (triggerscoreX > triggerscoreY) {
      return 1
    }
}

const adjustLocale = (locale: string) => {
  if (locale == 'us') {
    return 'en'
  }
  return locale
}

export const useStore = defineStore({
  id: 'store',
  state: (): StoreState => {
    return {
      triggerscores: placeholderTriggerscores as TriggerScore[],
      movies: [] as Movie[],
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
      filteredMovies: [],
      searchInput: '',
      searchTerm: '',
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
      sortingOption: 'a-z',
      highlightsLoading: true,
      moviesLoading: true,
      shownScore: 'rating_total',
      top10Sexism: [],
      top10Racism: [],
      top10Others: [],
      top10Cringe: [],
      stats: undefined,
      minScore: 0,
      maxScore: 10,
      isFiltering: false,
      isMaintenanceMode: false,
      isFullscreen: false,
    }
  },
  actions: {
    async setTriggerscores(locale: string) {
      const response = await fetch(`${apiBaseUrl}/fetchScoresAndTop10sAndStats`)
      const scoresAndTop10s = await response.json()
      this.triggerscores = scoresAndTop10s.scores
      this.setTop10Cringe(locale, scoresAndTop10s.top10s.cringe.map((score: TriggerScore) => score.movie_id))
      this.setTop10Others(locale, scoresAndTop10s.top10s.others.map((score: TriggerScore) => score.movie_id))
      this.setTop10Racism(locale, scoresAndTop10s.top10s.racism.map((score: TriggerScore) => score.movie_id))
      this.setTop10Sexism(locale, scoresAndTop10s.top10s.sexism.map((score: TriggerScore) => score.movie_id))
      this.setStats(scoresAndTop10s.stats)
      this.setRecentRatings(locale, scoresAndTop10s.recentRatings)
      this.setRecentComments(scoresAndTop10s.recentComments)
      const loadedMovies = await fetch(`${apiBaseUrl}/fetchMovies?locale=${locale}`)
      this.movies = await loadedMovies.json()
      this.moviesLoading = false
    },
    async setRecentRatings(locale: string, ratings: RecentRating[]) {
      this.recentScores = ratings
      if (!ratings) return
      const recentRatings = Promise.all(
        ratings.map((entry) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${entry.movie_id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${locale}`
          )
            .then((res) => res.json())
            .catch(() => console.log('oopsy'))
        )
      )
      recentRatings.then((res: Movie[]) => (this.recentRatings = res))
    },
    async setRecentComments(comments: Array<RecentComment>) {
      this.recentComments = comments
    },
    async setTop10Sexism(locale: string, movieIds: number[]) {
      if (!movieIds) return
      const loadedTop10 = Promise.all(
        movieIds.map((id) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${locale}`
          )
            .then((res) => res.json())
            .catch(() => console.log('oopsy'))
        )
      )
      loadedTop10.then((res: Movie[]) => (this.top10Sexism = res))
    },
    async setTop10Racism(locale: string, movieIds: number[]) {
      if (!movieIds) return
      const loadedTop10 = Promise.all(
        movieIds.map((id) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${locale}`
          )
            .then((res) => res.json())
            .catch(() => console.log('oopsy'))
        )
      )
      loadedTop10.then((res: Movie[]) => (this.top10Racism = res))
    },
    async setTop10Others(locale: string, movieIds: number[]) {
      if (!movieIds) return
      const loadedTop10 = Promise.all(
        movieIds.map((id) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${locale}`
          )
            .then((res) => res.json())
            .catch(() => console.log('oopsy'))
        )
      )
      loadedTop10.then((res: Movie[]) => (this.top10Others = res))
    },
    async setTop10Cringe(locale: string, movieIds: number[]) {
      if (!movieIds) return
      const loadedTop10 = Promise.all(
        movieIds.map((id) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${locale}`
          )
            .then((res) => res.json())
            .catch(() => console.log('oopsy'))
        )
      )
      loadedTop10.then((res: Movie[]) => (this.top10Cringe = res))
    },
    async setStats(stats: object) {
      this.stats = stats
    },
    setSearchInput(state: StoreState, payload: string) {
      this.searchInput = payload
    },
    setSearchTerm(payload: string) {
      this.searchTerm = payload
    },
    async setSearchResults(locale: string) {
      this.searchResults = []
      this.searchError = false
      this.searchTerm = this.searchInput
      const fetchedSearchResults = fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${locale}&include_adult=false&page=1&query=${this.searchTerm}`
      )
        .then((res) => res.json())
        .catch((error) => console.log(error))
      fetchedSearchResults.then((res) => {
        // filter search results to not show garbage entries
        this.searchResults = res.results.filter((result: Movie) => {
            return (
                result.poster_path &&
                result.overview &&
                result.release_date &&
                parseInt(result.release_date.substring(0, 4)) <= 2017
            )
        })
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
        const filteredResults = res.results.filter((result: Movie) => {
          return (
            result.poster_path &&
            result.overview &&
            result.release_date &&
            parseInt(result.release_date.substring(0, 4)) <= 2017
          )
        })
        // filter search results to not show garbage entries
        const currentSearchResults: Movie[] = this.searchResults
        filteredResults.map((entry: Movie) => currentSearchResults.push(entry))
        this.searchResults = currentSearchResults
        if (this.searchResults.length === 0) {
          this.searchError = true
        }
      })
    },
    resetSearch() {
      this.searchError = false
    },
    setSearchError(payload: boolean) {
      this.searchError = payload
    },
    async setBondMovies(locale: string) {
      // const bondMovieData = placeholderBondMovies
      const data = await fetch(`https://www.triggerscore.de/api/bondMovies?locale=${locale}`)
      const bondMovieData = await data.json()
      this.bondMovies = bondMovieData
      this.highlightsLoading = false
    },
    async filterMovies() {
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
    setSortingOption(state: StoreState, payload: string) {
      this.sortingOption = payload
    },
    setMovieYearMin(state: StoreState, payload: number) {
      this.filterMoviesByYearMin = payload
    },
    setMovieYearMax(state: StoreState, payload: number) {
      this.filterMoviesByYearMax = payload
    },
    setShownScore(state: StoreState, payload: ScoreKey) {
      this.shownScore = payload
    },
    setMinScore(state: StoreState, payload: number) {
      this.minScore = payload
    },
    setMaxScore(state: StoreState, payload: number) {
      this.maxScore = payload
    },
    setIsFiltering(payload: boolean) {
      this.isFiltering = payload
    },
    sortMovies(
      sortingOption: string,
      array: Movie[],
      triggerscores: TriggerScore[],
      shownScore: ScoreKey
    ) {
      let clonedArray = [...array]
      if (sortingOption === 'a-z') {
        clonedArray = clonedArray.sort(sortAtoZ)
      }
      if (sortingOption === 'z-a') {
        clonedArray = clonedArray.sort(sortZtoA)
      }
      if (sortingOption === 'date-desc') {
        clonedArray = clonedArray.sort(sortByDateDesc)
      }
      if (sortingOption === 'date-asc') {
        clonedArray = clonedArray.sort(sortByDateAsc)
      }
      if (sortingOption === 'ts-desc') {
        clonedArray = clonedArray.sort(sortByTsDesc(triggerscores, shownScore))
      }
      if (sortingOption === 'ts-asc') {
        clonedArray = clonedArray.sort(sortByTsAsc(triggerscores, shownScore))
      }
      this.filteredMovies = clonedArray
    },
    filterByYear(filterMax: number, filterMin: number, array: Movie[]) {
      let clonedArray = [...array]
      if (filterMin != null && filterMin >= 1900 && filterMin <= 2011) {
        clonedArray = clonedArray.filter(
          (movie) => Number(movie.release_date.slice(0, 4)) >= filterMin
        )
      }
      if (filterMax != null && filterMax >= 1900 && filterMax <= 2011) {
        clonedArray = clonedArray.filter(
          (movie) =>
            Number(movie.release_date.slice(0, 4)) <= filterMax + 1
        )
      }
      this.filteredMovies = clonedArray
    },
    filterByScore(
      array: TriggerScore[],
      triggerscores: TriggerScore[],
      min: number,
      max: number,
      shownScore: ScoreKey
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
      const data = await fetch(`${apiBaseUrl}/fetchProviders?locale=${locale}`)
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
      this.filteredMovies = clonedArray.filter((movie: Movie) => validIds.includes(movie.id))
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
})
