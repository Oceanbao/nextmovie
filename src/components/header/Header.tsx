import Image from 'next/image'
import Link from 'next/link'

import cn from 'clsx'
import s from './Header.module.css'

import logo from '@assets/tmovie.png'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const NAV = [
  {
    display: 'Home',
    path: '/',
  },
  {
    display: 'Movies',
    path: '/movie',
  },
  {
    display: 'TV Series',
    path: '/tv',
  },
]

export default function Header() {
  const route = useRouter()

  const headerRef = useRef<HTMLDivElement>(null)

  const active = NAV.findIndex(e => e.path === route.asPath)

  useEffect(() => {
    const headerRefLocal = headerRef.current

    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRefLocal?.classList.add(`${s.rollup}`)
      } else {
        headerRefLocal?.classList.remove(`${s.rollup}`)
      }
    }

    window.addEventListener('scroll', shrinkHeader)

    return () => {
      window.removeEventListener('scroll', shrinkHeader)
    }
  }, [])

  return (
    <div ref={headerRef} className={cn(s.header)}>
      <div className={cn('container', s.wrap)}>
        <div className={cn(s.logo)}>
          <Image src={logo} alt="" />
          <Link href="/">
            <a>tMovies</a>
          </Link>
        </div>
        <ul className={cn(s.nav)}>
          {NAV.map((e, i) => (
            <li key={i} className={cn(s.list, { [s.active]: i === active })}>
              <Link href={e.path}>
                <a>{e.display}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
