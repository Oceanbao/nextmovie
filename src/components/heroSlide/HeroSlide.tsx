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

import tmdbApi, { Category, TCategory, MovieType, TVideo, TMovieType, TTvType, TItemMovie, TItemTv } from '@lib/tmdbApi'
import apiConfig from '@lib/apiConfig'

export default function HeroSlide() {
  const [movieItems, setMovieItems] = useState<TItemMovie[]>([{}])
  const [modalId, setModalId] = useState(0)

  const handleModalId = (id?: number) => {
    if (id) setModalId(id)
  }

  const handleCloseModal = () => {
    setModalId(0)
  }

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 }
      try {
        const response = await tmdbApi.getMoviesList(MovieType.popular as TMovieType, { params })
        if (response.results) {
          console.log(response)
          setMovieItems(response.results.slice(1, 4))
          localStorage.setItem(MovieType.popular, JSON.stringify(response.results))
        }
      } catch {
        console.log('error')
      }
    }

    const stored = localStorage.getItem(MovieType.popular)
    if (stored) {
      const storedDecoded = JSON.parse(stored)
      setMovieItems(storedDecoded)
    } else {
      getMovies()
    }
  }, [])

  return (
    <div className={cn(s.heroSlide)}>
      <Swiper modules={[Autoplay]} grabCursor={true} spaceBetween={0} slidesPerView={1} autoplay={{ delay: 6000 }}>
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem item={item} className={cn({ [s.active]: isActive })} openModal={handleModalId} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {modalId && <TrailerModal id={modalId} active={modalId !== 0} closeModal={handleCloseModal} />}
    </div>
  )
}

interface IHeroSlideItem {
  item: TItemMovie
  className: string
  openModal: (id?: number) => void
}

const HeroSlideItem = (props: IHeroSlideItem) => {
  const router = useRouter()

  const item = props.item
  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path ?? '')
  // const background = '/demo_backdrop.jpg'

  return (
    <div className={cn(s.heroSlideItem, props.className)} style={{ backgroundImage: `url(${background})` }}>
      <div className={cn(s.heroSlideContent, 'box')}>
        <div className={cn(s.heroSlideInfo)}>
          <h2 className={cn(s.title)}>{item.title}</h2>
          <div className={cn(s.overview)}>{item.overview}</div>
          <div className={cn(s.btns)}>
            <Button onClick={() => router.push(`/movie/${item.id}`)}>Watch now</Button>
            <OutlineButton onClick={() => props.openModal(item.id)}>Watch trailer</OutlineButton>
          </div>
        </div>
        <div className={cn(s.heroSlidePoster)}>
          <img src={apiConfig.w500Image(item.poster_path ?? '')} alt="" />
          {/* <img src="/demo_backdrop.jpg" alt="" /> */}
        </div>
      </div>
    </div>
  )
}

const TrailerModal = ({ id, active, closeModal }: { id?: number; active: boolean; closeModal: () => void }) => {
  const [src, setSrc] = useState('')

  const setVideoSrc = async () => {
    const videos = await tmdbApi.getVideos(Category.movie as TCategory, id ?? -1)

    if (videos.results && videos.results.length > 0) {
      const videoSrc = `https://www.youtube.com/embed/${videos.results[0].key}`
      setSrc(videoSrc)
    }
  }

  useEffect(() => {
    setVideoSrc()
  }, [])

  const onClose = () => {
    setSrc('')
    closeModal()
  }

  return (
    <Modal active={active}>
      <ModalContent onClose={onClose}>
        {src && <iframe src={src} width="100%" height="500px" title="trailer"></iframe>}
      </ModalContent>
    </Modal>
  )
}
