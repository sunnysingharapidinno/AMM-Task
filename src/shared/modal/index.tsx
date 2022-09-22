import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ModalBody, ModalContent, ModalHead } from './style'
import { IoMdClose } from 'react-icons/io'

/* 
  This modal component is attached directly to the <body> element of the html file, 
  this behavior is only triggered when modal is opened.
*/

export interface ModalInitialPositionInterface {
  x: number | null
  y: number | null
}

interface ModalInterface {
  show: boolean
  toggleModal?: (show: boolean) => void
  borderRadius?: string
  heading?: string
  styles?: React.CSSProperties
  children?: React.ReactNode
  // currentPosition?: ModalInitialPositionInterface
  // currentPosition?: React.LegacyRef<HTMLDivElement> | undefined
}

const Modal = (props: ModalInterface) => {
  const { show, toggleModal, borderRadius, heading, styles, children } = props

  const handleClickOutside = (e: any) => {
    if (e.target === e.currentTarget && toggleModal) {
      toggleModal(false)
    }
  }

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (show) {
      setOpen(true)
    } else {
      setTimeout(() => {
        setOpen(false)
      }, 400)
    }
  }, [show])

  if (open) {
    return createPortal(
      <ModalBody show={open} onMouseDown={handleClickOutside} style={styles}>
        <ModalContent borderRadius={borderRadius} show={show} /* currentPosition={currentPosition} */>
          <ModalHead>
            <h2>{heading}</h2>
            <IoMdClose className="closeIcon" onClick={() => toggleModal && toggleModal(!show)} />
          </ModalHead>

          {children}
        </ModalContent>
      </ModalBody>,
      document.body
    )
  } else {
    return <></>
  }
}
export default Modal
