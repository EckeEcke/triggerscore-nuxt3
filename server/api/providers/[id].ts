export default defineEventHandler(async (event) => {
    const { apiKey } = useRuntimeConfig()
    const params = getRouterParams(event)
    const id = params.id

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID parameter is required'
        })
    }

    return useFetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`)
  })