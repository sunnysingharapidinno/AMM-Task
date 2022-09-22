import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { liquidityPath, removeLiquidityPath, rootPath } from '../../logic/paths'
import { loginReducer, logoutReducer } from '../../redux/action/walletAction'
import { AppDispatch, RootState } from '../../redux/store'
import Button from '../button'
import ThemeToggle from '../themeToggle'
import { NavBarContainerStyled, NavItem } from './style'

interface NavigationInterface {
  name: string
  path: string
}

const navigations: NavigationInterface[] = [
  {
    name: 'Swap',
    path: rootPath,
  },
  {
    name: 'Liquidity',
    path: removeLiquidityPath,
  },
]

const NavBar = () => {
  const { pathname } = useLocation()
  const { account } = useSelector((state: RootState) => state.wallet)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <NavBarContainerStyled>
      <div className="grid-item">Logo</div>
      <div className="grid-item">
        {navigations.map((item, index) => (
          <NavItem
            activepath={pathname === item.path}
            to={item.path}
            key={index}
            className={({ isActive }) => {
              console.log(isActive)
              return ''
            }}
          >
            {item.name}
          </NavItem>
        ))}
      </div>
      <div className="grid-item">
        {account ? (
          <Button onClick={() => dispatch(logoutReducer())}>Logout</Button>
        ) : (
          <Button onClick={() => dispatch(loginReducer())}>Connect Wallet</Button>
        )}

        <ThemeToggle />
      </div>
    </NavBarContainerStyled>
  )
}

export default NavBar
