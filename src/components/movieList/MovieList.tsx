import { useEffect, useState } from 'react'

import cn from 'clsx'
import s from './MovieList.module.css'

import { SwiperSlide, Swiper } from 'swiper/react'

import tmdbApi, { category, movieType, tvType } from '@lib/tmdbApi'

import MovieCard from '@components/movieCard'

type MovieListProps = {
  id?: number
  category: string
  type: string
}

const MovieList = (props: MovieListProps) => {
  const [items, setItems] = useState([{}])

  useEffect(() => {
    const getList = async () => {
      let response = null
      const params = {}

      if (props.type !== 'similar') {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type as keyof typeof movieType, { params })
            break
          default:
            response = await tmdbApi.getTvList(props.type as keyof typeof tvType, { params })
        }
      } else {
        response = await tmdbApi.similar(props.category as keyof typeof category, props.id)
      }
      if (response.results) setItems(response.results)
    }
    getList()
  }, [])

  return (
    <div className={cn(s.movieList)}>
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category as keyof typeof category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MovieList
