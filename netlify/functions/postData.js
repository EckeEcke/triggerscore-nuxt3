import { connectToDatabase } from './dbClient.js'
import { calculateTotal } from './calculateScores.js'

export const handler = async (event) => {
    const body = JSON.parse(event.body)
    if (!body.movieID) {
        console.log("No movie defined in request body...")
        return {
        statusCode: 400,
        body: JSON.stringify({ message: "Movie ID is required" })
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
        vote_average: body.vote_average,
        tagline: body.tagline,
        overview: body.overview,
        imdb_id: body.imdb_id,
        backdrop_path: body.backdrop_path,
        poster_path: body.poster_path,
        release_date: body.release_date,
        createdAt: new Date()
        })
        return {
        statusCode: 200,
        body: JSON.stringify({ message: "Received request", result })
        }
    } catch (err) {
        console.error(err)
        return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error inserting data" })
        }
    }
}
