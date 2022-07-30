import Link from 'next/link'

import { OutlineButton } from '@components/button'
import HeroSlide from '@components/heroSlide'
import MovieList from '@components/movieList'

import { category, movieType, tvType } from '@lib/tmdbApi'

export default function Home() {
  return (
    <>
      <HeroSlide />

      <div className="container">
        <div className="section mb-12">
          <div className="section-header mb-8">
            <h2>Trending Movies</h2>
            <Link href="/movie" passHref>
              <a>
                <OutlineButton className="small">View more</OutlineButton>
              </a>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-12">
          <div className="section-header mb-8">
            <h2>Top Rated Movies</h2>
            <Link href="/movie" passHref>
              <a>
                <OutlineButton className="small">View more</OutlineButton>
              </a>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-12">
          <div className="section-header mb-8">
            <h2>Trending TV</h2>
            <Link href="/tv" passHref>
              <a>
                <OutlineButton className="small">View more</OutlineButton>
              </a>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>

        <div className="section mb-12">
          <div className="section-header mb-8">
            <h2>Top Rated TV</h2>
            <Link href="/tv" passHref>
              <a>
                <OutlineButton className="small">View more</OutlineButton>
              </a>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
      </div>
    </>
  )
}

Home
