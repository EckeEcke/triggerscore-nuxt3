import { connectToDatabase } from './dbClient.js'
import { rateLimit } from './rateLimit.js'
import Bottleneck from 'bottleneck'

const devAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8888']
const prodAllowedOrigins = ['https://www.triggerscore.de']

const allowedOrigins = process.env.NODE_ENV === 'development' ? devAllowedOrigins : prodAllowedOrigins

const limiter = new Bottleneck({
  minTime: 100,
  maxConcurrent: 10,
})

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
    const url = new URL(event.rawUrl)
    const locale = url.searchParams.get('locale')
    const database = await connectToDatabase()
    const scores = await database.collection('scores')
    const movieIds = await scores.distinct('movie_id')
    
    const netflix = []
    const prime = []
    const disney = []
    const sky = []
    
    const providerRegion = locale.toUpperCase() === 'EN' ? 'GB' : locale.toUpperCase()

    const providerDataPromises = movieIds.map(id => 
      limiter.schedule(() => 
        fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.API_KEY}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error fetching provider data: ${response.statusText}`)
            }
            return response.json()
          })
      )
    )

    const providerDataResponses = await Promise.all(providerDataPromises)
    const providerData = providerDataResponses.map(response => response)

    providerData.forEach(entry => {
      if (!entry.results[providerRegion] || !entry.results[providerRegion].flatrate) return
      if (entry.results[providerRegion].flatrate.some(provider => provider.provider_name === 'Netflix')) {
        netflix.push(entry.id)
      }
      if (entry.results[providerRegion].flatrate.some(provider => provider.provider_name === 'Amazon Prime Video')) {
        prime.push(entry.id)
      }
      if (entry.results[providerRegion].flatrate.some(provider => provider.provider_name === 'Disney Plus')) {
        disney.push(entry.id)
      }
      if (entry.results[providerRegion].flatrate.some(provider => provider.provider_name === 'WOW')) {
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
      body: JSON.stringify(finalProviderInfo),
      headers,
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
      headers,
    }
  }
}