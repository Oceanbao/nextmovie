import '@styles/globals.css'

import { useEffect } from 'react'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
