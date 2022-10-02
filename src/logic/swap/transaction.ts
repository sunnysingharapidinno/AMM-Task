import { ROUTER, WBNB } from '../../constants'
import { BSC_TESTNET_ADDRESS } from '../../constants/bsc-testnet/contract'
import { getContract } from '../shared/contract'
import { toWei } from '../utility'

interface I_SwapMethods {
  [id: number]: string
}

export const SwapMethods: I_SwapMethods = {
  [1]: 'SWAPEXACTETHFORTOKENS',
  [2]: 'SWAPETHFOREXACTTOKENS',
  [3]: 'SWAPEXACTTOKENSFORETH',
  [4]: 'SWAPTOKENSFOREXACTETH',
  [5]: 'SWAPEXACTTOKENSFORTOKENS',
  [6]: 'SWAPTOKENSFOREXACTTOKENS',
}

export const swap = async (args: any) => {
  try {
    const { minReceived, maxInput, token0, token1, account, trxDeadline, input0, input1, swapMethod } = args

    switch (swapMethod) {
      case SwapMethods[1]: {
        // console.log('case1')
        // swapExactETHForTokens-->>
        const amountOutMin = toWei(minReceived)
        const path = [BSC_TESTNET_ADDRESS[WBNB], BSC_TESTNET_ADDRESS[token1]]
        const to = account
        const deadline = (Math.floor(Date.now() / 1000) + trxDeadline * 60).toString()
        const tokenInputAmount = toWei(input0)

        const trx = await _swapExactETHForTokens(amountOutMin, path, to, deadline, tokenInputAmount)
        return trx
      }
      case SwapMethods[2]: {
        console.log('case2')
        // swapETHForExactTokens
        const amountOut = toWei(input1)
        const path = [BSC_TESTNET_ADDRESS[WBNB], BSC_TESTNET_ADDRESS[token1]]
        const to = account
        const deadline = (Math.floor(Date.now() / 1000) + trxDeadline * 60).toString()
        const tokenInputAmount = toWei(input0)

        const trx = await _swapETHForExactTokens(amountOut, path, to, deadline, tokenInputAmount)
        return trx
      }
      case SwapMethods[3]: {
        // console.log('case3')
        // swapExactTokensForETH-->>
        const amountIn = toWei(input0)
        const amountOutMin = toWei(minReceived)
        const path = [BSC_TESTNET_ADDRESS[token0], BSC_TESTNET_ADDRESS[WBNB]]
        const to = account
        const deadline = (Math.floor(Date.now() / 1000) + trxDeadline * 60).toString()

        const trx = await _swapExactTokensForETH(amountIn, amountOutMin, path, to, deadline)
        return trx
      }
      case SwapMethods[4]: {
        console.log('case4')
        // swapTokensForExactETH
        const amountOut = toWei(input0)
        const amountInMax = toWei(maxInput)
        const path = [BSC_TESTNET_ADDRESS[token0], BSC_TESTNET_ADDRESS[WBNB]]
        const to = account
        const deadline = (Math.floor(Date.now() / 1000) + trxDeadline * 60).toString()
        const trx = await _swapTokensForExactETH(amountOut, amountInMax, path, to, deadline)
        return trx
      }
      case SwapMethods[5]: {
        // console.log('case5')
        // swapExactTokensForTokens-->>
        const amountIn = toWei(input0)
        const amountOutMin = toWei(minReceived)
        const path = [BSC_TESTNET_ADDRESS[token0], BSC_TESTNET_ADDRESS[token1]]
        const to = account
        const deadline = (Math.floor(Date.now() / 1000) + trxDeadline * 60).toString()
        const trx = await _swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline)
        return trx
      }
      case SwapMethods[6]: {
        console.log('case6')
        // swapTokensForExactTokens
        const amountOut = toWei(input0)
        const amountInMax = toWei(maxInput)
        const path = [BSC_TESTNET_ADDRESS[token0], BSC_TESTNET_ADDRESS[token1]]
        const to = account
        const deadline = (Math.floor(Date.now() / 1000) + trxDeadline * 60).toString()

        // console.log({ amountOut, amountInMax, path, to, deadline })

        const trx = await _swapTokensForExactTokens(amountOut, amountInMax, path, to, deadline)
        return trx
      }
      default:
        throw new Error('Unknown swap transaction')
    }
  } catch (error) {
    throw error
  }
}

const _swapExactETHForTokens = async (
  amountOutMin: string,
  path: string[],
  to: string,
  deadline: string,
  tokenInputAmount: string
) => {
  try {
    const instance = getContract(ROUTER, ROUTER)
    const trx = await instance.methods.swapExactETHForTokens(amountOutMin, path, to, deadline).send({
      from: to,
      value: tokenInputAmount,
    })
    return trx
  } catch (error) {
    throw error
  }
}
const _swapETHForExactTokens = async (
  amountOut: string,
  path: string[],
  to: string,
  deadline: string,
  tokenInputAmount: string
) => {
  try {
    const instance = getContract(ROUTER, ROUTER)
    const trx = await instance.methods.swapETHForExactTokens(amountOut, path, to, deadline).send({
      from: to,
      value: tokenInputAmount,
    })
    return trx
  } catch (error) {
    throw error
  }
}
const _swapExactTokensForETH = async (
  amountIn: string,
  amountOutMin: string,
  path: string[],
  to: string,
  deadline: string
) => {
  try {
    const instance = getContract(ROUTER, ROUTER)
    const trx = await instance.methods.swapExactTokensForETH(amountIn, amountOutMin, path, to, deadline).send({
      from: to,
    })
    return trx
  } catch (error) {
    throw error
  }
}
const _swapTokensForExactETH = async (
  amountOut: string,
  amountInMax: string,
  path: string[],
  to: string,
  deadline: string
) => {
  try {
    const instance = getContract(ROUTER, ROUTER)
    const trx = await instance.methods.swapTokensForExactETH(amountOut, amountInMax, path, to, deadline).send({
      from: to,
    })
    return trx
  } catch (error) {
    throw error
  }
}
const _swapExactTokensForTokens = async (
  amountIn: string,
  amountOutMin: string,
  path: string[],
  to: string,
  deadline: string
) => {
  try {
    const instance = getContract(ROUTER, ROUTER)
    const trx = await instance.methods.swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline).send({
      from: to,
    })
    return trx
  } catch (error) {
    throw error
  }
}
const _swapTokensForExactTokens = async (
  amountOut: string,
  amountInMax: string,
  path: string[],
  to: string,
  deadline: string
) => {
  try {
    const instance = getContract(ROUTER, ROUTER)
    const trx = await instance.methods.swapTokensForExactTokens(amountOut, amountInMax, path, to, deadline).send({
      from: to,
    })
    return trx
  } catch (error) {
    throw error
  }
}
