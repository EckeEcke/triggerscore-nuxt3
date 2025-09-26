export default defineNuxtRouteMiddleware((to) => {
    if (to.path === '/success') {
        const { $i18n } = useNuxtApp()
        const locale = $i18n.locale.value || 'de'

        return navigateTo(`/${locale}/success`, { redirectCode: 302 })
    }
})