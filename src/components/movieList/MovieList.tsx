import { useEffect, useState } from 'react'

import cn from 'clsx'
import s from './MovieList.module.css'

import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css'

import tmdbApi, { Category, TCategory, TMovieType, TTvType } from '@lib/tmdbApi'

import MovieCard from '@components/movieCard'

type MovieListProps = {
  id?: number
  category: TCategory
  type: string | TMovieType | TTvType
}

const MovieList = (props: MovieListProps) => {
  const [items, setItems] = useState([{}])

  useEffect(() => {
    const getList = async () => {
      let response = null
      const params = {}

      if (props.type !== 'similar') {
        switch (props.category) {
          case Category.movie:
            response = await tmdbApi.getMoviesList(props.type as TMovieType, { params })
            break
          default:
            response = await tmdbApi.getTvList(props.type as TTvType, { params })
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id!)
      }
      if (response.results) setItems(response.results)
    }
    getList()
  }, [props.category, props.id, props.type])

  return (
    <div className={cn(s.movieList)}>
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {items.map((item, i) => (
          <SwiperSlide key={i} className="!w-[40%] md:!w-[30%] lg:!w-[15%]">
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MovieList
