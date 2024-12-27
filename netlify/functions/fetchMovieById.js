import { connectToDatabase } from './dbClient.js'
import { calculateScores } from './calculateScores.js'

export const handler = async (event) => {
    try {
        const { id } = event.pathParameters
        const database = await connectToDatabase()
        const ratings = await database.collection('scores').find({ movie_id: parseInt(id) }).toArray()
        const calculatedScores = calculateScores(ratings)
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
