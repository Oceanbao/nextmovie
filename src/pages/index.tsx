import Link from 'next/link'

import { OutlineButton } from '@components/button'
import HeroSlide from '@components/heroSlide'
import MovieList from '@components/movieList'

import { Category, MovieType, TCategory, TvType } from '@lib/tmdbApi'

export default function Home() {
  return (
    <>
      <HeroSlide />

      <div className="box">
        <div className="section mb-12">
          <div className="section-header mb-8">
            <h2 className="text-xl font-bold">Trending Movies</h2>
            <Link href="/movie" passHref>
              <a>
                <OutlineButton small>View more</OutlineButton>
              </a>
            </Link>
          </div>
          <MovieList category={Category.movie as TCategory} type={MovieType.popular} />
        </div>

        <div className="section mb-12">
          <div className="section-header mb-8">
            <h2 className="text-xl font-bold">Top Rated Movies</h2>
            <Link href="/movie" passHref>
              <a>
                <OutlineButton small>View more</OutlineButton>
              </a>
            </Link>
          </div>
          <MovieList category={Category.movie as TCategory} type={MovieType.top_rated} />
        </div>

        <div className="section mb-12">
          <div className="section-header mb-8">
            <h2 className="text-xl font-bold">Trending TV</h2>
            <Link href="/tv" passHref>
              <a>
                <OutlineButton small>View more</OutlineButton>
              </a>
            </Link>
          </div>
          <MovieList category={Category.tv as TCategory} type={TvType.popular} />
        </div>

        <div className="section mb-12">
          <div className="section-header mb-8">
            <h2 className="text-xl font-bold">Top Rated TV</h2>
            <Link href="/tv" passHref>
              <a>
                <OutlineButton small>View more</OutlineButton>
              </a>
            </Link>
          </div>
          <MovieList category={Category.tv as TCategory} type={TvType.top_rated} />
        </div>
      </div>
    </>
  )
}

Home
