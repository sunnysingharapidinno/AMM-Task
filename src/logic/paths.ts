import { UrlPath } from '../shared/helpers/util'

export const rootPath: UrlPath<{}> = '/'
export const liquidityPath: UrlPath<{}> = '/liquidity'
export const liquidityPathWithParams: UrlPath<{}> = '/liquidity/:token0/:token1'
export const liquidityListPath: UrlPath<{}> = '/liquiditylist'
export const removeLiquidityWithLpAddressPath: UrlPath<{}> = '/remove/:lpaddress'
