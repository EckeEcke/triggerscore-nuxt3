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