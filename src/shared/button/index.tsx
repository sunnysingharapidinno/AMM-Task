import React from 'react'

import { CircularButtonStyled, NormalButtonStyled } from './style'

interface ButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'button' | 'icon-button'
  children?: React.ReactNode
  loading?: boolean
}

const Button: React.FC<ButtonInterface> = (props) => {
  const { buttonType, children, loading } = props
  if (buttonType === 'icon-button') {
    return <CircularButtonStyled {...props}>{children}</CircularButtonStyled>
  }

  return (
    <NormalButtonStyled {...props}>
      {/* {!loading && <CircularLoad size={0.5} />} */}
      {children}
    </NormalButtonStyled>
  )
}

export default Button
