export interface Provider {
    logo_path: string | null;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

export interface RegionProviders {
    link?: string;
    flatrate?: Provider[];
    buy?: Provider[];
    rent?: Provider[];
    free?: Provider[];
    ads?: Provider[];
}

export interface ProviderResponse {
    id: number;
    results: {
        [regionCode: string]: RegionProviders;
    };
}

export interface ProviderData {
    netflix: number[];
    prime: number[];
    disney: number[];
    sky: number[];
}