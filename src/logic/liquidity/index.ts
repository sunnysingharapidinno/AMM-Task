import { FACTORY, AMMLP, ROUTER, ZEROADDRESS, BNB, WBNB } from '../../constants'
import { BSC_TESTNET_ADDRESS } from '../../constants/bsc-testnet/contract'
import { getContract } from '../contract'
import { getReserves, getToken0, getTotalSupply } from '../shared'
import { toEther, toWei } from '../utility'

export const getQuotePrice = async (
  tokenA: string,
  tokenB: string,
  amount: string | number,
  flag?: boolean
): Promise<string> => {
  try {
    const token0 = tokenA === BNB ? WBNB : tokenA
    const token1 = tokenB === BNB ? WBNB : tokenB
    const pairAddress = await getPairAddress(BSC_TESTNET_ADDRESS[token0], BSC_TESTNET_ADDRESS[token1])

    if (pairAddress === BSC_TESTNET_ADDRESS[ZEROADDRESS]) {
      return '0'
    }

    const reserves = await getReserves(AMMLP, pairAddress)
    const instance = getContract(ROUTER, ROUTER)
    if (flag) {
      const quotedValue = await instance.methods.quote(toWei(amount), reserves[1], reserves[0]).call()
      return toEther(quotedValue)
    } else {
      const quotedValue = await instance.methods.quote(toWei(amount), reserves[0], reserves[1]).call()
      return toEther(quotedValue)
    }
  } catch (error) {
    throw error
  }
}

export const getPairAddress = async (token0Address: string, token1Address: string): Promise<string> => {
  try {
    const instance = getContract(FACTORY, FACTORY)
    const address = await instance.methods.getPair(token0Address, token1Address).call()

    return address
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPoolShare = async (
  tokenA: string,
  tokenB: string,
  amount0: string | number,
  amount1: string | number
) => {
  try {
    const token0 = tokenA === BNB ? WBNB : tokenA
    const token1 = tokenB === BNB ? WBNB : tokenB
    const pairAddress = await getPairAddress(BSC_TESTNET_ADDRESS[token0], BSC_TESTNET_ADDRESS[token1])

    if (pairAddress === BSC_TESTNET_ADDRESS[ZEROADDRESS]) {
      return '0'
    }

    const totalSupply = await getTotalSupply(AMMLP, pairAddress)
    console.log(pairAddress)
    const liquidity = await getLiquidity(tokenA, tokenB, amount0, amount1, pairAddress)

    const share = Number(liquidity) / (Number(toEther(totalSupply)) + Number(liquidity))

    return share * 100
  } catch (error) {
    throw error
  }
}

export const getLiquidity = async (
  tokenA: string,
  tokenB: string,
  amount0: string | number,
  amount1: string | number,
  pairAddress?: string
) => {
  try {
    const token0 = tokenA === BNB ? WBNB : tokenA
    const token1 = tokenB === BNB ? WBNB : tokenB

    let _pairAddress

    if (pairAddress) {
      _pairAddress = pairAddress
    } else {
      const pairAddress = await getPairAddress(BSC_TESTNET_ADDRESS[token0], BSC_TESTNET_ADDRESS[token1])

      if (pairAddress === BSC_TESTNET_ADDRESS[ZEROADDRESS]) {
        return '0'
      }

      _pairAddress = pairAddress
    }

    const reserves = await getReserves(AMMLP, _pairAddress)
    const totalSupply = await getTotalSupply(AMMLP, _pairAddress)

    let reserve0 = '0'
    let reserve1 = '0'

    const token0Address = await getToken0(AMMLP, _pairAddress)

    if (BSC_TESTNET_ADDRESS[token0] === token0Address) {
      reserve0 = reserves[0]
      reserve1 = reserves[1]
    } else {
      reserve0 = reserves[1]
      reserve1 = reserves[0]
    }

    const tokenALiquidity = (Number(toWei(amount0)) * totalSupply) / Number(reserve0)
    const tokenBLiquidity = (Number(toWei(amount1)) * totalSupply) / Number(reserve1)

    const liquidity = toEther(Math.min(tokenALiquidity, tokenBLiquidity))
    return liquidity
  } catch (error) {
    throw error
  }
}
