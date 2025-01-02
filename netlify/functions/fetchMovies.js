import { connectToDatabase } from './dbClient.js'
import { rateLimit } from './rateLimit.js'

const devAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8888']
const prodAllowedOrigins = ['https://www.triggerscore.de']

const allowedOrigins = process.env.NODE_ENV === 'development' ? devAllowedOrigins : prodAllowedOrigins

export const handler = async (event) => {
  const origin = event.headers.origin
  const userAgent = event.headers['user-agent']
  const ip = event.headers['x-forwarded-for'] || event.connection.remoteAddress
  if (!event.headers['user-agent']) console.log('no ip')

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  }

  if (allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
  } else {
    headers['Access-Control-Allow-Origin'] = 'null'
  }

  const rateLimitResponse = rateLimit(ip, userAgent)
  if (rateLimitResponse) {
    return {
      ...rateLimitResponse,
      headers,
    }
  }

  try {
    const url = new URL(event.rawUrl)
    const locale = url.searchParams.get('locale')
    const database = await connectToDatabase()
    const scores = database.collection('scores')
    const movieIds = await scores.distinct('movie_id')
    
    const movieDataPromises = movieIds.map(id => 
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=${locale}&append_to_response=videos,keywords`)
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
      headers,
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers,
    }
  }
}