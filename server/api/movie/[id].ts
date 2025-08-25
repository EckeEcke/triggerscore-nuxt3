export default defineEventHandler(async (event) => {
    const { apiKey } = useRuntimeConfig(event)
    const { id } = event.context.params as Record<string, string>
    const { locale } = getQuery(event)

    if (!id || isNaN(Number(id))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'A valid movie ID is required',
        })
    }

    try {
        const response = await $fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${locale ?? 'de'}&append_to_response=videos`
        )
        return response
    } catch (error: any) {
        throw createError({
            statusCode: error?.response?.status || 502,
            statusMessage:
                error?.response?.statusText ||
                error?.message ||
                'Failed to fetch movie data',
        })
    }
})