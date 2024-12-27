import axios from 'axios'

const bondMovieIDs = [
  646, 657, 658, 660, 667, 668, 681, 253, 682, 691, 698, 699, 700, 707,
  708, 709, 710, 714, 36643, 36669
]

export const handler = async (event) => {
    try {
        const { locale } = event.pathParameters

        const movieDataPromises = bondMovieIDs.map(id => 
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=${locale}`)
        )
        const movieDataResponses = await Promise.all(movieDataPromises)
        const bondMovies = movieDataResponses.map(response => response.data)

        return {
        statusCode: 200,
        body: JSON.stringify(bondMovies)
        }
    } catch (error) {
        console.error(error)
        return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' })
        }
    }
}
