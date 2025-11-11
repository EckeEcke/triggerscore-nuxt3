export default defineNuxtPlugin((nuxtApp) => {
    const GOATCOUNTER_CODE = 'triggerscore'
    const GOATCOUNTER_ENDPOINT = `https://` + GOATCOUNTER_CODE + `.goatcounter.com/count`

    window.goatcounter = {
        no_onload: true,
    }

    const router = nuxtApp.vueApp.config.globalProperties.$router;
    router.afterEach((to) => {
        const t = setInterval(() => {
            if (window.goatcounter && typeof window.goatcounter.count === 'function') {
                clearInterval(t)

                const lastMatchedRoute = to.matched[to.matched.length - 1]
                const pathToSend = lastMatchedRoute ? lastMatchedRoute.path : to.path

                window.goatcounter.count({
                    path: pathToSend,
                })
            }
        }, 50)
    })

    const script = document.createElement('script')
    script.src = '//gc.zgo.at/count.js'
    script.async = true
    script.setAttribute('data-goatcounter', GOATCOUNTER_ENDPOINT)

    document.head.appendChild(script)
})
