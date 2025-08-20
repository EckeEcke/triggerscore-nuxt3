import { useStore } from '~/stores/store'

export default defineNuxtPlugin((nuxtApp: any) => {
    const locale = nuxtApp.$i18n?.locale || 'en'
    const store = useStore()

    const isMaintained = store.isMaintenanceMode

    if (!isMaintained && !store.hasLoadedData){
        store.setTriggerscores(locale.value)
        store.setBondMovies(locale.value)
        store.loadProviderData(locale.value)
    }
})