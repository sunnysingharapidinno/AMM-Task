import { FACTORY, AMMLP, ROUTER, ZEROADDRESS, BNB, WBNB } from '../../constants'
import { BSC_TESTNET_ADDRESS } from '../../constants/bsc-testnet/contract'
import { getContract } from '../contract'
import { getReserves } from '../shared'
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
