import '@styles/globals.css'

import { useEffect } from 'react'
import type { AppProps } from 'next/app'

import Layout from '@components/layout'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
