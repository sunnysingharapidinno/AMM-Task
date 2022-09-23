import { BNB, ERC20, ROUTER, FACTORY, WBNB, AMMLP } from '../../constants'
import { BSC_TESTNET_ADDRESS } from '../../constants/bsc-testnet/contract'
import { getContract, getContractByAddress } from '../contract'
import { getWeb3 } from '../provider'
import { isAddress, isEqualTo, toEther } from '../utility'

export const getBalance = async (token: string, userAddress: string): Promise<string> => {
  try {
    const tokenAddress = isAddress(token) ? token : BSC_TESTNET_ADDRESS[token]

    if (tokenAddress === BSC_TESTNET_ADDRESS[BNB]) {
      const web3 = getWeb3()
      const balance = await web3.eth.getBalance(userAddress)

      return toEther(balance)
    } else {
      const instance = getContractByAddress(ERC20, tokenAddress)
      const balance = await instance.methods.balanceOf(userAddress).call()

      return toEther(balance)
    }
  } catch (error) {
    throw error
  }
}

export const checkApproval = async (tokenSymbol: string, userAddress: string): Promise<boolean> => {
  try {
    if (tokenSymbol === BNB) {
      return true
    } else {
      const instance = getContract(ERC20, tokenSymbol)
      const allowance = await instance.methods.allowance(userAddress, BSC_TESTNET_ADDRESS[ROUTER]).call()

      if (!isEqualTo(toEther(allowance), 0)) {
        return true
      } else {
        return false
      }
    }
  } catch (error) {
    throw error
  }
}

export const getReserves = async (abi: any, address: string) => {
  try {
    const instance = getContractByAddress(abi, address)
    const reserves = await instance.methods.getReserves().call()
    return reserves
  } catch (error) {
    throw error
  }
}

export const getTotalSupply = async (abi: any, address: string): Promise<string> => {
  try {
    const instance = getContractByAddress(abi, address)
    const totalSupply = await instance.methods.totalSupply().call()

    return totalSupply
  } catch (error) {
    throw error
  }
}

export const getToken0 = async (address: string) => {
  try {
    const instance = getContractByAddress(AMMLP, address)
    const token0 = await instance.methods.token0().call()

    return token0
  } catch (error) {
    throw error
  }
}
export const getToken1 = async (address: string) => {
  try {
    const instance = getContractByAddress(AMMLP, address)
    const token0 = await instance.methods.token1().call()

    return token0
  } catch (error) {
    throw error
  }
}

export const getPairAddresByTokenAddress = async (token0Address: string, token1Address: string): Promise<string> => {
  try {
    const instance = getContract(FACTORY, FACTORY)
    const address = await instance.methods.getPair(token0Address, token1Address).call()

    return address
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAllPairsLength = async () => {
  try {
    const instance = getContract(FACTORY, FACTORY)
    const length = await instance.methods.allPairsLength().call()

    return Number(length)
  } catch (error) {
    throw error
  }
}

export const getPairAddressById = async (id: string | number) => {
  try {
    const instance = getContract(FACTORY, FACTORY)
    const pairAddress = await instance.methods.allPairs(String(id)).call()

    return pairAddress
  } catch (error) {
    throw error
  }
}

export const getTokenData = async (
  tokenAddress: string
): Promise<{
  name: string
  symbol: string
}> => {
  try {
    const instance = getContractByAddress(ERC20, tokenAddress)
    const name = await instance.methods.name().call()
    const symbol = await instance.methods.symbol().call()
    return {
      name,
      symbol,
    }
  } catch (error) {
    throw error
  }
}

export interface I_GetLpPairDetails {
  token0Name: string
  token0Symbol: string
  token0Address: string
  token1Name: string
  token1Symbol: string
  token1Address: string
  pairAddress: string
}

export const getLpPairDetails = async (pairAddress: string): Promise<I_GetLpPairDetails> => {
  try {
    const token0 = await getToken0(pairAddress)
    const token1 = await getToken1(pairAddress)

    const token0Data = await getTokenData(token0)
    const token1Data = await getTokenData(token1)

    return {
      token0Name: token0Data.name,
      token0Symbol: token0Data.symbol,
      token0Address: token0,
      token1Name: token1Data.name,
      token1Symbol: token1Data.symbol,
      token1Address: token1,
      pairAddress: pairAddress,
    }
  } catch (error) {
    throw error
  }
}
