import { RSV } from 'eth-permit/dist/rpc'
import { BNB, ROUTER, WBNB } from '../../constants'
import { BSC_TESTNET_ADDRESS } from '../../constants/bsc-testnet/contract'
import { getContract } from '../contract'
import { ERC2612PermitMessage } from '../shared/transactions'
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
      /* If Native token is involved in supplying the liquidity */
      // addLiquidityETH

      let amountOut
      let token
      let amountTokenDesired
      let amountTokenMin
      let amountETHMin
      const deadline = (Math.floor(Date.now() / 1000) + Number(trxDeadline) * 60).toString()
      if (tokenSymbolA === BNB || tokenSymbolA === WBNB) {
        amountOut = tokenInputA
        amountTokenDesired = tokenInputB
        token = tokenSymbolB
        amountTokenMin = Number(tokenInputB) - (Number(tokenInputB) * Number(slippage)) / 100
        amountETHMin = Number(tokenInputA) - (Number(tokenInputA) * Number(slippage)) / 100
      } else {
        amountOut = tokenInputB
        amountTokenDesired = tokenInputB
        token = tokenSymbolA
        amountTokenMin = Number(tokenInputA) - (Number(tokenInputA) * Number(slippage)) / 100
        amountETHMin = Number(tokenInputB) - (Number(tokenInputB) * Number(slippage)) / 100
      }

      console.log(token)

      const trx = await _addLiquidityETH(
        toWei(amountOut),
        BSC_TESTNET_ADDRESS[token],
        toWei(amountTokenDesired),
        toWei(amountTokenMin),
        toWei(amountETHMin),
        userAddress,
        deadline
      )

      return trx
    } else {
      // addLiquidity
      const minReceivedA = Number(tokenInputA) - (Number(tokenInputA) * Number(slippage)) / 100
      const minReceivedB = Number(tokenInputB) - (Number(tokenInputB) * Number(slippage)) / 100
      const deadline = (Math.floor(Date.now() / 1000) + Number(trxDeadline) * 60).toString()
      const trx = await _addLiquidity(
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

const _addLiquidity = async (
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

const _addLiquidityETH = async (
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
      .addLiquidityETH(token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline)
      .send({
        from: to,
        value: amountOut,
      })

    return trx
  } catch (error) {
    throw error
  }
}

interface I_RemoveLiquidity {
  permit?: ERC2612PermitMessage & RSV
  userAddress: string
  token0Address: string
  token1Address: string
  liquidityAmount: string | number
}

export const removeLiquidity = async (args: I_RemoveLiquidity) => {
  try {
    const { permit, token0Address, token1Address, liquidityAmount, userAddress } = args
    const NATIVE_TOKENS = [BNB, WBNB]
    const deadline = Math.floor(Date.now() / 1000) + 1200 /* 20 mins */

    if (permit) {
      if (
        NATIVE_TOKENS.find(
          (token) => String(BSC_TESTNET_ADDRESS[token]).toLowerCase() === String(token0Address).toLowerCase()
        ) ||
        NATIVE_TOKENS.find(
          (token) => String(BSC_TESTNET_ADDRESS[token]).toLowerCase() === String(token1Address).toLowerCase()
        )
      ) {
        let tokenAddress = null
        if (token0Address === BSC_TESTNET_ADDRESS[WBNB]) {
          tokenAddress = token1Address
        } else if (token1Address === BSC_TESTNET_ADDRESS[WBNB]) {
          tokenAddress = token0Address
        }

        if (tokenAddress !== null) {
          const trx = await _removeLiquidityETHWithPermit(tokenAddress, liquidityAmount, 0, 0, userAddress, permit)

          return trx
        } else {
          throw new Error('Unknown Token Address')
        }
      } else {
        const trx = await _removeLiquidityWithPermit(
          token0Address,
          token1Address,
          liquidityAmount,
          0,
          0,
          userAddress,
          permit
        )
        return trx
      }
    } else {
      /* IF PERMIT DOSENOT EXIST THEN APPROVE  THE TRANSACTION FIRST */
      if (
        NATIVE_TOKENS.find((token) => BSC_TESTNET_ADDRESS[token] === token0Address) ||
        NATIVE_TOKENS.find((token) => BSC_TESTNET_ADDRESS[token] === token1Address)
      ) {
        let tokenAddress = null
        if (token0Address === BSC_TESTNET_ADDRESS[WBNB]) {
          tokenAddress = token1Address
        } else if (token1Address === BSC_TESTNET_ADDRESS[WBNB]) {
          tokenAddress = token0Address
        }

        if (tokenAddress !== null) {
          const trx = await _removeLiquidityETH(tokenAddress, liquidityAmount, 0, 0, userAddress, deadline)

          return trx
        } else {
          throw new Error('Unknown Token Address')
        }
      } else {
        const trx = await _removeLiquidity(token0Address, token1Address, liquidityAmount, 0, 0, userAddress, deadline)
        return trx
      }
    }
  } catch (error) {
    throw error
  }
}

const _removeLiquidityWithPermit = async (
  token0Address: string,
  token1Address: string,
  liquidityAmount: string | number,
  amount0Min: string | number,
  amount1Min: string | number,
  to: string,
  permit: ERC2612PermitMessage & RSV
) => {
  try {
    const instance = getContract(ROUTER, ROUTER)
    const trx = await instance.methods
      .removeLiquidityWithPermit(
        token0Address,
        token1Address,
        liquidityAmount,
        amount0Min,
        amount1Min,
        to,
        permit.deadline,
        false,
        permit.v,
        permit.r,
        permit.s
      )
      .send({
        from: to,
      })

    return trx
  } catch (error) {
    throw error
  }
}

const _removeLiquidityETHWithPermit = async (
  tokenAddress: string,
  amount: string | number,
  amountTokenMin: string | number,
  amountEthTokenMin: string | number,
  to: string,
  permit: ERC2612PermitMessage & RSV
) => {
  try {
    const instance = getContract(ROUTER, ROUTER)
    const trx = await instance.methods
      .removeLiquidityETHWithPermit(
        tokenAddress,
        amount,
        amountTokenMin,
        amountEthTokenMin,
        to,
        permit.deadline,
        false,
        permit.v,
        permit.r,
        permit.s
      )
      .send({
        from: to,
      })
    return trx
  } catch (error) {
    throw error
  }
}

const _removeLiquidity = async (
  token0Address: string,
  token1Address: string,
  liquidityAmount: string | number,
  amount0Min: string | Number,
  amount1Min: string | Number,
  to: string,
  deadline: string | number
) => {
  try {
    const instance = getContract(ROUTER, ROUTER)
    const trx = await instance.methods
      .removeLiquidity(
        token0Address,
        token1Address,
        String(liquidityAmount),
        String(amount0Min),
        String(amount1Min),
        to,
        String(deadline)
      )
      .send({
        from: to,
      })

    return trx
  } catch (error) {
    throw error
  }
}

const _removeLiquidityETH = async (
  tokenAddress: string,
  amount: string | number,
  amountTokenMin: string | number,
  amountEthTokenMin: string | number,
  to: string,
  deadline: string | number
) => {
  try {
    const instance = getContract(ROUTER, ROUTER)

    const trx = await instance.methods
      .removeLiquidityETH(
        tokenAddress,
        String(amount),
        String(amountTokenMin),
        String(amountEthTokenMin),
        to,
        String(deadline)
      )
      .send({
        from: to,
      })
    return trx
  } catch (error) {
    throw error
  }
}
