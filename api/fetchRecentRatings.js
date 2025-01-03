import { connectToDatabase } from './dbClient'
import { rateLimit } from './rateLimit'

const devAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8888']
const prodAllowedOrigins = ['https://www.triggerscore.de']

const allowedOrigins = process.env.NODE_ENV === 'development' ? devAllowedOrigins : prodAllowedOrigins

export default async (req, res) => {
    const origin = req.headers.origin
    const userAgent = req.headers['user-agent']
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

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
        res.status(429).json({ message: 'Too many requests, please try again later.' })
        return
    }

    try {
        const database = await connectToDatabase()
        const ratings = await database.collection('scores').find().sort({ createdAt: -1 }).limit(6).toArray()
        res.status(200).json(ratings)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}