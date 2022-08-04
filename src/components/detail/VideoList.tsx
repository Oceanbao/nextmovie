import { useEffect, useRef, useState } from 'react'

import tmdbApi, { TVideo } from '@lib/tmdbApi'

type VideoProps = {
  item?: TVideo
  id?: number
}

const VideoList = (props: VideoProps) => {
  const category = 'movie'

  const [videos, setVideos] = useState([{}])

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await tmdbApi.getVideos(category, props.id!)
        if (res.results) {
          setVideos(res.results.slice(0, 5))
          // localStorage.setItem(cateogry)
        }
      } catch {
        console.log('error')
      }
    }
    getVideos()
  }, [category, props.id])

  return (
    <>
      {videos.map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </>
  )
}

const Video = (props: VideoProps) => {
  const item = props.item!

  return (
    <div className="video mb-[3rem]">
      <div className="title mb-[1.5rem]">
        <h2 className="font-bold text-xl">{item.name}</h2>
      </div>
      <iframe
        className="h-[56vh]"
        src={`https://www.youtube.com/embed/${item.key}`}
        width="100%"
        title="video"
      ></iframe>
    </div>
  )
}

export default VideoList
