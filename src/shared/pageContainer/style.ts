import styled from 'styled-components'
import { SCREEN_SIZES } from '../../styles/theme'

export const PageContainerStyled = styled.div`
  /* background-color: aquamarine; */

  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  min-height: 100vh;
  width: 100%;
  transition: all 300ms ease-in-out;

  header {
    width: 100%;
  }

  main {
    width: calc(100% - 2 * var(--pageMargin));
    max-width: ${SCREEN_SIZES.XL}px;
  }

  footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    justify-content: flex-end;
  }
`
