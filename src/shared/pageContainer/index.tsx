import React from 'react'
import NavBar from '../navBar'

import { PageContainerStyled } from './style'

interface Props {
  children?: React.ReactNode
}

const PageContianer = ({ children }: Props) => {
  return (
    <PageContainerStyled>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
      <footer></footer>
    </PageContainerStyled>
  )
}

export default PageContianer
