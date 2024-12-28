import axios from 'axios'
import Bottleneck from 'bottleneck'
import { connectToDatabase } from './dbClient.js'

const limiter = new Bottleneck({
  minTime: 10, // Minimum time between requests
  maxConcurrent: 10 // Maximum number of concurrent requests
})

export const handler = async (event) => {
    try {
        const url = new URL(event.rawUrl) 
        const locale = url.searchParams.get('locale')
        const streamingProviders = ['netflix', 'prime', 'disney', 'sky']
        const database = await connectToDatabase()
        const scores = await database.collection('scores')
        const movieIds = await scores.distinct('movie_id')
        const netflix = []
        const disney = []
        const prime = []
        const sky = []
        const providerRegion = locale.toUpperCase() === 'EN' ? 'GB' : locale.toUpperCase()
        const providerDataPromises = movieIds.map(id => limiter.schedule(() => axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.API_KEY}`)))
        const providerDataResponses = await Promise.all(providerDataPromises)
        const providerData = providerDataResponses.map(response => response.data)

        providerData.map(entry => {
        if (!entry.results[providerRegion] || !entry.results[providerRegion].flatrate) return
            if (entry.results[providerRegion].flatrate.some(provider => provider.provider_name == 'Netflix')) {
            netflix.push(entry.id)
            }
            if (entry.results[providerRegion].flatrate.some(provider => provider.provider_name == 'Amazon Prime Video')) {
            prime.push(entry.id)
            }
            if (entry.results[providerRegion].flatrate.some(provider => provider.provider_name == 'Disney Plus')) {
            disney.push(entry.id)
            }
            if (entry.results[providerRegion].flatrate.some(provider => provider.provider_name == 'WOW')) {
            sky.push(entry.id)
            }
        })

        const finalProviderInfo = {
        netflix,
        prime,
        disney,
        sky
        }
        
        return {
        statusCode: 200,
        body: JSON.stringify(finalProviderInfo)
        }
    } catch (err) {
        return {
        statusCode: 500,
        body: JSON.stringify({ message: err.message })
        }
    }
}
