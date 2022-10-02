import { BNB, ROUTER, WBNB } from '../../constants'
import { BSC_TESTNET_ADDRESS } from '../../constants/bsc-testnet/contract'
import { getContract } from '../shared/contract'
import { toEther, toWei } from '../utility'

export const getAmountsOut = async (tokenAmount: string | number, token0: string, token1: string): Promise<string> => {
  try {
    const instance = getContract(ROUTER, ROUTER)
    if (token0 === BNB || token1 === BNB || token0 === WBNB || token1 === WBNB) {
      const path = []

      if (token0 === BNB || token0 === WBNB) {
        path.push(BSC_TESTNET_ADDRESS[WBNB])
        path.push(BSC_TESTNET_ADDRESS[token1])
      } else {
        path.push(BSC_TESTNET_ADDRESS[token0])
        path.push(BSC_TESTNET_ADDRESS[WBNB])
      }

      const amountOut = await instance.methods.getAmountsOut(toWei(tokenAmount), path).call()
      const amount = toEther(amountOut[1])
      return amount
    } else {
      const amountOut = await instance.methods
        .getAmountsOut(toWei(tokenAmount), [BSC_TESTNET_ADDRESS[token0], BSC_TESTNET_ADDRESS[token1]])
        .call()

      const amount = toEther(amountOut[1])
      return amount
    }
  } catch (error) {
    throw error
  }
}
export const getMinReceived = (amount: string | number, slippage: string | number) => {
  if (amount && slippage) {
    const minReceived = Number(amount) - (Number(slippage) / 100) * Number(amount)
    return minReceived
  }
  return 0
}
