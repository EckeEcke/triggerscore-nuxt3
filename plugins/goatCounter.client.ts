export default defineNuxtPlugin((nuxtApp) => {
    window.goatcounter = {
        no_onload: true,
    }

    nuxtApp.vueApp.config.globalProperties.$router.afterEach((to) => {
        if (window.goatcounter && typeof window.goatcounter.count === 'function') {
            window.goatcounter.count({
                path: to.fullPath,
            })
        }
    })
})