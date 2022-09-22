import styled from 'styled-components'
import { RotateContainerInterface } from '../shared'

export const ExpanderContainer = styled.div``

export const ExpanderHeader = styled.div<RotateContainerInterface>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .header {
    font-size: 1.2rem;
    font-weight: 700;
  }
`

export const ExpanderContent = styled.div<RotateContainerInterface>`
  transition: max-height 1s ease-in-out;
  max-height: ${({ rotate }) => (rotate ? '1200px' : `0`)};
  overflow: hidden;
`
