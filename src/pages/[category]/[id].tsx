import { useRouter } from 'next/router'

import Detail from '@components/detail'
import { TCategory } from '@lib/tmdbApi'

export default function ContentPage() {
  const route = useRouter()

  const categoryLocal = route.query.category as TCategory
  const id = Number(route.query.id)

  console.log(categoryLocal)
  console.log(id)

  return <>{route.isReady && <Detail category={categoryLocal} id={id} />}</>
}
