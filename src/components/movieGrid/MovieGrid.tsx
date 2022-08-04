import { useRouter } from 'next/router'
import { useEffect, useState, useCallback } from 'react'
import cn from 'clsx'
import s from './MovieGrid.module.css'

import MovieCard from '@components/movieCard'
import Button, { OutlineButton } from '@components/button'
import Input from '@components/input'

import tmdbApi, { Category, TCategory, TMovieType, TTvType, MovieType, TvType } from '@lib/tmdbApi'

interface MovieGridProps {
  category: TCategory
}

export default function MovieGrid(props: MovieGridProps) {
  console.log('--------- RENDER -----------')

  const [items, setItems] = useState([{}])

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const route = useRouter()
  const keyword = route.query.keyword as string
  console.log('keyword: ', keyword)

  useEffect(() => {
    const getList = async () => {
      let response = null
      if (keyword === undefined) {
        const params = {}
        switch (props.category) {
          case Category.movie:
            response = await tmdbApi.getMoviesList(MovieType.upcoming as TMovieType, { params })
            break
          default:
            response = await tmdbApi.getTvList(TvType.popular as TTvType, { params })
        }
      } else {
        const params = {
          query: keyword,
        }
        response = await tmdbApi.search(props.category, { params })
        console.log('fetched-response: ', response)
      }

      const dataStored = { results: response.results, totalPage: response.total_pages }
      if (keyword === undefined) {
        localStorage.setItem(props.category, JSON.stringify(dataStored))
      } else {
        localStorage.setItem(keyword, JSON.stringify(dataStored))
      }
      console.log('fetched')

      setItems(response.results ?? [])
      setTotalPage(response.total_pages ?? 0)
    }

    if (keyword === undefined) {
      const stored = localStorage.getItem(props.category)
      if (stored) {
        const { results, totalPage } = JSON.parse(stored)
        console.log('setItem-cate-stored: ', results)
        setItems(results)
        setTotalPage(totalPage)
      } else {
        console.log('getList')
        getList()
      }
    } else {
      const stored = localStorage.getItem(keyword)
      if (stored) {
        const { results, totalPage } = JSON.parse(stored)
        console.log('setItem-search-stored: ', results)
        setItems(results)
        setTotalPage(totalPage)
      } else {
        getList()
      }
    }
  }, [keyword, props.category])

  const loadMore = async () => {
    let response = null
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      }
      switch (props.category) {
        case Category.movie:
          response = await tmdbApi.getMoviesList(MovieType.upcoming as TMovieType, { params })
          break
        default:
          response = await tmdbApi.getTvList(TvType.popular as TTvType, { params })
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      }
      response = await tmdbApi.search(props.category, { params })
    }
    setItems([...items, ...(response.results ?? [])])
    setPage(page + 1)
  }

  console.log('items: ', items)

  return (
    <>
      <div className="section mb-12">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className={cn(s.movieGrid)}>
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className={cn(s.loadMore)}>
          <OutlineButton small onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  )
}

interface MovieSearchProps {
  category: TCategory
  keyword?: string
}

const MovieSearch = (props: MovieSearchProps) => {
  const router = useRouter()

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '')

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      router.push(`/${Category[props.category]}/search/${keyword}`)
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
    <div className={cn(s.search)}>
      <Input type="text" placeholder="Enter keyword" value={keyword} onChange={e => setKeyword(e.target.value)} />
      <Button small onClick={goToSearch}>
        Search
      </Button>
    </div>
  )
}
