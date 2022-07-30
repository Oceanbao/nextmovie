import { AxiosResponse, AxiosRequestConfig } from 'axios'
import axiosClient from './axiosClient'
import { z } from 'zod'

export const category = {
  movie: 'movie',
  tv: 'tv',
}

export const movieType = {
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
}

export const tvType = {
  popular: 'popular',
  top_rated: 'top_rated',
  on_the_air: 'on_the_air',
}

const ZItem = z
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

export type TItem = z.infer<typeof ZItem>

interface IResponse extends AxiosResponse {
  results?: TItem[]
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
  results?: TVideo[]
  total_pages?: number
}

const ZSearch = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .partial()

export type TSearch = z.infer<typeof ZSearch>

interface IResponseSearch extends AxiosResponse {
  results?: TSearch[]
  total_pages?: number
}

const tmdbApi = {
  getMoviesList: (type: keyof typeof movieType, params: AxiosRequestConfig<any>): Promise<IResponse> => {
    const url = `movie/${movieType[type]}`
    return axiosClient.get(url, params)
  },
  getTvList: (type: keyof typeof tvType, params: AxiosRequestConfig<any>): Promise<IResponse> => {
    const url = `tv/${tvType[type]}`
    return axiosClient.get(url, params)
  },
  getVideos: (cate: keyof typeof category, id?: number): Promise<IResponseVideo> => {
    const url = `${category[cate]}/${id}/videos`
    return axiosClient.get(url, { params: {} })
  },
  search: (cate: keyof typeof category, params: AxiosRequestConfig<any>): Promise<IResponseSearch> => {
    const url = `search/${category[cate]}`
    return axiosClient.get(url, params)
  },
  details: (cate: keyof typeof category, params: AxiosRequestConfig<any>, id?: number) => {
    const url = `${category[cate]}/${id}`
    return axiosClient.get(url, params)
  },
  credits: (cate: keyof typeof category, id?: number) => {
    const url = `${category[cate]}/${id}/credits`
    return axiosClient.get(url, { params: {} })
  },
  similar: (cate: keyof typeof category, id?: number): Promise<IResponse> => {
    const url = `${category[cate]}/${id}/similar`
    return axiosClient.get(url, { params: {} })
  },
}

export default tmdbApi
