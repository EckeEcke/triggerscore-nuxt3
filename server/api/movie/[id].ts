export default defineEventHandler(async (event) => {
    const { apiKey } = useRuntimeConfig()
    const { id } = event.context.params as Record<string, string>
    const { locale } = getQuery(event)
    const response = await $fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${locale ?? 'de'}&append_to_response=videos`)
    return response
  })