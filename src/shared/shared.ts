import styled, { keyframes } from 'styled-components'

export interface SpacerProps {
  margin: string
  marginTop: string
  marginBottom: string
  marginLeft: string
  marginRight: string
  padding: string
  paddingTop: string
  paddingBottom: string
  paddingLeft: string
  paddingRight: string
}

export const Spacer = styled.div<Partial<SpacerProps>>`
  margin: ${(props) => props.margin};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  padding: ${(props) => props.padding};
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};
  padding-top: ${(props) => props.paddingTop};
  padding-bottom: ${(props) => props.paddingBottom};
`
export const Card = styled.div`
  padding: 1rem;
  border-radius: 0.6rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 512px;
  width: 100%;
`

export const Center = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

interface TextBoxInterface {
  fullWidth?: boolean
  width?: string
}

export const TextBox = styled.input.attrs({
  type: 'text',
})<TextBoxInterface>`
  outline: none;
  border: none;
  background-color: #e6e7e8;
  border-radius: 0.3rem;
  padding: 0.5rem 0.7rem;
  font-size: auto;
  width: ${(props) => props.width || (props.fullWidth ? '100%' : `auto`)};
  :focus {
    background-color: #dadce0;
  }
`

export interface RotateContainerInterface {
  rotate?: boolean
}

export const RotateContainer = styled.div<RotateContainerInterface>`
  padding: 1rem;
  .icon {
    font-size: 2rem;
    cursor: pointer;
    transition: rotate 0.5s;
    rotate: ${(props) => props.rotate && `180deg`};
    :active {
      scale: 0.9;
    }
  }
`

const TextVariants = {
  h1: {
    fontSize: `6rem`,
    fontWeight: 300,
  },
  h2: {
    fontSize: `3.75rem`,
    fontWeight: 300,
  },
  h3: {
    fontSize: `3rem`,
    fontWeight: 400,
  },
  h4: {
    fontSize: `2.25rem`,
    fontWeight: 400,
  },
  h5: {
    fontSize: `1.5rem`,
    fontWeight: 400,
  },
  h6: {
    fontSize: `1.25rem`,
    fontWeight: 400,
  },
  normal: {
    fontSize: `1rem`,
    fontWeight: 400,
  },
}

interface TextProps {
  size?: number | string
  weight?: number | string
  variants?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal'
  color?: string
}

export const CustomText = styled.span<TextProps>`
  font-size: ${(props) => props.size || (props.variants && TextVariants[props.variants].fontSize)};
  font-weight: ${(props) => props.weight || (props.variants && TextVariants[props.variants].fontWeight)};
  color: ${(props) => props.color};
`

interface FlexInterface {
  justifyContent?: string
  alignItems?: string
  flexDirection?: string
}

export const Flex = styled.div<FlexInterface>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'center')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
`
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

interface I_LoadingSpinner {
  size?: string
}

export const LoadingSpinner = styled.div<I_LoadingSpinner>`
  animation: ${rotate360} 0.5s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid #b3c3e5;
  border-right: 2px solid #b3c3e5;
  border-bottom: 2px solid #b3c3e5;
  border-left: 4px solid #182747;
  background: transparent;
  width: ${(props) => props.size || '3rem'};
  height: ${(props) => props.size || '3rem'};
  border-radius: 50%;
`
