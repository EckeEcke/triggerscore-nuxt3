import { connectToDatabase } from './dbClient.js'
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

    const rateLimitResponse = rateLimit(ip, userAgent)
    if (rateLimitResponse) {
        return {
            statusCode: 429,
            headers,
            body: JSON.stringify({ message: 'Too many requests, please try again later.' }),
        }
    }

    try {
        const database = await connectToDatabase()
        const ratings = await database.collection('scores').find().sort({ createdAt: -1 }).limit(6).toArray()
        return {
            statusCode: 200,
            body: JSON.stringify(ratings),
            headers,
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: err.message }),
            headers,
        }
    }
}