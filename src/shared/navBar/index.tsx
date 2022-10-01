import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { liquidityListPath, liquidityPath, removeLiquidityPath, rootPath } from '../../logic/paths'
import { loginReducer, logoutReducer } from '../../redux/action/walletAction'
import { AppDispatch, RootState } from '../../redux/store'
import Button from '../button'
import { Spacer } from '../shared'
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
    name: 'Add Liquidity',
    path: liquidityPath,
  },
  {
    name: 'My Liquidity',
    path: liquidityListPath,
  },
]

const rapidInnovationLogoURL =
  'https://uploads-ssl.webflow.com/60c92ce167b91f55c48259ca/60e883fa2ffc2286619f0430_RapidInnovationsLogo.svg'

const NavBar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { account } = useSelector((state: RootState) => state.wallet)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <NavBarContainerStyled walletConnected={Boolean(account)}>
      <div className="grid-item">
        <img onClick={() => navigate(rootPath)} src={rapidInnovationLogoURL} alt="Rapid Innovation" className="logo" />
      </div>
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
          <>
            <Button
              onClick={() => navigator.clipboard.writeText(account)}
              style={{ backgroundColor: '#b3c3e5', color: '#000' }}
            >
              {`${account.substring(0, 5)}...${account.substring(account.length - 5, account.length)}`}
            </Button>
            <Spacer marginLeft="2rem" />
            <Button onClick={() => dispatch(logoutReducer())}>Logout</Button>
          </>
        ) : (
          <Button onClick={() => dispatch(loginReducer())}>Connect Wallet</Button>
        )}

        {/* <ThemeToggle /> */}
      </div>
    </NavBarContainerStyled>
  )
}

export default NavBar
