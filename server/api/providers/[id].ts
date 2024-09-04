export default defineEventHandler(async (event) => {
    const { apiKey } = useRuntimeConfig()
    const { id } = event.context.params as Record<string, string>
    const response = await $fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`)
    return response
  })