import { connectToDatabase } from './dbClient.js'
import { calculateScores } from './calculateScores.js'
import { countLikesAndDislikes } from './countLikesAndDislikes.js'

function countComments(data){
    let comments = 0
    data.forEach(entry => {
        if(entry.comment != null && entry.comment.length > 3){
          comments += 1
        }
    })
    return comments
}

export const handler = async (event) => {
    try {
        const database = await connectToDatabase()
        const ratings = await database.collection('scores').find().toArray()
        const calculatedScores = calculateScores(ratings)
        const amountComments = countComments(ratings)
        const amountLikes = countLikesAndDislikes(ratings)
        const totalRatings = ratings.length
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
        
        const averageScoreTotal = Math.floor(allScoresTotal / totalMovies * 10) / 10
        const averageScoreSexism = Math.floor(allScoresSexism / totalMovies * 10) / 10
        const averageScoreRacism = Math.floor(allScoresRacism / totalMovies * 10) / 10
        const averageScoreOthers = Math.floor(allScoresOthers / totalMovies * 10) / 10
        const averageScoreCringe = Math.floor(allScoresCringe / totalMovies * 10) / 10

        const stats = {
        totalRatings,
        averageScoreTotal,
        averageScoreSexism,
        averageScoreRacism,
        averageScoreOthers,
        averageScoreCringe,
        amountMovies: totalMovies,
        amountComments,
        amountLikes: amountLikes.likes,
        amountDislikes: amountLikes.dislikes
        }

        return {
        statusCode: 200,
        body: JSON.stringify(stats)
        }
    } catch (err) {
        return {
        statusCode: 500,
        body: JSON.stringify({ message: err.message })
        }
    }
}
