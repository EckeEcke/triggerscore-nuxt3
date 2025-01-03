import { connectToDatabase } from './dbClient'
import { rateLimit } from './rateLimit'

const devAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8888']
const prodAllowedOrigins = ['https://www.triggerscore.de']

const allowedOrigins = process.env.NODE_ENV === 'development' ? devAllowedOrigins : prodAllowedOrigins

export default async (req, res) => {
  const origin = req.headers.origin
  const userAgent = req.headers['user-agent']
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  if (!req.headers['user-agent']) console.log('no ip')

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
    res.status(429).json({ message: 'Too many requests, please try again later.' })
    return
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`)
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

    res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}