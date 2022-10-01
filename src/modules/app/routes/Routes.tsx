import { Route, Routes } from 'react-router-dom'
import {
  liquidityListPath,
  liquidityPath,
  liquidityPathWithParams,
  removeLiquidityWithLpAddressPath,
  rootPath,
} from '../../../logic/paths'
import PageContianer from '../../../shared/pageContainer'
import AddLiquidityPage from '../../addLiquidity'
import PageNotFound from '../../pageNotFound'
import RemoveLiquidityPage from '../../removeLiquidity'
import SwapPage from '../../swap'
import LiquidityListPage from '../../removeLiquidity/LiquidityListPage'

const notFoundRoute: RouteDefinition = {
  path: '*',
  element: PageNotFound,
  protected: false,
  title: '',
}

export const routes: RouteDefinition[] = [
  {
    path: rootPath,
    element: SwapPage,
    protected: false,
    title: 'Swap',
  },
  {
    path: liquidityPath,
    element: AddLiquidityPage,
    protected: false,
    title: 'Add Liquidity',
  },
  {
    path: liquidityPathWithParams,
    element: AddLiquidityPage,
    protected: false,
    title: 'Liquidity List',
  },
  {
    path: liquidityListPath,
    element: LiquidityListPage,
    protected: false,
    title: 'Remove Liquidity',
  },
  {
    path: removeLiquidityWithLpAddressPath,
    element: RemoveLiquidityPage,
    protected: false,
    title: 'Remove Liquidity',
  },
]
  .map((r) => ({ ...r, element: r.element }))
  .concat(notFoundRoute as any)

export interface RouteDefinition {
  path: string
  protected?: boolean
  redirect?: string
  element?: any
  routes?: RouteDefinition[]
  title?: string
  requires?: any
  pathType?: number
  exact?: boolean
}

const getRouteRenderWithAuth = (route: RouteDefinition) => {
  const RouteComponent = route.requires ? route.requires(route.element) : route.element
  return { element: <RouteComponent /> }
}

export const RoutesComponent: React.FC = () => {
  const mapRoutes = (route: RouteDefinition, i: number) => {
    const render = getRouteRenderWithAuth(route)
    return <Route key={i} path={route.path} {...render} />
  }

  return (
    <PageContianer>
      <Routes>{routes.map(mapRoutes)}</Routes>
    </PageContianer>
  )
}
