declare global {
    interface Window {
        goatcounter?: {
            no_onload?: boolean
            count?: (vars: {
                path: string
                title?: string
                referrer?: string
                event?: boolean
            }) => void
        }
    }
}

export {}