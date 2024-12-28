import { connectToDatabase } from './dbClient.js'
import { calculateScores } from './calculateScores.js'

export const handler = async (event) => {
    try {
        const url = new URL(event.rawUrl) 
        const id = url.searchParams.get('id')
        console.log("id: ", id)
        console.log(event)
        console.log(event.pathParameters)
        if (!id) { 
            return { 
                statusCode: 400, 
                body: JSON.stringify({ message: 'Movie ID is required' }), 
                headers: { 
                    'Access-Control-Allow-Origin': '*', 
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 
                    'Access-Control-Allow-Headers': 'Content-Type', 
                    'Access-Control-Allow-Credentials': 'true', 
                }, 
            } 
        }

        const database = await connectToDatabase()
        const ratings = await database.collection('scores').find({ movie_id: parseInt(id) }).toArray()
        const calculatedScores = calculateScores(ratings)
        return {
            statusCode: 200,
            body: JSON.stringify(calculatedScores),
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
