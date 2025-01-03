import { connectToDatabase } from "./dbClient"

const devAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8888']
const prodAllowedOrigins = ['https://www.triggerscore.de']

const allowedOrigins = process.env.NODE_ENV === 'development' ? devAllowedOrigins : prodAllowedOrigins

export default async (req, res) => {
  const origin = req.headers.origin
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
    res.status(200).json({ message: 'Connected to database' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}