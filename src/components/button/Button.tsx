import cn from 'clsx'
import s from './Button.module.css'

type ButtonProps = {
  outline?: boolean
  small?: boolean
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={cn(s.btn, { [s.btnOutline]: props.outline }, { [s.small]: props.small })}
      onClick={() => props.onClick?.()}
    >
      {props.children}
    </button>
  )
}

export const OutlineButton = (props: ButtonProps) => {
  return (
    <Button outline small={props.small} onClick={() => props.onClick?.()}>
      {props.children}
    </Button>
  )
}
