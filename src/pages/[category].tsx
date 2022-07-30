import { useRouter } from 'next/router'

import PageHeader from '@components/pageHeader'
import MovieGrid from '@components/movieGrid'

import { category as cate } from '@lib/tmdbApi'

export default function Category() {
  const { category } = useRouter().query

  return (
    <>
      <PageHeader>{category === cate.movie ? 'Movie' : 'Tv Series'}</PageHeader>
      <div className="container">
        <div className="section mb-12">
          <MovieGrid category={category as keyof typeof cate} />
        </div>
      </div>
    </>
  )
}
