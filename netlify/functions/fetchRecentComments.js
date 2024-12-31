import { connectToDatabase } from './dbClient.js'

export const handler = async (event) => {
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
