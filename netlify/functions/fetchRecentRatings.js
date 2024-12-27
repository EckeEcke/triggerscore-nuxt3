import { connectToDatabase } from './dbClient.js'

export const handler = async (event) => {
    try {
        const database = await connectToDatabase()
        const ratings = await database.collection('scores').find().sort({ createdAt: -1 }).limit(6).toArray()
        return {
        statusCode: 200,
        body: JSON.stringify(ratings)
        }
    } catch (err) {
        return {
        statusCode: 500,
        body: JSON.stringify({ message: err.message })
        }
    }
}
