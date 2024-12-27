import { connectToDatabase } from './dbClient.js'
import { calculateScores } from './calculateScores.js'

export const handler = async (event) => {
    try {
        const database = await connectToDatabase()
        const ratings = await database.collection('scores').find().toArray()
        const ratingsSortedByCringe = calculateScores(ratings).sort((a, b) => b.rating_cringe - a.rating_cringe)
        const top10 = ratingsSortedByCringe.slice(0, 10)
        return {
        statusCode: 200,
        body: JSON.stringify(top10)
        }
    } catch (err) {
        return {
        statusCode: 500,
        body: JSON.stringify({ message: err.message })
        }
    }
}
