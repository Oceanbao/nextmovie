import cn from 'clsx'
import React, { useRef } from 'react'
import s from './Modal.module.css'

type ModalProps = {
  active: boolean
  children: React.ReactNode
}

export default function Modal(props: ModalProps) {
  return <div className={cn(s.modal, { [s.active]: props.active })}>{props.children}</div>
}

type ModalContentProps = {
  onClose?: () => void
  children: React.ReactNode
}

export function ModalContent(props: ModalContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  const closeModal = () => {
    const elem = contentRef.current!.parentNode as HTMLElement
    elem.classList.remove(cn(s.active))
    if (props.onClose) props.onClose()
  }

  return (
    <div ref={contentRef} className={cn(s.modalContent)}>
      {props.children}
      <div className={cn(s.modalContentClose)} onClick={closeModal}>
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  )
}
