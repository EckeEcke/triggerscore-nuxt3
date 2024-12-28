export default defineEventHandler(async (event) => {
  const { apiKey } = useRuntimeConfig()
  const { locale, movie_id } = getQuery(event)
  
  if (!movie_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Movie ID is required' })
    }
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${apiKey}&language=${locale}&page=1`)
    if (!response.ok) {
      throw new Error(`Error fetching similar movies: ${response.statusText}`)
    }
    const data = await response.json()
    return {
      statusCode: 200,
      body: data.results
    }
  } catch (error) {
    console.error('Error fetching similar movies:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    }
  }
})

