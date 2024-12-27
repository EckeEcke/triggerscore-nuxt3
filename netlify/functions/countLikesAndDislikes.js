export const countLikesAndDislikes = (data) => {
    let likes = {
        likes: 0,
        dislikes: 0
    }
    data.forEach(entry => {
        if (entry.liked == 1) {
        likes.likes += 1
        }
        if (entry.disliked == 1) {
        likes.dislikes += 1
        }
    })
    return likes
}
  
export const handler = async (event) => {
    const data = JSON.parse(event.body)
    const likes = countLikesAndDislikes(data)
    return {
        statusCode: 200,
        body: JSON.stringify(likes)
    }
}
  