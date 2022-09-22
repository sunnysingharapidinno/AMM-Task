import { ExpanderContainer, ExpanderContent, ExpanderHeader } from './styles'
import { HiOutlineChevronDown } from 'react-icons/hi'
import React, { useState } from 'react'
import { RotateContainer, Spacer } from '../shared'

interface ExpanderInterface {
  header?: (() => React.ReactNode) | string
  expanderIcon?: React.ReactNode
  children?: React.ReactNode
  open?: boolean
}

const Expander = (props: ExpanderInterface) => {
  const { header, children, expanderIcon, open } = props
  const [openContent, setOpenContent] = useState<boolean | null>(open ? open : null)

  return (
    <ExpanderContainer>
      <ExpanderHeader onClick={() => setOpenContent(!openContent)}>
        <div className="header">{typeof header === 'string' ? header : header && header()}</div>
        <RotateContainer rotate={Boolean(openContent)}>
          {expanderIcon ? expanderIcon : <HiOutlineChevronDown className="icon" />}
        </RotateContainer>
      </ExpanderHeader>
      <ExpanderContent rotate={Boolean(openContent)}>
        <Spacer margin="0.5rem">{children}</Spacer>
      </ExpanderContent>
    </ExpanderContainer>
  )
}

export default Expander
