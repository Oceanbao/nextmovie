import cn from 'clsx'
import Link from 'next/link'
import s from './MovieCard.module.css'

import Button from '@components/button'

import { Category, TCategory, TItemMovie, TItemTv } from '@lib/tmdbApi'
import apiConfig from '@lib/apiConfig'

interface MovieCardProps {
  item: TItemMovie | TItemTv
  category: TCategory
}

const getTitle = (item: TItemMovie | TItemTv) => {
  if ('title' in item) return item.title
  if ('name' in item) return item.name
}

const MovieCard = (props: MovieCardProps) => {
  const item = props.item

  const link = `/${Category[props.category]}/${item.id}`

  const bg = apiConfig.w500Image((item.poster_path || item.backdrop_path) ?? '')
  // const bg = '/demo_poster.jpg'

  return (
    <Link href={link}>
      <a>
        <div className={cn(s.movieCard)} style={{ backgroundImage: `url(${bg})` }}>
          <div className={cn(s.btnBox)}>
            <Button>
              <i className="fa-solid fa-play"></i>
            </Button>
          </div>
        </div>
        <h3 className="font-semibold text-lg">{getTitle(item)}</h3>
      </a>
    </Link>
  )
}

export default MovieCard
