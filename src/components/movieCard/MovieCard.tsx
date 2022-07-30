import cn from 'clsx'
import Link from 'next/link'
import s from './MovieCard.module.css'

import Button from '@components/button'

import { category, TItem } from '@lib/tmdbApi'
import apiConfig from '@lib/apiConfig'

interface MovieCardProps {
  item: TItem
  category: keyof typeof category
}

const MovieCard = (props: MovieCardProps) => {
  const item = props.item

  const link = `/${category[props.category]}/${item.id}`

  // const bg = apiConfig.w500Image((item.poster_path || item.backdrop_path) ?? '')
  const bg = '/demo_poster.jpg'

  return (
    <Link href={link}>
      <a>
        <div className={cn(s.movieCard)} style={{ backgroundImage: `url(${bg})` }}>
          <Button>
            <i className="fa-solid fa-play"></i>
          </Button>
        </div>
        <h3>{item.title ?? 'N/A'}</h3>
      </a>
    </Link>
  )
}

export default MovieCard
