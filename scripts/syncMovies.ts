import { MongoClient } from 'mongodb'

const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const MOVIE_API_KEY = process.env.TMDB_API_KEY
const DATABASE_NAME = process.env.DATABASE_NAME
const SCORES_COLLECTION = 'scores'
const MOVIES_COLLECTION = 'movies'

const EXTERNAL_API_URL = 'https://api.themoviedb.org/3/movie/'

const uri = `mongodb+srv://ceckardt254:${DATABASE_PASSWORD}@cluster0.sen83.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

async function runSync() {
    if (!DATABASE_PASSWORD || !MOVIE_API_KEY) {
        console.error('FATAL: DATABASE_PASSWORD and TMDB must be set.')
        process.exit(1)
    }

    const client = new MongoClient(uri)
    console.log('Starting movie sync process...')

    try {
        await client.connect()
        console.log('Successfully connected to MongoDB.')

        const db = client.db(DATABASE_NAME)
        const scoresCollection = db.collection(SCORES_COLLECTION)
        const moviesCollection = db.collection(MOVIES_COLLECTION)

        const movieIdsToProcess = await scoresCollection.find({}, { projection: { movie_id: 1, _id: 0 } }).toArray()

        console.log(`Found ${movieIdsToProcess.length} scores to process.`)

        const uniqueMovieIds = new Set(movieIdsToProcess.map(doc => doc.movie_id))
        console.log(`Processing ${uniqueMovieIds.size} unique movie IDs.`)

        for (const movieId of uniqueMovieIds) {
            if (!movieId) continue

            try {
                console.log(`Processing movie ID: ${movieId}...`)

                const url = new URL(`${EXTERNAL_API_URL}${movieId}`)
                url.searchParams.append('api_key', MOVIE_API_KEY)

                const response = await fetch(url.toString())

                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`)
                }

                const apiData = await response.json()

                const result = await moviesCollection.updateOne(
                    { _id: apiData.id },
                    { $set: apiData },
                    { upsert: true }
                )

                if (result.upsertedCount > 0) {
                    console.log(`-> CREATED new entry for: ${apiData.title} (ID: ${apiData.id})`)
                } else if (result.modifiedCount > 0) {
                    console.log(`-> UPDATED existing entry for: ${apiData.title} (ID: ${apiData.id})`)
                } else {
                    console.log(`-> No changes for: ${apiData.title} (ID: ${apiData.id})`)
                }

            } catch (error: any) {
                console.error(`--> FAILED to process movie ID ${movieId}:`, error.message)
            }
        }
    } catch (error) {
        console.error('A critical error occurred:', error)
        process.exit(1)
    } finally {
        await client.close()
        console.log('MongoDB connection closed.')
    }
}

runSync().then(() => {
    console.log('Sync task completed.')
}).catch(err => {
    console.error('Sync task failed to complete.', err)
})