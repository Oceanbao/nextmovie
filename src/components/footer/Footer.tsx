import Image from 'next/image'
import cn from 'clsx'
import Link from 'next/link'
import s from './Footer.module.css'

import bg from '@assets/footer-bg.jpg'
import logo from '@assets/tmovie.png'

export default function Footer() {
  return (
    <div className={cn(s.footer)} style={{ backgroundImage: `url(${bg}))` }}>
      <div className={cn(s.content, 'container')}>
        <div className={cn(s.contentLogo)}>
          <div className={cn(s.logo)}>
            <Image src={logo} alt="" />
            <Link href="/">
              <a>tMovies</a>
            </Link>
          </div>
        </div>

        <div className={cn(s.contentMenus)}>
          <div className={cn(s.menu)}>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/">
              <a>Contact us</a>
            </Link>
            <Link href="/">
              <a>Term of services</a>
            </Link>
            <Link href="/">
              <a>About us</a>
            </Link>
          </div>
          <div className={cn(s.menu)}>
            <Link href="/">
              <a>Live</a>
            </Link>
            <Link href="/">
              <a>FAQ</a>
            </Link>
            <Link href="/">
              <a>Premium</a>
            </Link>
            <Link href="/">
              <a>Privacy</a>
            </Link>
          </div>
          <div className={cn(s.menu)}>
            <Link href="/">
              <a>Must watch</a>
            </Link>
            <Link href="/">
              <a>Recent release</a>
            </Link>
            <Link href="/">
              <a>Top IMDB</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
