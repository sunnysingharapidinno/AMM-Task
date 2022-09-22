import styled from 'styled-components'

export const AMMInputContainer = styled.div`
  display: flex;
  position: relative;
`

interface BalanceContainerInterface {
  showBalance?: boolean
}

export const BalanceContainer = styled.div<BalanceContainerInterface>`
  position: absolute;
  top: -24px;
  right: 0px;

  transition: transform 0.5s;
  transform: ${(props) => (props.showBalance ? `translateY(0px)` : `translateY(30px)`)};
  z-index: -1;
`

export const TokenContainer = styled.div`
  display: flex;
  margin: 12px 16px;
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(47, 57, 74, 0.5);
  :hover {
    background: rgb(65, 76, 94);
  }
`
