import cn from 'clsx'
import s from './PageHeader.module.css'

const bg = '/footer-bg.jpg'

export default function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn(s.pageHeader)} style={{ backgroundImage: `url(${bg})` }}>
      <h2 className="text-2xl font-bold">{children}</h2>
    </div>
  )
}
