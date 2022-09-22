import { Route, Routes } from 'react-router-dom'

import { liquidityPath, removeLiquidityPath, rootPath } from '../../../logic/paths'
import PageContianer from '../../../shared/pageContainer'
import AddLiquidityPage from '../../addLiquidity'
import PageNotFound from '../../pageNotFound'
import RemoveLiquidityPage from '../../removeLiquidity'
import SwapPage from '../../swap'

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
    pathType: 0,
  },
  {
    path: liquidityPath,
    element: AddLiquidityPage,
    protected: false,
    title: 'Remove Liquidity',
    pathType: 0,
  },
  {
    path: removeLiquidityPath,
    element: RemoveLiquidityPage,
    protected: false,
    title: 'Remove Liquidity',
    pathType: 0,
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
