import { BNB, ROUTER, WBNB } from '../../constants'
import { BSC_TESTNET_ADDRESS } from '../../constants/bsc-testnet/contract'
import { getContract } from '../contract'
import { toWei } from '../utility'

export const supplyLiquidity = async (
  tokenSymbolA: string,
  tokenSymbolB: string,
  tokenInputA: string | number,
  tokenInputB: string | number,
  slippage: string | number,
  trxDeadline: string | number,
  userAddress: string
) => {
  try {
    if (tokenSymbolA === BNB || tokenSymbolA === WBNB || tokenSymbolB === BNB || tokenSymbolB === WBNB) {
      // addLiquidityETH
    } else {
      // addLiquidity
      const minReceivedA = Number(tokenInputA) - (Number(tokenInputA) * Number(slippage)) / 100
      const minReceivedB = Number(tokenInputB) - (Number(tokenInputB) * Number(slippage)) / 100
      const deadline = (Math.floor(Date.now() / 1000) + Number(trxDeadline) * 60).toString()
      const trx = await addLiquidity(
        BSC_TESTNET_ADDRESS[tokenSymbolA],
        BSC_TESTNET_ADDRESS[tokenSymbolB],
        toWei(tokenInputA),
        toWei(tokenInputB),
        toWei(minReceivedA),
        toWei(minReceivedB),
        userAddress,
        deadline
      )

      return trx
    }
  } catch (error) {
    throw error
  }
}

const addLiquidity = async (
  tokenA: string,
  tokenB: string,
  amountADesired: string,
  amountBDesired: string,
  amountAMin: string,
  amountBMin: string,
  to: string,
  deadline: string
) => {
  try {
    const instance = getContract(ROUTER, ROUTER)
    const trx = await instance.methods
      .addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline)
      .send({
        from: to,
      })
    return trx
  } catch (error) {
    throw error
  }
}

const addLiquidityETH = async (
  amountOut: string,
  token: string,
  amountTokenDesired: string,
  amountTokenMin: string,
  amountETHMin: string,
  to: string,
  deadline: string
) => {
  try {
    const instance = getContract(ROUTER, ROUTER)
    const trx = await instance.methods
      .addLiquidity(token, amountTokenDesired, amountTokenMin, amountTokenMin, amountETHMin, to, deadline)
      .send({
        from: to,
        value: amountOut,
      })

    return trx
  } catch (error) {
    throw error
  }
}
