export interface Genre {
    id: number
    name: string
}

export interface ProductionCompany {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
}

export interface ProductionCountry {
    iso_3166_1: string
    name: string
}

export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

export interface Movie {
    adult: boolean
    backdrop_path: string | null
    belongs_to_collection: null | {
        id: number
        name: string
        poster_path: string
        backdrop_path: string
    };
    budget: number
    genres: Genre[]
    homepage: string | null
    id: number
    imdb_id: string | null
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number | null
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string | null
    title: string
    video: boolean
    videos?: {
        results: Array<{
        site: string,
        key: string
    }>
    }
    vote_average: number
    vote_count: number
    keywords?: {
        keywords: Array<{
            name: string
        }>
    }
}

export const emptyMovie: Movie = {
    adult: false,
    backdrop_path: null,
    belongs_to_collection: null,
    budget: 0,
    genres: [],
    homepage: null,
    id: 0,
    imdb_id: null,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: null,
    production_companies: [],
    production_countries: [],
    release_date: '',
    revenue: 0,
    runtime: null,
    spoken_languages: [],
    status: '',
    tagline: null,
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
};