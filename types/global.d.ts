declare global {
    interface Window {
        goatcounter?: {
            no_onload?: boolean
            visit_count?: function
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