import { getWeb3 } from '../shared/provider'

export const walletLogin = async () => {
  try {
    const web3 = getWeb3()
    /* @ts-ignore */
    const accounts = await web3.currentProvider?.request({
      method: 'eth_requestAccounts',
    })

    return accounts[0]
  } catch (error) {
    throw error
  }
}

export const walletChangeNetwork = () => {
  try {
  } catch (error) {
    throw error
  }
}

export const walletAddNetwork = () => {
  try {
  } catch (error) {
    throw error
  }
}

export const walletAddToken = () => {
  try {
  } catch (error) {
    throw error
  }
}
