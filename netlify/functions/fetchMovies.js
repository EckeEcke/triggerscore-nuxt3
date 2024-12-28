import { connectToDatabase } from './dbClient.js'

export const handler = async (event) => {
  try {
    const url = new URL(event.rawUrl)
    const locale = url.searchParams.get('locale')
    const database = await connectToDatabase()
    const scores = database.collection('scores')
    const movieIds = await scores.distinct('movie_id')
    
    const movieDataPromises = movieIds.map(id => 
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=${locale}&append_to_response=videos`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error fetching movie data: ${response.statusText}`)
          }
          return response.json()
        })
    )
    
    const movieDataResponses = await Promise.all(movieDataPromises)
    const movies = movieDataResponses.map(response => response)

    return {
        statusCode: 200,
        body: JSON.stringify(movies),
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 
            'Access-Control-Allow-Headers': 'Content-Type', 
            'Access-Control-Allow-Credentials': 'true', 
        }, 
    }
  } catch (error) {
    return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 
            'Access-Control-Allow-Headers': 'Content-Type', 
            'Access-Control-Allow-Credentials': 'true', 
        }, 
    }
  }
}

