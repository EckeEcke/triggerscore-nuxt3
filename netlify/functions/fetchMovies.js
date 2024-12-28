import axios from 'axios'
import { connectToDatabase } from './dbClient.js'

export const handler = async (event) => {
    try {
        const url = new URL(event.rawUrl) 
        const locale = url.searchParams.get('locale')
        const database = await connectToDatabase()
        const scores = database.collection('scores')
        const movieIds = await scores.distinct('movie_id')
        
        const movieDataPromises = movieIds.map(id => 
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=${locale}&append_to_response=videos`)
        )
        const movieDataResponses = await Promise.all(movieDataPromises)
        const movies = movieDataResponses.map(response => response.data)

        return {
        statusCode: 200,
        body: JSON.stringify(movies)
        }
    } catch (error) {
        console.error(error)
        return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' })
        }
    }
}
