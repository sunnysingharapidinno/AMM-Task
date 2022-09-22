import styled from 'styled-components'
import { RotateContainerInterface } from '../../shared/shared'

export const InputContainer = styled.div<RotateContainerInterface>`
  .input0 {
    transition: transform 0.5s;
    transform: ${(props) => props.rotate && `translateY(112px)`};
  }
  .input1 {
    transition: transform 0.5s;
    transform: ${(props) => props.rotate && `translateY(-112px)`};
  }
`

export const TransactionSettingsContainer = styled.div`
  padding-bottom: 1rem 0rem;
  .column {
    display: flex;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
  }
`
