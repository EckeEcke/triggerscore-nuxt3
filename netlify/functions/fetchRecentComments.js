import { connectToDatabase } from './dbClient.js'

const devAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001']
const prodAllowedOrigins = ['https://www.triggerscore.de']

const allowedOrigins = process.env.NODE_ENV === 'development' ? devAllowedOrigins : prodAllowedOrigins

export const handler = async (event) => {
  const origin = event.headers.origin
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

  try {
    const database = await connectToDatabase()
    const ratings = await database.collection('scores').find({
      $and: [
        { comment: { $ne: null } },
        { comment: { $ne: '' } }
      ]
    }).sort({ createdAt: -1 }).limit(8).toArray()

    return {
      statusCode: 200,
      body: JSON.stringify(ratings),
      headers,
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
      headers,
    }
  }
}