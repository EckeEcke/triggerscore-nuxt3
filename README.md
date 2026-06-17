# TriggerScore (Nuxt 4)

TriggerScore is a multilingual movie rating platform focused on evaluating older films by their "trigger potential" (for example sexism, racism, cringe, and other factors).
Users can browse movies, view aggregated community scores, submit ratings/comments, and filter titles by streaming provider.

## Live Project

- Production: `https://www.triggerscore.netlify.app`

## Tech Stack

- Nuxt 4 + TypeScript
- Pinia
- Tailwind CSS
- Netlify Functions (serverless API)
- MongoDB Atlas
- TMDB API (movie metadata and provider data)
- `@nuxtjs/i18n` for localization

## Features

- Multilingual UI (`de`, `en`, `es`, `fr`, `us`)
- Aggregated trigger scores per movie:
- `rating_total`
- `rating_sexism`
- `rating_racism`
- `rating_others`
- `rating_cringe`
- Top 10 lists by score category
- Recent ratings and comments
- Provider-based filtering (Netflix, Prime, Disney+, WOW/Sky)
- Movie detail pages with similar titles and trailers
- Netlify contact form integration

## Project Structure

```txt
app/                 # Nuxt app (pages, components, store, plugins)
server/api/          # Nuxt server routes (TMDB proxy endpoints, image proxy)
netlify/functions/   # Serverless functions for scores, movies, providers, posting data
scripts/             # Utility scripts (e.g. TMDB sync for DB movie collections)
public/              # Static assets and animations
i18n/locales/        # Locale JSON files
```

## Prerequisites

- Node.js `22.14` (see `.nvmrc`)
- npm
- MongoDB Atlas database
- TMDB API key

## Environment Variables

Create a local `.env` file in the project root:

```bash
TMDB_API_KEY=your_tmdb_api_key
API_KEY=your_tmdb_api_key
DATABASE_PASSWORD=your_mongodb_password
DATABASE_NAME=triggerscore
NUXT_PUBLIC_IS_LOCAL=true
```

Notes:

- `TMDB_API_KEY` is used by Nuxt server routes/runtime config.
- `API_KEY` is used by Netlify functions and sync scripts.
- `DATABASE_PASSWORD` is used to connect to MongoDB Atlas.
- `DATABASE_NAME` is used by `scripts/syncMovies.js`.

## Installation

```bash
npm install
```

## Development

Start Nuxt dev server:

```bash
npm run dev
```

If you need Netlify Functions locally (`/.netlify/functions/*`), run with Netlify CLI:

```bash
npx netlify dev
```

Nuxt is configured to proxy function requests in development to:

- `http://localhost:8888/.netlify/functions/`

## Build and Preview

```bash
npm run build
npm run preview
```

Optional static generation:

```bash
npm run generate
```

## Data Sync Script

Sync localized movie metadata from TMDB into MongoDB collections:

```bash
npm run task:sync-movies
```

This script reads movie IDs from the `scores` collection and updates locale collections:

- `movies_en`
- `movies_us`
- `movies_fr`
- `movies_es`
- `movies_de`

## Key API Endpoints

### Netlify Functions

- `GET /.netlify/functions/fetchScoresAndTop10sAndStats`
- `GET /.netlify/functions/fetchMovies?locale=<de|en|es|fr|us>`
- `GET /.netlify/functions/fetchMovieById?id=<movieId>`
- `GET /.netlify/functions/fetchProviders?locale=<locale>`
- `POST /.netlify/functions/postData` (submit rating + comment)

### Nuxt Server API

- `GET /api/movie/:id?locale=<locale>`
- `GET /api/providers/:id`
- `GET /api/fetchSimilarMovies?movie_id=<id>&locale=<locale>`
- `GET /api/bondMovies?locale=<locale>`
- `GET /api/poster?poster_path=<tmdb_path>`
- `GET /api/og-image?poster_path=<tmdb_path>`

## Deployment

Project is set up for Netlify:

- Functions directory: `netlify/functions`
- Config file: `netlify.toml`

Set all required production environment variables in Netlify before deploy.

## License

No license file is currently defined in this repository.
