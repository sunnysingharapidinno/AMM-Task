import { ExpanderContainer, ExpanderContent, ExpanderHeader } from './styles'
import { HiOutlineChevronDown } from 'react-icons/hi'
import React, { useState } from 'react'
import { RotateContainer, Spacer } from '../shared'

interface ExpanderInterface {
  header?: (() => React.ReactNode) | string
  expanderIcon?: React.ReactNode
  children?: React.ReactNode
}

const Expander = (props: ExpanderInterface) => {
  const { header, children, expanderIcon } = props
  const [openContent, setOpenContent] = useState<boolean>()

  return (
    <ExpanderContainer>
      <ExpanderHeader onClick={() => setOpenContent(!openContent)}>
        <div className="header">{typeof header === 'string' ? header : header && header()}</div>
        <RotateContainer rotate={openContent}>
          {expanderIcon ? expanderIcon : <HiOutlineChevronDown className="icon" />}
        </RotateContainer>
      </ExpanderHeader>
      <ExpanderContent rotate={openContent}>
        <Spacer margin="0.5rem">{children}</Spacer>
      </ExpanderContent>
    </ExpanderContainer>
  )
}

export default Expander
