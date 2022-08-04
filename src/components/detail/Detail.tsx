import cn from 'clsx'
import s from './Detail.module.css'

import tmdbApi, { TCategory, TDetailsMovie, TDetailsTv } from '@lib/tmdbApi'
import apiConfig from '@lib/apiConfig'

import CastList from './CastList'
import VideoList from './VideoList'

import MovieList from '@components/movieList'
import { useEffect, useState } from 'react'

interface Props {
  category: TCategory
  id: number
}

const Detail = (props: Props) => {
  const [item, setItem] = useState<TDetailsMovie | TDetailsTv>()

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.details(props.category, props.id, { params: {} })
      setItem(response)
      window.scrollTo(0, 0)
    }
    getDetail()
  }, [props.category, props.id])

  const handleBgImg = (item: TDetailsMovie | TDetailsTv) => {
    if (item.backdrop_path) return apiConfig.originalImage(item.backdrop_path)
    if (item.poster_path) return apiConfig.originalImage(item.poster_path)
    return '/demo_poster.jpg'
  }

  const getTitle = (item: TDetailsMovie | TDetailsTv) => {
    if ('name' in item) return item.name
    if ('title' in item) return item.title
  }

  return (
    <>
      {item && (
        <>
          <div className={cn(s.banner)} style={{ backgroundImage: `url(${handleBgImg(item)})` }}></div>
          <div className={cn(s.content, 'box')}>
            <div className={cn(s.poster)}>
              <div className={cn(s.posterImg)} style={{ backgroundImage: `url(${handleBgImg(item)})` }}></div>
            </div>
            <div className={cn(s.info)}>
              <h1 className={cn(s.title)}>{getTitle(item)}</h1>
              <div className={cn(s.genre)}>
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className={cn(s.genreItem)}>
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className={cn(s.overview)}>{item.overview}</p>
              <div className="cast">
                <div className="section-header">
                  <h2 className="font-bold text-xl">Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className="box">
            <div className="section mb-12">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-12">
              <div className="section-header mb-8">
                <h2 className="font-bold text-xl">Similar</h2>
              </div>
              <MovieList category={props.category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Detail
