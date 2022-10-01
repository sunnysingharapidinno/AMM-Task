import { AMMLP, ROUTER, ZEROADDRESS, BNB, WBNB } from '../../constants'
import { BSC_TESTNET_ADDRESS } from '../../constants/bsc-testnet/contract'
import { getContract } from '../contract'
import {
  getAllPairsLength,
  getBalance,
  getPairAddresByTokenAddress,
  getPairAddressById,
  getReserves,
  getToken0,
  getTotalSupply,
} from '../shared'
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
    const pairAddress = await getPairAddresByTokenAddress(BSC_TESTNET_ADDRESS[token0], BSC_TESTNET_ADDRESS[token1])

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

export const getPoolShare = async (
  tokenA: string,
  tokenB: string,
  amount0: string | number,
  amount1: string | number
) => {
  try {
    const token0 = tokenA === BNB ? WBNB : tokenA
    const token1 = tokenB === BNB ? WBNB : tokenB
    const pairAddress = await getPairAddresByTokenAddress(BSC_TESTNET_ADDRESS[token0], BSC_TESTNET_ADDRESS[token1])

    if (pairAddress === BSC_TESTNET_ADDRESS[ZEROADDRESS]) {
      return '0'
    }

    const totalSupply = await getTotalSupply(AMMLP, pairAddress)

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
      const pairAddress = await getPairAddresByTokenAddress(BSC_TESTNET_ADDRESS[token0], BSC_TESTNET_ADDRESS[token1])

      if (pairAddress === BSC_TESTNET_ADDRESS[ZEROADDRESS]) {
        return '0'
      }

      _pairAddress = pairAddress
    }

    const reserves = await getReserves(AMMLP, _pairAddress)
    const totalSupply = await getTotalSupply(AMMLP, _pairAddress)

    let reserve0 = '0'
    let reserve1 = '0'

    const token0Address = await getToken0(_pairAddress)

    if (BSC_TESTNET_ADDRESS[token0] === token0Address) {
      reserve0 = reserves[0]
      reserve1 = reserves[1]
    } else {
      reserve0 = reserves[1]
      reserve1 = reserves[0]
    }

    const tokenALiquidity = (Number(toWei(amount0)) * Number(totalSupply)) / Number(reserve0)
    const tokenBLiquidity = (Number(toWei(amount1)) * Number(totalSupply)) / Number(reserve1)

    const liquidity = toEther(Math.min(tokenALiquidity, tokenBLiquidity))
    return liquidity
  } catch (error) {
    throw error
  }
}

export const getUserLpPairs = async (userAddress: string): Promise<string[]> => {
  try {
    const allPairLength = await getAllPairsLength()
    const pairAddressArray = []

    for (let i = 0; i < allPairLength; i++) {
      const address = await getPairAddressById(i)
      const lpBalance = await getBalance(address, userAddress)
      if (Number(toEther(lpBalance)) > 0) {
        pairAddressArray.push(address)
      }
    }

    return pairAddressArray
  } catch (error) {
    throw error
  }
}
