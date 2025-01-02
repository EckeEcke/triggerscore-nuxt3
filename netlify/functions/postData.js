import { connectToDatabase } from './dbClient.js'
import { calculateTotal } from './calculateScores.js'
import { rateLimit } from './rateLimit.js'

const devAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8888']
const prodAllowedOrigins = ['https://www.triggerscore.de']

const allowedOrigins = process.env.NODE_ENV === 'development' ? devAllowedOrigins : prodAllowedOrigins

export const handler = async (event) => {
    const origin = event.headers.origin
    const userAgent = event.headers['user-agent']
    const ip = event.headers['x-forwarded-for'] || event.connection.remoteAddress

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

    const rateLimitResponse = rateLimit(ip, userAgent)
    if (rateLimitResponse) {
        return {
            statusCode: 429,
            headers,
            body: JSON.stringify({ message: 'Too many requests, please try again later.' }),
        }
    }

    try {
        const body = JSON.parse(event.body)
        if (!body.movieID) {
            console.log("No movie defined in request body...")
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Movie ID is required" }),
                headers,
            }
        }

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