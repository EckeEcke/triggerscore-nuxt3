import { connectToDatabase } from './dbClient'
import { rateLimit } from './rateLimit'
import { calculateScores } from './calculateScores'
import { countLikesAndDislikes } from './countLikesAndDislikes'

const countComments = (scores) => {
  return scores.reduce((count, score) => {
    return count + (score.comment ? 1 : 0)
  }, 0)
}
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
      averageTotal: Math.round((allScoresTotal / totalMovies) * 10) / 10,
      averageSexism: Math.round((allScoresSexism / totalMovies) * 10) / 10,
      averageRacism: Math.round((allScoresRacism / totalMovies) * 10) / 10,
      averageOthers: Math.round((allScoresOthers / totalMovies) * 10) / 10,
      averageCringe: Math.round((allScoresCringe / totalMovies) * 10) / 10,
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

    res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}