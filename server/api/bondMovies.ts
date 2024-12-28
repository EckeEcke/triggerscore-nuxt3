import axios from 'axios'

const bondMovieIDs = [
  646, 657, 658, 660, 667, 668, 681, 253, 682, 691, 698, 699, 700, 707,
  708, 709, 710, 714, 36643, 36669
]

export default defineEventHandler(async (event) => {
    console.log(event)
    const { apiKey } = useRuntimeConfig()
    const { locale } = getQuery(event)
    const movieDataPromises = bondMovieIDs.map(id => 
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${locale ?? 'de'}`)
        )
        const movieDataResponses = await Promise.all(movieDataPromises)
        const bondMovies = movieDataResponses.map(response => response.data)
    return bondMovies
})