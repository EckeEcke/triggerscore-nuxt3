import { connectToDatabase } from './dbClient.js'
import { calculateScores } from './calculateScores.js'

export const handler = async (event) => {
    try {
        const database = await connectToDatabase()
        const ratings = await database.collection('scores').find().toArray()
        const ratingsSortedByOthers = calculateScores(ratings).sort((a, b) => b.rating_others - a.rating_others)
        const top10 = ratingsSortedByOthers.slice(0, 10)
        return {
            statusCode: 200,
            body: JSON.stringify(top10),
            headers: { 
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 
                'Access-Control-Allow-Headers': 'Content-Type', 
                'Access-Control-Allow-Credentials': 'true', 
            }, 
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: err.message }),
            headers: { 
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 
                'Access-Control-Allow-Headers': 'Content-Type', 
                'Access-Control-Allow-Credentials': 'true', 
            }, 
        }
    }
}
