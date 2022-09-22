import React, { useContext } from 'react'
import { ThemeContext } from '../../context/themeContext'
import Button from '../button'
import { HiMoon, HiSun } from 'react-icons/hi'

type Props = {}

const ThemeToggle = (props: Props) => {
  const { theme, changeTheme } = useContext<any>(ThemeContext)
  return (
    <Button
      buttonType="icon-button"
      onClick={() => {
        if (theme === 'DARK') {
          changeTheme('LIGHT')
        } else {
          changeTheme('DARK')
        }
      }}
    >
      {theme === 'DARK' ? (
        <HiMoon
        // onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        // className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      ) : (
        <HiSun
        // onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        // className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      )}
    </Button>
  )
}

export default ThemeToggle
