import styled, { ThemeProps } from 'styled-components'
import { Theme } from '../../styles/theme'

export const NormalButtonStyled = styled.button`
  border: none;
  background-color: #182747;
  color: #fff;
  padding: 0.8rem 1.2rem;
  border-radius: 0.3rem;
  cursor: pointer;
  :active {
    transform: scale(0.9);
  }
  :disabled {
    background-color: #d8d8d8;
    color: #182747;
    cursor: default;
    transform: scale(1);
  }
`
export const CircularButtonStyled = styled.button`
  border: none;
  background-color: ${(props: ThemeProps<Theme>) => props.theme.secondary};
  color: #fff;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;

  :active {
    transform: scale(0.9);
  }
`
