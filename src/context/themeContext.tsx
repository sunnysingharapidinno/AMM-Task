import React from 'react'

export type Theme = 'LIGHT' | 'DARK'

export type ThemeContextType = {
  theme: Theme
  changeTheme: (theme: Theme) => void
}

export const ThemeContext = React.createContext<ThemeContextType | null>(null)

export const ThemeProvider: React.FC = ({ children }) => {
  const [themeMode, setThemeMode] = React.useState<Theme>('LIGHT')
  return (
    <ThemeContext.Provider value={{ theme: themeMode, changeTheme: setThemeMode }}>{children}</ThemeContext.Provider>
  )
}
