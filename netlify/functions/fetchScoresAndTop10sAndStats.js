import { connectToDatabase } from './dbClient.js'
import { calculateScores } from './calculateScores.js'
import { countLikesAndDislikes } from './countLikesAndDislikes.js'

const countComments = (scores) => {
  return scores.reduce((count, score) => {
    return count + (score.comment ? 1 : 0)
  }, 0)
}
const devAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001']
const prodAllowedOrigins = ['https://www.triggerscore.de']

const allowedOrigins = process.env.NODE_ENV === 'development' ? devAllowedOrigins : prodAllowedOrigins

export const handler = async (event) => {
  const origin = event.headers.origin
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

  try {
    const database = await connectToDatabase()
    const scores = await database.collection('scores').find().toArray()
    const calculatedScores = calculateScores(scores)

    const top10Sexism = calculatedScores.sort((a, b) => b.rating_sexism - a.rating_sexism).slice(0, 10)
    const top10Racism = calculatedScores.sort((a, b) => b.rating_racism - a.rating_racism).slice(0, 10)
    const top10Others = calculatedScores.sort((a, b) => b.rating_others - a.rating_others).slice(0, 10)
    const top10Cringe = calculatedScores.sort((a, b) => b.rating_cringe - a.rating_cringe).slice(0, 10)

    const amountComments = countComments(scores)
    const amountLikes = countLikesAndDislikes(scores)
    const totalMovies = calculatedScores.length
    let allScoresTotal = 0
    let allScoresSexism = 0
    let allScoresRacism = 0
    let allScoresOthers = 0
    let allScoresCringe = 0

    calculatedScores.forEach(score => { allScoresTotal += score.rating_total })
    calculatedScores.forEach(score => { allScoresSexism += score.rating_sexism })
    calculatedScores.forEach(score => { allScoresRacism += score.rating_racism })
    calculatedScores.forEach(score => { allScoresOthers += score.rating_others })
    calculatedScores.forEach(score => { allScoresCringe += score.rating_cringe })

    const stats = {
      totalRatings: scores.length,
      totalMovies,
      amountComments,
      amountLikes: amountLikes.likes,
      amountDislikes: amountLikes.dislikes,
      averageTotal: allScoresTotal / totalMovies,
      averageSexism: allScoresSexism / totalMovies,
      averageRacism: allScoresRacism / totalMovies,
      averageOthers: allScoresOthers / totalMovies,
      averageCringe: allScoresCringe / totalMovies,
    }

    const response = {
      scores: calculatedScores,
      stats,
      top10s: {
        sexism: top10Sexism,
        racism: top10Racism,
        others: top10Others,
        cringe: top10Cringe,
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response),
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