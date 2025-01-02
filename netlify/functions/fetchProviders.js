const devAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8888']
const prodAllowedOrigins = ['https://www.triggerscore.de']

const allowedOrigins = process.env.NODE_ENV === 'development' ? devAllowedOrigins : prodAllowedOrigins

export const handler = async (event) => {
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