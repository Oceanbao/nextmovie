import { useRouter } from 'next/router'

import PageHeader from '@components/pageHeader'
import MovieGrid from '@components/movieGrid'

import { Category as Cate, TCategory } from '@lib/tmdbApi'

export default function Category() {
  const { query, isReady } = useRouter()
  console.log('CATE: ', query.category)

  return (
    <>
      <PageHeader>{query.category === Cate.movie ? 'Movie' : 'Tv Series'}</PageHeader>
      <div className="box">
        <div className="section mb-12">{isReady && <MovieGrid category={query.category as TCategory} />}</div>
      </div>
    </>
  )
}
