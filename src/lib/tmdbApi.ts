import { AxiosResponse, AxiosRequestConfig } from 'axios'
import axiosClient from './axiosClient'
import { z } from 'zod'

export const Category = {
  movie: 'movie',
  tv: 'tv',
}

export type TCategory = keyof typeof Category

export const MovieType = {
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
}

export type TMovieType = keyof typeof MovieType

export const TvType = {
  popular: 'popular',
  top_rated: 'top_rated',
  on_the_air: 'on_the_air',
}

export type TTvType = keyof typeof TvType

const ZItemMovie = z
  .object({
    poster_path: z.string(),
    adult: z.boolean(),
    overview: z.string(),
    release_date: z.string(),
    genre_id: z.array(z.number()),
    id: z.number(),
    original_title: z.string(),
    original_language: z.string(),
    title: z.string(),
    backdrop_path: z.string(),
    popularity: z.number(),
    vote_count: z.number(),
    video: z.boolean(),
    vote_average: z.number(),
  })
  .partial()

export type TItemMovie = z.infer<typeof ZItemMovie>

interface IResponseMovie extends AxiosResponse {
  results?: TItemMovie[]
  total_pages?: number
}

const ZItemTv = z
  .object({
    poster_path: z.string().nullable(),
    popularity: z.number(),
    id: z.number(),
    backdrop_path: z.string().nullable(),
    vote_average: z.number(),
    overview: z.string(),
    first_air_date: z.string(),
    origin_country: z.array(z.string()),
    genre_id: z.array(z.number()),
    original_language: z.string(),
    vote_count: z.number(),
    name: z.string(),
    original_name: z.string(),
  })
  .partial()

export type TItemTv = z.infer<typeof ZItemTv>

interface IResponseTv extends AxiosResponse {
  results?: TItemTv[]
  total_pages?: number
}

const ZVideo = z
  .object({
    iso_639_1: z.string(),
    iso_3166_1: z.string(),
    name: z.string(),
    key: z.string(),
    site: z.string(),
    size: z.number(),
    type: z.string(),
    official: z.boolean(),
    published_at: z.string(),
    id: z.string(),
  })
  .partial()

export type TVideo = z.infer<typeof ZVideo>

interface IResponseVideo extends AxiosResponse {
  id?: number
  results?: TVideo[]
}

const ZSearch = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .partial()

export type TSearch = z.infer<typeof ZSearch>

interface IResponseSearch extends AxiosResponse {
  page?: number
  results?: TSearch[]
  total_pages?: number
  total_results?: number
}

const ZCredits = z
  .object({
    adult: z.boolean(),
    gender: z.number().nullable(),
    id: z.number(),
    known_for_department: z.string(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number(),
    profile_path: z.string().nullable(),
    cast_id: z.number(),
    character: z.string(),
    credit_id: z.string(),
    order: z.number(),
  })
  .partial()

export type TCredit = z.infer<typeof ZCredits>

interface IResponseCredit extends AxiosResponse {
  id?: number
  cast?: TCredit[]
}

const ZDetailsMovie = z
  .object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    belongs_to_collection: z.object({}).nullable(),
    budget: z.number(),
    genres: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    ),
    homepage: z.string().nullable(),
    id: z.number(),
    imdb_id: z.string().nullable(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string().nullable(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    production_companies: z.array(
      z.object({
        name: z.string(),
        id: z.number(),
        logo_path: z.string().nullable(),
        origin_country: z.string(),
      })
    ),
    production_countries: z.array(
      z.object({
        iso_3166_1: z.string(),
        name: z.string(),
      })
    ),
    release_date: z.string(),
    revenue: z.number(),
    runtime: z.number().nullable(),
    spoken_languages: z.array(
      z.object({
        iso_639_1: z.string(),
        name: z.string(),
      })
    ),
    status: z.string(),
    tagline: z.string().nullable(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
  })
  .partial()

export type TDetailsMovie = z.infer<typeof ZDetailsMovie>

const ZDetailsTv = z
  .object({
    backdrop_path: z.string().nullable(),
    created_by: z.array(
      z.object({
        id: z.number(),
        credit_id: z.string(),
        name: z.string(),
        gender: z.number(),
        profile_path: z.string().nullable(),
      })
    ),
    episode_run_time: z.array(z.number()),
    first_air_date: z.string(),
    genres: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    ),
    homepage: z.string(),
    id: z.number(),
    in_production: z.boolean(),
    languages: z.array(z.string()),
    last_air_date: z.string(),
    last_episode_to_air: z.object({
      air_date: z.string(),
      episode_number: z.number(),
      id: z.number(),
      name: z.string(),
      overview: z.string(),
      production_code: z.string(),
      season_number: z.number(),
      still_path: z.string().nullable(),
      vote_average: z.number(),
      vote_count: z.number(),
    }),
    name: z.string(),
    networks: z.array(
      z.object({
        name: z.string(),
        id: z.number(),
        logo_path: z.string().nullable(),
        origin_country: z.string(),
      })
    ),
    number_of_episodes: z.number(),
    number_of_seasons: z.number(),
    origin_country: z.array(z.string()),
    original_language: z.string(),
    original_name: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    production_companies: z.array(
      z.object({
        id: z.number(),
        logo_path: z.string().nullable(),
        name: z.string(),
        origin_country: z.string(),
      })
    ),
    production_countries: z.array(
      z.object({
        iso_3166_1: z.string(),
        name: z.string(),
      })
    ),
    seasons: z.array(
      z.object({
        air_date: z.string(),
        episode_count: z.number(),
        id: z.number(),
        name: z.string(),
        overview: z.string(),
        poster_path: z.string(),
        season_number: z.number(),
      })
    ),
    spoken_languages: z.array(
      z.object({
        english_name: z.string(),
        iso_639_1: z.string(),
        name: z.string(),
      })
    ),
    status: z.string(),
    tagline: z.string(),
    type: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
  })
  .partial()

export type TDetailsTv = z.infer<typeof ZDetailsTv>

const tmdbApi = {
  getMoviesList: (type: TMovieType, params: AxiosRequestConfig<any>): Promise<IResponseMovie> => {
    const url = `movie/${MovieType[type]}`
    return axiosClient.get(url, params)
  },
  getTvList: (type: TTvType, params: AxiosRequestConfig<any>): Promise<IResponseTv> => {
    const url = `tv/${TvType[type]}`
    return axiosClient.get(url, params)
  },
  getVideos: (cate: TCategory, id: number): Promise<IResponseVideo> => {
    const url = `${Category[cate]}/${id}/videos`
    return axiosClient.get(url, { params: {} })
  },
  details: (cate: TCategory, id: number, params: AxiosRequestConfig<any>): Promise<TDetailsMovie | TDetailsTv> => {
    const url = `${Category[cate]}/${id}`
    return axiosClient.get(url, params)
  },
  credits: (cate: TCategory, id: number): Promise<IResponseCredit> => {
    const url = `${Category[cate]}/${id}/credits`
    return axiosClient.get(url, { params: {} })
  },
  similar: (cate: TCategory, id: number): Promise<IResponseMovie | IResponseTv> => {
    const url = `${Category[cate]}/${id}/similar`
    return axiosClient.get(url, { params: {} })
  },
  search: (cate: TCategory, params: AxiosRequestConfig<any>): Promise<IResponseSearch> => {
    const url = `search/${Category[cate]}`
    return axiosClient.get(url, params)
  },
}

export default tmdbApi
