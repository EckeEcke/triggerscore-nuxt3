const bondMovieIDs = [
    646, 657, 658, 660, 667, 668, 681, 253, 682, 691, 698, 699, 700, 707,
    708, 709, 710, 714, 36643, 36669
  ]
  
export default defineEventHandler(async (event) => {
    const { apiKey } = useRuntimeConfig()
    const { locale } = getQuery(event)

    const movieDataPromises = bondMovieIDs.map(id => 
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${locale ?? 'de'}`)
        .then(response => {
            if (!response.ok) {
            throw new Error(`Error fetching movie data: ${response.statusText}`)
            }
            return response.json()
        })
    )

    try {
        const movieDataResponses = await Promise.all(movieDataPromises)
        const bondMovies = movieDataResponses.map(response => response)
        return bondMovies
    } catch (error) {
        console.error("Error fetching movie data:", error)
        return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal Server Error" })
        }
    }
})
  