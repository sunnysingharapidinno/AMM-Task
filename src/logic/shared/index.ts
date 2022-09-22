import { BNB, ERC20, ROUTER } from '../../constants'
import { BSC_TESTNET_ADDRESS } from '../../constants/bsc-testnet/contract'
import { getContract, getContractByAddress } from '../contract'
import { getWeb3 } from '../provider'
import { isEqualTo, toEther } from '../utility'

export const getBalance = async (tokenSymbol: string, userAddress: string): Promise<string> => {
  try {
    if (tokenSymbol === BNB) {
      const web3 = getWeb3()
      const balance = await web3.eth.getBalance(userAddress)

      return toEther(balance)
    } else {
      const instance = getContract(ERC20, tokenSymbol)
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
