export const headerHeight = '56px'

export interface SizesInterface {
  XXS: number | string
  XS: number | string
  S: number | string
  M: number | string
  L: number | string
  XL: number | string
  XXL: number | string
}

export const SCREEN_SIZES: Partial<SizesInterface> = {
  XS: 480,
  S: 640,
  M: 800,
  L: 1024,
  XL: 1280,
}

export const SIZES: SizesInterface = {
  XXS: 14,
  XS: 16,
  S: 18,
  M: 24,
  L: 32,
  XL: 36,
  XXL: 48,
}

interface ThemeWithStates {
  [propName: string]: string
}

export interface Colors {
  black: string
  white: string
  grey: string
  gray: string
  beige: string
  space: string
  purple: string
  purpleDark: string
}

export const colors: Partial<Colors> = {
  black: '#000',
  white: '#fff',
  grey: '#2C3333',
  gray: '#F9F6F7',
}

export interface Theme {
  [propName: string]: string | ThemeWithStates | { [propName: string]: ThemeWithStates } | undefined
  background: string
}

export const darkTheme: Partial<Theme> = {
  background: colors.grey,
  primary: colors.space,
  secondary: colors.purple,
  text: colors.white,
  gray: colors.gray,
  grey: colors.grey,
}

export const lightTheme: Partial<Theme> = {
  background: colors.white,
  primary: colors.white,
  secondary: colors.beige,
  text: colors.black,
  gray: colors.gray,
  grey: colors.grey,
}

export enum Themes {
  LIGHT,
  DARK,
}

export const getTheme = (theme: Themes) => {
  switch (theme) {
    case Themes.LIGHT:
      return lightTheme
    case Themes.DARK:
      return darkTheme
    default:
      return lightTheme
  }
}
