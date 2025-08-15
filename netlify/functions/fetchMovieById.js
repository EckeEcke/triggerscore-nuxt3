import { connectToDatabase } from './dbClient.js'
import { rateLimit } from './rateLimit.js'
import { calculateScores } from './calculateScores.js'

const devAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8888']
const prodAllowedOrigins = ['https://www.triggerscore.de']

const allowedOrigins = process.env.NODE_ENV === 'development' ? devAllowedOrigins : prodAllowedOrigins

export const handler = async (event) => {
  const origin = event.headers.origin
  const userAgent = event.headers['user-agent']
  const ip = event.headers['x-forwarded-for'] || event.connection.remoteAddress

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
      statusCode: 429,
      headers,
      body: JSON.stringify({ message: 'Too many requests, please try again later.' }),
    }
  }

  try {
    const url = new URL(event.rawUrl)
    const id = url.searchParams.get('id')
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Movie ID is required' }),
        headers,
      }
    }

    const database = await connectToDatabase()
    const ratings = await database.collection('scores').find({ movie_id: parseInt(id) }).toArray()
    const calculatedScores = calculateScores(ratings)

    return {
      statusCode: 200,
      body: JSON.stringify(calculatedScores),
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