export interface Movie {
    adult: {
        type: "boolean",
        example: false,
        default: true
    },
    backdrop_path: {
        type: "string",
        example: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg"
    },
    belongs_to_collection: { },
    budget: {
        type: "integer",
        example: 63000000,
        default: 0
    },
    genres: {
        type: "array",
        items: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    example: 18,
                    default: 0
                },
                name: {
                    type: "string",
                    example: "Drama"
                },
            },
        },
    },
    homepage: {
        type: "string",
        example: "http://www.foxmovies.com/movies/fight-club"
    },
    id: {
        type: "number",
        example: 550,
        default: 0
    },
    imdb_id: {
        type: "string",
        example: "tt0137523"
    },
    original_language: {
        type: "string",
        example: "en"
    },
    original_title: {
        type: "string",
        example: "Fight Club"
    },
    overview: {
        type: "string",
        example: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    },
    popularity: {
        type: "number",
        example: 61.416,
        default: 0
    },
    poster_path: {
        type: "string",
        example: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
    },
    production_companies: {
        type: "array",
        items: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    example: 508,
                    default: 0
                },
                logo_path: {
                    type: "string",
                    example: "/7cxRWzi4LsVm4Utfpr1hfARNurT.png"
                },
                name: {
                    type: "string",
                    example: "Regency Enterprises"
                },
                origin_country: {
                    type: string,
                    example: "US"
                }
            }
        }
    },
    production_countries: {
        type: Array<string>
        items: {
            type: object,
            properties: {
                iso_3166_1: {
                    type: string,
                    example: "US"
                },
                name: {
                    type: string,
                    example: "United States of America"
                }
            }
        }
    },
    release_date: {
        type: string,
        example: "1999-10-15"
    },
    revenue: {
        type: "integer",
        example: 100853753,
        default: 0
    },
    runtime: {
        type: "integer",
        example: 139,
        default: 0
    },
    spoken_languages: {
        type: "array",
        items: {
            type: "object",
            properties: {
                english_name: {
                    type: "string",
                    example: "English"
                },
                iso_639_1: {
                    type: "string",
                    example: "en"
                },
                name: {
                    type: "string",
                    example: "English"
                }
            }
        }
    },
    status: {
        type: "string",
        example: "Released"
    },
    tagline: {
        type: "string",
        example: "Mischief. Mayhem. Soap."
    },
    title: {
        type: "string",
        example: "Fight Club"
    },
    video: {
        type: "boolean",
        example: false,
        default: true
    },
    vote_average: {
        type: "number",
        example: 8.433,
        default: 0
    },
    vote_count: {
        type: "integer",
        example: 26280,
        default: 0
    }
}

export const emptyMovie: Movie = {
        adult: {
            type: "boolean",
            example: false,
            default: true
        },
        backdrop_path: {
            type: "string",
            example: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg"
        },
        belongs_to_collection: { },
        budget: {
            type: "integer",
            example: 63000000,
            default: 0
        },
        genres: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        example: 18,
                        default: 0
                    },
                    name: {
                        type: "string",
                        example: "Drama"
                    },
                },
            },
        },
        homepage: {
            type: "string",
            example: "http://www.foxmovies.com/movies/fight-club"
        },
        id: {
            type: "number",
            example: 550,
            default: 0
        },
        imdb_id: {
            type: "string",
            example: "tt0137523"
        },
        original_language: {
            type: "string",
            example: "en"
        },
        original_title: {
            type: "string",
            example: "Fight Club"
        },
        overview: {
            type: "string",
            example: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
        },
        popularity: {
            type: "number",
            example: 61.416,
            default: 0
        },
        poster_path: {
            type: "string",
            example: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
        },
        production_companies: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        example: 508,
                        default: 0
                    },
                    logo_path: {
                        type: "string",
                        example: "/7cxRWzi4LsVm4Utfpr1hfARNurT.png"
                    },
                    name: {
                        type: "string",
                        example: "Regency Enterprises"
                    },
                    origin_country: {
                        type: "string",
                        example: "US"
                    }
                }
            }
        },
        production_countries: {
            type: Array<string>,
            items: {
                type: Object,
                properties: {
                    iso_3166_1: {
                        type: String,
                        example: "US"
                    },
                    name: {
                        type: String,
                        example: "United States of America"
                    }
                }
            }
        },
        release_date: {
            type: String,
            example: "1999-10-15"
        },
        revenue: {
            type: "integer",
            example: 100853753,
            default: 0
        },
        runtime: {
            type: "integer",
            example: 139,
            default: 0
        },
        spoken_languages: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    english_name: {
                        type: "string",
                        example: "English"
                    },
                    iso_639_1: {
                        type: "string",
                        example: "en"
                    },
                    name: {
                        type: "string",
                        example: "English"
                    }
                }
            }
        },
        status: {
            type: "string",
            example: "Released"
        },
        tagline: {
            type: "string",
            example: "Mischief. Mayhem. Soap."
        },
        title: {
            type: "string",
            example: "Fight Club"
        },
        video: {
            type: "boolean",
            example: false,
            default: true
        },
        vote_average: {
            type: "number",
            example: 8.433,
            default: 0
        },
        vote_count: {
            type: "integer",
            example: 26280,
            default: 0
        }
}