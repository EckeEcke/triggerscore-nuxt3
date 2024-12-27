import { connectToDatabase } from './dbClient.js'
import { calculateScores } from './calculateScores.js'

export const handler = async (event) => {
  console.log(event)
  try {
    const database = await connectToDatabase()
    const scores = await database.collection('scores').find().toArray()
    const calculatedScores = calculateScores(scores)
    return {
      statusCode: 200,
      body: JSON.stringify(calculatedScores)
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message })
    }
  }
}
