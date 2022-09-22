import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { SIZES } from '../../styles/theme'

export const NavBarContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0rem 1rem;
  background-color: ${(props) => props.theme.primary};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  .logo {
    filter: sepia(100%) saturate(300%) brightness(70%) hue-rotate(180deg);
    padding: 0.5rem;
    cursor: pointer;
  }
  .grid-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .grid-item:first-child {
    justify-content: start;
  }
  .grid-item:last-child {
    justify-content: end;
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    .grid-item:nth-child(2) {
      justify-content: end;
    }
    .grid-item:last-child {
      grid-column: span 2;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`

interface NavItemInterface {
  activepath: boolean
}

export const NavItem = styled(NavLink)<NavItemInterface>`
  text-decoration: none;
  color: ${(props) => (props.activepath ? props.theme.text : props.theme.grey)};
  /* background-color: ${(props) => props.activepath && props.theme.gray}; */
  background-color: ${(props) => props.activepath && '#b3c3e5'};
  /* width: ${Number(SIZES.XXS) / 2}rem; */
  text-align: center;
  padding: 0.8rem 1rem;
  margin: ${Number(SIZES.XS)}px;
  border-radius: ${Number(SIZES.XXS) / 2}px;
  font-size: ${Number(SIZES.XS)}px;
  font-weight: 500;
  font-family: 'InterBold';

  &:hover {
    opacity: 0.7;
  }
`
