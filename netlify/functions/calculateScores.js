const devAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8888']
const prodAllowedOrigins = ['https://www.triggerscore.de']

const allowedOrigins = process.env.NODE_ENV === 'development' ? devAllowedOrigins : prodAllowedOrigins

export const calculateTotal = (score) => {
    const racism = score.rating_racism
    const sexism = score.rating_sexism
    const others = score.rating_others
    const highest = Math.max(racism,sexism,others)
    const total = (racism + sexism + others + highest*5) / 8
    return parseFloat(total.toFixed(1))  
  }

export const calculateScores = (data) => {
    let scores = []
    let comments = 0
    
    data.forEach(entry => {
        if (entry.comment != null && entry.comment.length > 3) {
            comments += 1
        }
        const index = scores.map(score => score.movie_id).indexOf(entry.movie_id)
        const entryTotal = calculateTotal(entry)
        if (index === -1) {
            entry.rating_total = entryTotal
            entry.ratings = 1
            entry.comments = [entry.comment]
            entry.likes = entry.liked === 1 || entry.liked === true ? 1 : 0
            entry.dislikes = entry.disliked === 1 || entry.disliked === true ? 1 : 0
            scores.push(entry)
        } else {
            scores[index].ratings += 1
            scores[index].rating_sexism += entry.rating_sexism
            scores[index].rating_racism += entry.rating_racism
            scores[index].rating_others += entry.rating_others
            scores[index].rating_cringe += entry.rating_cringe
            scores[index].rating_total += entryTotal
            if (entry.liked === 1 || entry.liked === true) {
            scores[index].likes += 1
            }
            if (entry.disliked === 1 || entry.disliked === true) {
            scores[index].dislikes += 1
            }
            scores[index].comments.push(entry.comment)
        }
    })
    
    scores.forEach(score => {
      score.rating_sexism = Math.floor((score.rating_sexism / score.ratings) * 10) / 10
      score.rating_racism = Math.floor((score.rating_racism / score.ratings) * 10) / 10
      score.rating_others = Math.floor((score.rating_others / score.ratings) * 10) / 10
      score.rating_cringe = Math.floor((score.rating_cringe / score.ratings) * 10) / 10
      score.rating_total = Math.floor((score.rating_total / score.ratings) * 10) / 10
      score.comments = score.comments.filter(entry => entry != null)
    })
    
    return scores
}
  
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

    const data = JSON.parse(event.body)
    const scores = calculateScores(data)

    return {
        statusCode: 200,
        body: JSON.stringify(scores),
        headers
    }
}
  