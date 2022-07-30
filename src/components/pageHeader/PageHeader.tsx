import cn from 'clsx'
import s from './PageHeader.module.css'

import bg from '@assets/footer-bg.jpg'

export default function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn(s.pageHeader)} style={{ backgroundImage: `url(${bg})` }}>
      <h2>{children}</h2>
    </div>
  )
}
