import { createGlobalStyle, ThemeProps } from 'styled-components'
import { SCREEN_SIZES, Theme } from './theme'
import { rgba } from 'polished'

const InterMedium = require('../assets/fonts/Inter/Inter-Medium.ttf')
const InterRegular = require('../assets/fonts/Inter/Inter-Regular.ttf')
const InterBold = require('../assets/fonts/Inter/Inter-Bold.ttf')
const InterExtraBold = require('../assets/fonts/Inter/Inter-ExtraBold.ttf')
const InterLight = require('../assets/fonts/Inter/Inter-Light.ttf')
const InterExtraLight = require('../assets/fonts/Inter/Inter-ExtraLight.ttf')
// const Inter = require('../assets/fonts/Inter/Inter-VariableFont_slnt,wght.ttf')

export const GlobalStyle = createGlobalStyle` 
 :root{
    transition: margin 300ms ease-in-out;
    --pageMargin: 80px;
    @media (max-width: ${SCREEN_SIZES.L}px) {
      --pageMargin: 40px;
    }
    @media (max-width: ${SCREEN_SIZES.M}px) {
      --pageMargin: 20px;
    }
  }
  
  @font-face {
    font-family: InterMedium;
    src: url(${InterMedium});    
  } 
  @font-face {
    font-family: InterRegular;
    src: url(${InterRegular});    
  } 
  @font-face {
    font-family: InterBold;
    src: url(${InterBold});    
  } 
  @font-face {
    font-family: InterExtraBold;
    src: url(${InterExtraBold});    
  } 
  @font-face {
    font-family: InterLight;
    src: url(${InterLight});    
  } 
  @font-face {
    font-family: InterExtraLigh;
    src: url(${InterExtraLight});    
  } 
     
  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;    
  }
  html,
  body {
    font-size: 16px;
    height: 100%;
    scroll-behavior: smooth;
    width: 100%;    
  }
  body {
    min-height: 100%;
    margin: 0;
    padding: 0;
    background-color: ${(props: ThemeProps<Theme>) => props.theme.background};
    color: ${(props: ThemeProps<Theme>) => props.theme.text};        
  }
  *::-webkit-scrollbar {
    width: 12px;
    background-color: ${rgba(81, 111, 119, 0.101961)};
    border-radius: 4px;
  }
  *::-webkit-scrollbar-thumb {
    border: 2px solid transparent;
    background-color: #9CA6AD;
    border-radius: 20px;
    background-clip: content-box;
  }
  #root{
    display: flex;
    flex-flow: column;
    min-height: 100vh;
    max-width: 100%;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    font-family: 'InterMedium';
  }
  
`
