import { connectToDatabase } from './dbClient.js'
import { rateLimit } from './rateLimit.js'

const devAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8888']
const prodAllowedOrigins = ['https://www.triggerscore.de']
const allowedOrigins = process.env.NODE_ENV === 'development' ? devAllowedOrigins : prodAllowedOrigins

const ALLOWED_LOCALES = ['en', 'de', 'fr', 'es', 'us']
const COLLECTION_PREFIX = 'movies_'

export const handler = async (event) => {
    const origin = event.headers.origin
    const userAgent = event.headers['user-agent']
    const ip = event.headers['x-forwarded-for'] || event.connection.remoteAddress

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
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
        return { ...rateLimitResponse, headers }
    }

    try {
        const url = new URL(event.rawUrl)
        const locale = url.searchParams.get('locale')

        if (!locale || !ALLOWED_LOCALES.includes(locale)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: `Invalid or missing 'locale' parameter. Allowed values are: ${ALLOWED_LOCALES.join(', ')}` }),
                headers,
            }
        }

        const collectionName = `${COLLECTION_PREFIX}${locale}`

        const database = await connectToDatabase()
        const moviesCollection = database.collection(collectionName)

        const movies = await moviesCollection.find({}).toArray()

        return {
            statusCode: 200,
            body: JSON.stringify(movies),
            headers,
        }
    } catch (error) {
        console.error('An error occurred in the function:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An internal server error occurred.' }),
            headers,
        }
    }
}