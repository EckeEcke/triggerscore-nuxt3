import { connectToDatabase } from './dbClient.js'
import { calculateTotal } from './calculateScores.js'

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

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
        }
    }

    const body = JSON.parse(event.body)
    if (!body.movieID) {
        console.log("No movie defined in request body...")
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Movie ID is required" }),
            headers,
        }
    }

    try {
        const database = await connectToDatabase()
        const result = await database.collection('scores').insertOne({
            movie_id: body.movieID,
            rating_sexism: body.sexism,
            rating_racism: body.racism,
            rating_others: body.others,
            rating_cringe: body.cringe,
            rating_total: calculateTotal({
                rating_sexism: body.sexism,
                rating_racism: body.racism,
                rating_others: body.others
            }),
            comment: body.comment,
            liked: body.like,
            disliked: body.dislike,
            title: body.title,
            original_title: body.original_title,
            runtime: body.runtime,
        })

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Received request", result }),
            headers,
        }
    } catch (err) {
        console.error(err)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error inserting data" }),
            headers,
        }
    }
}