import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import cn from 'clsx'
import s from './HeroSlide.module.css'

import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'

import Button, { OutlineButton } from '@components/button'
import Modal, { ModalContent } from '@components/modal'

import tmdbApi, { category, movieType, TItem, TVideo } from '@lib/tmdbApi'
import apiConfig from '@lib/apiConfig'

export default function HeroSlide() {
  const [movieItems, setMovieItems] = useState([{}])

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 }
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular as keyof typeof movieType, { params })
        if (response.results) {
          console.log(response)
          setMovieItems(response.results.slice(1, 4))
          localStorage.setItem(movieType.popular, JSON.stringify(response.results))
        }
      } catch {
        console.log('error')
      }
    }

    const stored = localStorage.getItem(movieType.popular)
    if (stored) {
      const storedDecoded = JSON.parse(stored)
      setMovieItems(storedDecoded)
    } else {
      getMovies()
    }
  }, [])

  return (
    <div className={cn(s.heroSlide)}>
      <Swiper modules={[Autoplay]} grabCursor={true} spaceBetween={0} slidesPerView={1}>
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => <HeroSlideItem item={item} className={cn({ [s.active]: isActive })} />}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  )
}

interface IHeroSlideItem {
  item: TItem
  className: string
}

const HeroSlideItem = (props: IHeroSlideItem) => {
  const router = useRouter()

  const item = props.item
  // const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path ?? '')
  const background = '/demo_backdrop.jpg'

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`)
    const videos = await tmdbApi.getVideos(category.movie as keyof typeof category, item.id)

    if (videos.results && videos.results.length > 0) {
      const videoSrc = `https://www.youtube/com/embed/${videos.results[0].key}`
      modal!.querySelector(`.${cn(s.modalContent)} > iframe`)!.setAttribute('src', videoSrc)
    } else {
      modal!.querySelector(`.${cn(s.modalContent)}`)!.innerHTML = 'No trailer'
    }

    modal?.classList.toggle('active')
  }

  return (
    <div className={cn(s.heroSlideItem, props.className)} style={{ backgroundImage: `url(${background})` }}>
      <div className={cn(s.heroSlideContent, 'container')}>
        <div className={cn(s.heroSlideInfo)}>
          <h2 className={cn(s.title)}>{item.title}</h2>
          <div className={cn(s.overview)}>{item.overview}</div>
          <div className={cn(s.btns)}>
            <Button onClick={() => router.push(`/movie/${item.id}`)}>Watch now</Button>
            <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
          </div>
        </div>
        <div className={cn(s.heroSlidePoster)}>
          {/* <img src={apiConfig.w500Image(item.poster_path ?? '')} alt="" /> */}
          <img src="/demo_backdrop.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

type TrailerModalProps = {
  item: TVideo
}

const TrailerModal = (props: TrailerModalProps) => {
  const item = props.item

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const onClose = () => iframeRef.current!.setAttribute('src', '')

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
      </ModalContent>
    </Modal>
  )
}
