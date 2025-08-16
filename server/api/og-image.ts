import { defineEventHandler, getQuery, sendProxy, sendRedirect } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const posterPath = query.poster_path as string

  if (!posterPath) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Poster path is required'
    })
  }

  const url = `https://image.tmdb.org/t/p/w500/${posterPath}`

  try {
    return await sendProxy(event, url, {
      headers: {
        'Content-Type': 'image/jpeg'
      }
    })
  } catch (error) {
    console.error(error)
    return sendRedirect(event, url)
  }
})