export {}

// import styled, { css, ThemeProps } from 'styled-components'
// import { fontSizes, screenSizes, gapSizes, Theme, colors, Themes, lineHeights } from './theme'
// import { rgba } from 'polished'

// export const pageContentWidth = screenSizes.XL

// export const PageContainer = styled.div<any>`
//   display: flex;
//   flex-direction: column;
//   align-self: center;
//   width: calc(100% - 2 * var(--pageMargin));
//   max-width: ${pageContentWidth}px;
//   margin: 0 auto;
//   min-height: auto;
//   padding: ${(props) => (!props.noPadding ? `${gapSizes.XXL} 0 ` : '0')};
//   padding-bottom: 100px;
//   transition: all 300ms ease-in-out;
// `

// export const whiteColor = css`
//   color: ${({ theme }) => theme.white};
// `

// export const grayColor = css`
//   color: ${({ theme }) => theme.gray};
// `

// export const semiBoldStyle = css`
//   font-family: 'NunitoSansSemiBold';
//   font-weight: 600;
// `

// export const boldStyle = css`
//   font-family: 'NunitoSansBold';
//   font-weight: 800;
// `

// export const fieldHeight = '48px'

// export const fieldBorder = css`
//   border: none;
//   border-bottom: 1px solid ${({ theme }) => theme.gray};
//   border-radius: ${(props) => props.theme.radius};
// `

// export const colorChangeDelay = '1s'

// export const Container = styled.div`
//   max-width: 1280px;
//   margin: auto;
//   width: 100%;
// `

// export const CenterContainer = styled.div`
//   text-align: center;
// `

// export const StyledContent = styled.div`
//   > div {
//     display: flex;
//     justify-content: space-between;
//     margin: 0 20px;
//   }
// `

// // TODO: Might need width: fit-content;
// export const StyledH1 = styled.h1`
//   color: ${(props: any) => (props.color ? props.color : props.theme.white)};
//   font-family: 'NunitoSansBold';
// `

// export const StyledH2 = styled.h2`
//   color: ${(props: any) => (props.color ? props.color : props.theme.white)};
//   text-align: start;
//   font-size: 1.4em;
//   font-weight: 100;
//   margin: 30px 0;
//   padding-top: 20px;
// `

// export const PointedStyledH2 = styled<any>(StyledH2)`
//   cursor: pointer;
//   margin: 0;
//   float: left;
//   width: fit-content;
// `

// export const inputStyleDynamicSize = css<any>`
//   outline: none;
//   font-size: ${fontSizes.XS} !important;
//   line-height: ${lineHeights.XS} !important;
//   padding: 12px;
//   border: none;
//   border-radius: 4px !important;
//   color: ${(props) => props.theme.white};
//   caret-color: ${(props) => props.theme.white};
//   :-webkit-autofill {
//     -webkit-border: ${(props) => props.hasErrors && `2px solid ${colors.errorRed}`} !important;
//     -webkit-text-fill-color: ${(props) => (props.hasErrors ? colors.errorRed : props.theme.white)};
//     -webkit-box-shadow: 0 0 0px 1000px ${(props) => props.theme.input.basic} inset !important;
//     border: 4px solid ${(props) => props.theme.input.basic} !important;
//     &:hover,
//     &:focus {
//       -webkit-text-fill-color: ${(props) => (props.hasErrors ? colors.errorRed : props.theme.white)};
//       -webkit-box-shadow: 0 0 0px 1000px ${(props) => props.theme.input.basic} inset !important;
//       border: ${(props) => (props.hasErrors ? `2px solid ${colors.errorRed}` : `1px solid ${colors.green}`)} !important;
//     }
//   }
//   svg {
//     path {
//       fill: ${(props) => props.theme.listText};
//     }
//     :hover {
//       path {
//         fill: ${colors.green};
//       }
//     }
//   }
//   :hover,
//   :focus {
//     background-color: ${(props) => props.theme.input.basic} !important;
//     box-shadow: 0 1px 0 0 ${(props) => props.theme.accent}, 0 -1px 0 0 ${(props) => props.theme.accent},
//       -1px 0 0 0 ${(props) => props.theme.accent}, 1px 0 0 0 ${(props) => props.theme.accent},
//       0 0 0 1px ${(props) => props.theme.accent};
//   }
//   :focus {
//     svg {
//       path {
//         fill: ${(props) => props.theme.white};
//       }
//     }
//   }
//   &::placeholder {
//     color: ${(props) => props.theme.listDesc};
//     font-size: 16px;
//   }
//   &:disabled {
//     background-color: ${(props) => props.theme.input.disabled} !important;
//     // color: rgba(92,106,115, 0.4)} !important;
//     &::placeholder {
//       color: ${(props) => props.theme.highlight};
//     }
//     :hover,
//     :focus {
//       // background-color: ${(props) => props.theme.input.disabled} !important;
//       box-shadow: none;
//     }
//   }
// `

// export const commonInputStyle = css<any>`
//   ${inputStyleDynamicSize}
//   height: ${fieldHeight} !important;
//   width: 100% !important;
// `

// export const CommonInput = styled.input<any>`
//   ${commonInputStyle}
//   background-color: ${(props) => (props.notEmpty === 'true' ? props.theme.input.basic : props.theme.input.default)};
//   border: ${(props) => props.hasErrors && `2px solid ${colors.errorRed}`} !important;
//   color: ${(props) => props.hasErrors && colors.errorRed} !important;
//   box-shadow: ${(props) => props.hasErrors && 'none'} !important;
//   &::placeholder {
//     color: ${(props) => props.hasErrors && colors.errorRed} !important;
//   }
// `

// export const InputGroup = styled.div<any>`
//   flex: 1;
//   display: flex;
//   flex-direction: row;
//   > div {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     + div {
//       margin-left: 10px;
//     }
//   }
//   @media (max-width: ${screenSizes.M}px) {
//     flex-direction: ${(props) => !props.disableMedia && 'column'};
//     > div + div {
//       margin-left: ${(props) => !props.disableMedia && 0};
//     }
//   }
// `

// export const HorizontalLine = styled.hr`
//   height: 1px;
//   min-width: 100%;
//   width: auto;
//   background-color: ${({ theme }) => theme.highlight};
// `

// export const TextInput = styled.textarea`
//   ${fieldBorder};
//   margin-top: 4px;
//   background: #ffffff;
//   box-sizing: border-box;
//   resize: none;
// `

// export const Header2 = styled.div`
//   font-weight: 300;
//   font-size: 24px;
//   a {
//     color: ${(props) => props.theme.white};
//   }
// `

// export const Header3 = styled.div`
//   font-weight: 300;
//   font-size: 20px;
//   a {
//     color: ${(props) => props.theme.white};
//   }
// `

// export const CenteringContainer = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
// `

// export const StyledP = styled.p`
//   color: ${({ theme }) => theme.white};
// `

// export const boldText = css`
//   font-weight: bold;
//   font-family: 'NunitoSansBold';
// `

// export const subduedText = css`
//   opacity: 0.5;
//   font-size: ${fontSizes.XS};
// `

// export interface CellProps {
//   column: number
//   row: number
// }

// export const cell = css<CellProps>`
//   grid-column: ${(props) => props.column};
//   grid-row: ${(props) => props.row};
// `

// export const Cell = styled.div`
//   ${cell}
// `

// export const FlexCol = styled.div<any>`
//   display: flex;
//   flex-direction: column;
//   justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'center')};
//   align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
//   ${(props) => props.flex && `flex: ${props.flex};`}
//   ${(props) => props.margin && `margin: ${props.margin};`}
// `

// export const FlexRow = styled.div<any>`
//   display: flex;
//   flex-direction: row;
//   align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
//   justify-content: ${(props) => (props.justifyContent ? props.justifyContent : '')};
// `

// export const fullScreenOvershadow = css`
//   z-index: 999999;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.2) !important;
// `

// export const fieldLabel = css`
//   text-align: start;
//   color: ${({ theme }) => theme.label};
//   line-height: 22px;
//   font-size: 0.9em;
// `

// export const fieldSpan = css`
//   margin: 20px 0;
//   display: block;
//   ${whiteColor}
// `

// export const UpTick = styled.i<any>`
//   transform: ${(props) => (props.shouldRotate ? 'rotate(45deg)' : 'rotate(225deg)')};
//   border: solid black;
//   border-width: 2px 0 0 2px;
//   display: inline-block;
//   padding: 3px;
//   visibility: ${(props) => props.invisible && 'hidden'};
//   margin-top: 6px;
//   margin-left: ${gapSizes.S};
//   border-color: ${({ theme }) => theme.white};
// `

// export const LegendTextInput = styled<any>(TextInput)`
//   width: 100%;
//   height: 100px;
// `

// export const SmallHeader = styled.div`
//   font-size: ${fontSizes.M};
//   ${whiteColor}
// `
// export const Divider = css`
//   margin-top: 20px;
//   margin-bottom: 20px;
// `

// export const DarkDivider = styled.div`
//   ${Divider}
//   border-bottom: 1px solid #2B3B44;
// `
// export const LightDivider = styled.div<any>`
//   ${Divider}
//   border-bottom: 1px solid ${colors.grayDivider};
//   max-width: ${(props) => (props.stretch ? '' : '600px')};
// `

// export const StyledDetails = styled.div`
//   display: flex;
// `

// export const DetailsH4 = css`
//   font-size: 20px;
//   line-height: 28px;
// `

// export const DetailsSpan = css`
//   font-size: 16px;
//   line-height: 24px;
// `

// export const DetailsLabel = styled.div`
//   ${fieldLabel}
//   margin: 0 0 4px 0;
//   font-size: ${fontSizes.XS};
//   word-break: break-all;
// `

// export const DetailsMaxWidth = css`
//   max-width: 600px;
// `

// export const OrgDetailsWrapper = styled.div`
//   max-width: 628px;
//   color: ${({ theme }) => theme.white};
//   h4 {
//     ${DetailsH4}
//     padding-bottom: 24px;
//     padding-top: 20px;
//   }
//   span {
//     ${DetailsSpan}
//     margin: 0;
//   }
//   .greyed {
//     color: #9ca6ad;
//   }
//   .idCopy {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     svg {
//       margin: 0;
//     }
//   }
//   div {
//     svg {
//       cursor: pointer;
//       margin: 0 0 6px 10px;
//     }
//   }
// `

// export const TextAreaInput = styled.textarea<any>`
//   ${inputStyleDynamicSize};
//   height: ${(props) => (props.height ? props.height : '128px')};
//   width: 100%;
//   margin: 0;
//   background-color: ${(props) => (props.notEmpty === 'true' ? props.theme.input.basic : props.theme.input.default)};
//   border: ${(props) => props.hasErrors && `2px solid ${colors.errorRed}`};
//   color: ${(props) => props.hasErrors && colors.errorRed} !important;
//   box-shadow: ${(props) => props.hasErrors && 'none'} !important;
//   &::placeholder {
//     font-size: ${fontSizes.XS};
//     color: ${(props) => props.hasErrors && colors.errorRed} !important;
//   }
// `

// export const FieldNote = styled.p<any>`
//   color: ${(props) => (props.hasErrors ? colors.errorRed : '#9CA6AD')};
//   font-size: 14px;
//   line-height: 19px !important;
//   margin: 2px 0 0 0 !important;
// `

// export const StyledCertificateImage = styled.img`
//   width: 60px;
//   border: 2px solid ${(props) => props.theme.accent};
// `

// export const StyledPaymentMethod = css`
//   background: ${(props) => (props.theme.selected !== Themes.LIGHT ? props.theme.primary : props.theme.panelBack)};
//   border-radius: 4px;
//   margin-bottom: 20px;
//   div {
//     display: flex;
//     align-items: center;
//   }
//   span {
//     margin: 0;
//     font-size: ${fontSizes.XXS};
//   }
// `

// export const crossWithHoverCss = css<any>`
//   width: 32px !important;
//   height: 32px;
//   border-radius: 4px;
//   justify-content: center;
//   cursor: pointer;
//   &:hover {
//     background: ${(props) => props.theme.buttonHover};
//     path {
//       fill: ${(props) => (props.theme.selected !== Themes.LIGHT ? props.theme.white : colors.white)};
//     }
//   }
//   &:active {
//     background: ${(props) => props.theme.buttonActive};
//   }
// `

// export const CrossWithHover = styled<any>(FlexRow)`
//   ${crossWithHoverCss}
// `

// export const RadioWrap = styled<any>(FlexRow)`
//   label {
//     padding-left: 28px;
//     font-size: 14px;
//     line-height: 19px;
//   }
//   .multi {
//     margin-right: 48px !important;
//     :last-child {
//       margin-right: 0 !important;
//     }
//   }
//   @media (max-width: ${screenSizes.S}px) {
//     flex-direction: column;
//     align-items: flex-start;
//   }
// `

// export const FieldPanel = styled.div<any>`
//   width: 100%;
//   background-color: ${(props) => props.theme.selectorBack};
//   border-radius: 8px;
//   padding: 24px;
//   margin-bottom: ${(props) => (!!props.isLast ? '' : '25px')};
//   .cross {
//     cursor: pointer;
//     path {
//       fill: ${(props) => props.theme.whiteIcon};
//       fill-opacity: 1;
//     }
//   }
// `

// export const ListLabel = styled<any>(DetailsLabel)`
//   font-weight: bold;
//   font-family: 'NunitoSansBold';
//   color: ${(props) => (props.error === 'true' ? colors.errorRed : props.theme.white)};
//   margin: 4px 0 4px 0;
// `

// export const ListValue = styled.span<any>`
//   font-size: 16px !important;
//   line-height: 24px !important;
//   color: ${(props) => (props.error === 'true' ? colors.errorRed : '')};
// `
