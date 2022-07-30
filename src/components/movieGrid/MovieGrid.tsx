import { useRouter } from 'next/router'
import { useEffect, useState, useCallback } from 'react'
import cn from 'clsx'
import s from './MovieGrid.module.css'

import MovieCard from '@components/movieCard'
import Button, { OutlineButton } from '@components/button'
import Input from '@components/input'

import tmdbApi, { category, movieType, tvType } from '@lib/tmdbApi'

interface MovieGridProps {
  category: string
}

export default function MovieGrid(props: MovieGridProps) {
  const [items, setItems] = useState([{}])

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const keyword = useRouter().query.keyword as string

  useEffect(() => {
    const getList = async () => {
      let response = null
      if (keyword === undefined) {
        const params = {}
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming as keyof typeof movieType, { params })
            break
          default:
            response = await tmdbApi.getTvList(tvType.popular as keyof typeof tvType, { params })
        }
      } else {
        const params = {
          query: keyword,
        }
        response = await tmdbApi.search(props.category as keyof typeof category, { params })
      }
      setItems(response.results ?? [])
      setTotalPage(response.total_pages ?? 0)

      console.log('setting', response.results)
      localStorage.setItem(props.category, JSON.stringify(response.results))
    }

    const stored = localStorage.getItem(props.category)
    if (stored) {
      const storedDecoded = JSON.parse(stored)
      setItems(storedDecoded)
      setTotalPage(13000)
    } else {
      getList()
    }
  }, [props.category, keyword])

  const loadMore = async () => {
    let response = null
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      }
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming as keyof typeof movieType, { params })
          break
        default:
          response = await tmdbApi.getTvList(tvType.popular as keyof typeof tvType, { params })
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      }
      response = await tmdbApi.search(props.category as keyof typeof category, { params })
    }
    setItems([...items, ...(response.results ?? [])])
    setPage(page + 1)
  }

  return (
    <>
      <div className="section mb-12">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className={cn(s.movieGrid)}>
        {items.map((item, i) => (
          <MovieCard category={props.category as keyof typeof category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className={cn(s.loadMore)}>
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  )
}

interface MovieSearchProps {
  category: string
  keyword?: string
}

const MovieSearch = (props: MovieSearchProps) => {
  const router = useRouter()

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '')

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      router.push(`/${category[props.category as keyof typeof category]}/search/${keyword}`)
    }
  }, [keyword, props.category])

  useEffect(() => {
    const enterEvent = (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.code === 'Enter') {
        goToSearch()
      }
    }
    document.addEventListener('keyup', enterEvent)
    return () => {
      document.removeEventListener('keyup', enterEvent)
    }
  }, [keyword, goToSearch])

  return (
    <div className="movie-search">
      <Input type="text" placeholder="Enter keyword" value={keyword} onChange={e => setKeyword(e.target.value)} />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  )
}
