import { useStore } from '~/stores/store'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default defineNuxtPlugin((nuxtApp: any) => {
    const locale = nuxtApp.$i18n?.locale || 'en'
    const store = useStore()

    const isMaintained = store.isMaintenanceMode

    if (!isMaintained && !store.hasLoadedData) {
        store.setTriggerscores(locale.value).catch(error => {
            console.error('Error loading trigger scores:', error)
        })

        store.setBondMovies(locale.value).catch(error => {
            console.error('Error loading Bond movies:', error)
        })

        store.loadProviderData(locale.value).catch(error => {
            console.error('Error loading provider data:', error)
        })
    }
})