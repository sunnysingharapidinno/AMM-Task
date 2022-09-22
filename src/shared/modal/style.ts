import styled, { keyframes, ThemeProps } from 'styled-components'
import { ModalInitialPositionInterface } from '.'
import { Theme } from '../../styles/theme'

interface ModalBodyInterface {
  show: boolean
}

export const ModalBody = styled.div<ModalBodyInterface>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: rgba(22, 27, 34, 0.6);
  animation-fill-mode: forwards;
`

export const ModalHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    font-weight: 600;
    font-size: 16px;
    line-height: 25px;
    margin: 0;
    @media (min-width: 700px) {
      font-size: 24px;
      line-height: 30px;
    }
  }

  .closeIcon {
    font-size: 1.5rem;
  }
`

interface ModalContentInterface {
  borderRadius?: string
  show?: boolean
  currentPosition?: ModalInitialPositionInterface
}

const ModalContentOpenAnimation = (props?: ModalInitialPositionInterface) => keyframes`
  0%{
    /* transform: translateX(${props?.x}px) translateY(${Number(props?.y)}px);             */
    transform: translateY(200vh);
    scale: 0;
  }
  100%{
    scale: 1;      
    transform: translate(0px, 0px);   
  }
`

const ModalContentCloseAnimation = (props?: ModalInitialPositionInterface) => keyframes`
  0%{  
    scale: 1;        
    transform: translate(0px, 0px);      
  }
  100%{
    /* transform: translateX(${props?.x}px) translateY(${Number(props?.y)}px);         */
    transform: translateY(200vh);
    scale: 0;
  }
`

export const ModalContent = styled.div<ModalContentInterface>`
  padding: 1.5rem;
  border-radius: ${(props) => props.borderRadius || `10px`};
  background-color: ${(props: ThemeProps<Theme>) => props.theme.background};
  position: absolute;
  animation: ${(props) =>
      props.show ? ModalContentOpenAnimation(props.currentPosition) : ModalContentCloseAnimation(props.currentPosition)}
    0.3s cubic-bezier(0.95, 0.83, 0.16, 0.24);
  width: 80%;
  animation-fill-mode: forwards;
  @media (min-width: 1200px) {
    width: 524px;
  }
`
