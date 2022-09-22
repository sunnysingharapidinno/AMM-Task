import Web3 from 'web3'
import { PROIVDER } from '../constants/providerConstants'

let currentProviderConfig = PROIVDER[97]

const web3 = new Web3(Web3.givenProvider || currentProviderConfig.rpc)

export const getCurrentProvider = () => currentProviderConfig

export const setCurrentProvider = (providerId: number) => {
  currentProviderConfig = PROIVDER[providerId]
}

export const getWeb3 = (): Web3 => web3

export const setWeb3Provider = (provider: string): void => {
  try {
    web3.setProvider(provider)
  } catch (error) {
    throw error
  }
}
