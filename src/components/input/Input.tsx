import cn from 'clsx'
import { ChangeEvent } from 'react'
import s from './Input.module.css'

interface InputProps {
  type: string
  placeholder: string
  value: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Input(props: InputProps) {
  return (
    <input
      className={cn(s.input)}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange ? e => props.onChange!(e) : undefined}
    />
  )
}
