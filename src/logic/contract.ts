import { BSC_TESTNET_ABI } from '../constants/bsc-testnet/abi'
import { BSC_TESTNET_ADDRESS } from '../constants/bsc-testnet/contract'
import { getWeb3 } from './provider'

export const getContract = (abi: string, contract: string) => {
  try {
    const contractInstance = getContractByAddress(abi, BSC_TESTNET_ADDRESS[contract])
    return contractInstance
  } catch (error) {
    throw error
  }
}

export const getContractByAddress = (abi: string, address: string) => {
  try {
    const contractInstance = getContractByAbiAddress(BSC_TESTNET_ABI[abi], address)
    return contractInstance
  } catch (error) {
    throw error
  }
}

export const getContractByAbiAddress = (abi: any, address: string) => {
  try {
    const web3 = getWeb3()
    const contractInstance = new web3.eth.Contract(abi, address)
    return contractInstance
  } catch (error) {
    throw error
  }
}
