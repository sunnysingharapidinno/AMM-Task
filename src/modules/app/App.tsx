import './App.css'
import { RoutesComponent } from './routes/Routes'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { getTheme, Themes } from '../../styles/theme'
import { GlobalStyle } from '../../styles/globalStyle'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/themeContext'
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { changeAccount, loginReducer, logoutReducer } from '../../redux/action/walletAction'

export const App = () => {
  const [currentTheme, setCurrentTheme] = useState({ ...getTheme(Themes.LIGHT), selected: Themes.LIGHT })
  const dispatch = useDispatch<AppDispatch>()
  const { theme } = useContext<any>(ThemeContext)
  useEffect(() => {
    if (theme === 'DARK') {
      setCurrentTheme({ ...getTheme(Themes.DARK), selected: Themes.DARK })
    } else {
      setCurrentTheme({ ...getTheme(Themes.LIGHT), selected: Themes.LIGHT })
    }
  }, [theme])

  useEffect(() => {
    const login = localStorage.getItem('walletLogin')
    if (login === 'true') {
      dispatch(loginReducer())

      if (window?.ethereum) {
        window.ethereum.on('accountsChanged', (account: string[]) => {
          dispatch(changeAccount(account[0]))
        })
      }
    } else {
      dispatch(logoutReducer())
    }
  }, [])

  return (
    <SCThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <RoutesComponent />
    </SCThemeProvider>
  )
}
