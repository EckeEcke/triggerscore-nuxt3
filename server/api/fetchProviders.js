import { connectToDatabase } from './dbClient.js'
import { rateLimit } from './rateLimit.js'

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
    const url = new URL(req.url, `http://${req.headers.host}`)
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
      if (entry.results[providerRegion].flatrate.some(provider => provider.provider_name === 'Sky Go')) {
        sky.push(entry.id)
      }
    })

    const finalProviderInfo = {
      netflix,
      prime,
      disney,
      sky
    }

    res.status(200).json(finalProviderInfo)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}