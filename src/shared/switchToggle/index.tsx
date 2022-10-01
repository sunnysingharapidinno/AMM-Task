import React from 'react'
import { SwitchToggleContainer } from './style'

type Props = {}

const SwitchToggle = (props: Props) => {
  return (
    <SwitchToggleContainer>
      <input type="checkbox" id="switch" />
      <label htmlFor="switch">Toggle</label>
    </SwitchToggleContainer>
  )
}

export default SwitchToggle
