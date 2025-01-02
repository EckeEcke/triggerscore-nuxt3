const devAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001']
const prodAllowedOrigins = ['https://www.triggerscore.de']

const allowedOrigins = process.env.NODE_ENV === 'development' ? devAllowedOrigins : prodAllowedOrigins

export const countLikesAndDislikes = (data) => {
    let likesAndDislikes = {
        likes: 0,
        dislikes: 0
    }
    data.forEach(entry => {
        if (entry.liked == 1 || entry.liked === true) {
        likesAndDislikes.likes += 1
        }
        if (entry.disliked == 1 || entry.disliked === true) {
        likesAndDislikes.dislikes += 1
        }
    })
    return likesAndDislikes
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
    const likes = countLikesAndDislikes(data)
    return {
        statusCode: 200,
        body: JSON.stringify(likes),
        headers,
    }
}
  