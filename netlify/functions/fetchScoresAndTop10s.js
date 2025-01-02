import { connectToDatabase } from './dbClient.js'
import { calculateScores } from './calculateScores.js'

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
    const scores = await database.collection('scores').find().toArray()
    const calculatedScores = calculateScores(scores)

    const top10Sexism = calculatedScores.sort((a, b) => b.rating_sexism - a.rating_sexism).slice(0, 10)
    const top10Racism = calculatedScores.sort((a, b) => b.rating_racism - a.rating_racism).slice(0, 10)
    const top10Others = calculatedScores.sort((a, b) => b.rating_others - a.rating_others).slice(0, 10)
    const top10Cringe = calculatedScores.sort((a, b) => b.rating_cringe - a.rating_cringe).slice(0, 10)

    const response = {
      scores: calculatedScores,
      top10s: {
        sexism: top10Sexism,
        racism: top10Racism,
        others: top10Others,
        cringe: top10Cringe,
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response),
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