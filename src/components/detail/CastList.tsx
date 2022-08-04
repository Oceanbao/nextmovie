import { useEffect, useState } from 'react'

import tmdbApi, { TCredit } from '@lib/tmdbApi'
import apiConfig from '@lib/apiConfig'

interface Props {
  id?: number
}

const CastList = (props: Props) => {
  const category = 'movie'

  const [casts, setCasts] = useState<TCredit[]>([{}])

  useEffect(() => {
    const getCredits = async () => {
      try {
        const res = await tmdbApi.credits(category, props.id!)
        if (res.cast) {
          setCasts(res.cast.slice(0, 5))
        }
      } catch {
        console.log('error')
      }
    }
    getCredits()
  }, [category, props.id])

  const handleProfilePath = (item: TCredit) => {
    if (item.profile_path) return apiConfig.w500Image(item.profile_path)
    return '/demo_poster.jpg'
  }

  return (
    <div
      className="casts"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
        gap: '10px',
      }}
    >
      {casts.map((item, i) => (
        <div key={i} className="item">
          <div
            className="img pt-[160px] mb-[0.5rem] bg-cover"
            style={{ backgroundImage: `url(${handleProfilePath(item)})` }}
          ></div>
          <p className="name text-[0.8rem]">{item.name}</p>
        </div>
      ))}
    </div>
  )
}

export default CastList
