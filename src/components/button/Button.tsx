import cn from 'clsx'
import s from './Button.module.css'

type ButtonProps = {
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

export default function Button(props: ButtonProps) {
  return (
    <button className={cn(s.btn, props.className && s[props.className])} onClick={() => props.onClick?.()}>
      {props.children}
    </button>
  )
}

export const OutlineButton = (props: ButtonProps) => {
  return (
    <Button className={cn(s.btnOutline, props.className && s[props.className])} onClick={() => props.onClick?.()}>
      {props.children}
    </Button>
  )
}
