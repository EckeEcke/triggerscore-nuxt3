import { connectToDatabase } from "./dbClient.js"

const devAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8888']
const prodAllowedOrigins = ['https://www.triggerscore.de']

const allowedOrigins = process.env.NODE_ENV === 'development' ? devAllowedOrigins : prodAllowedOrigins

export const handler = async (event) => {
  const origin = event.headers?.origin || ''
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
    const scores = database.collection('scores')
    const query = { id: '3' }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Connected to database' }),
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
