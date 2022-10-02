import BigNumber from 'bignumber.js'
import { ERC20, ROUTER } from '../../constants'
import { BSC_TESTNET_ADDRESS } from '../../constants/bsc-testnet/contract'
import { getContract } from './contract'
import { signERC2612Permit } from 'eth-permit'
import { getWeb3 } from './provider'
import { toWei } from '../utility'
import { RSV } from 'eth-permit/dist/rpc'

export const approveToken = async (tokenSymbol: string, userAddress: string) => {
  try {
    const maxAllowance = new BigNumber(2).pow(256).minus(1)
    const instance = getContract(ERC20, tokenSymbol)

    const trx = await instance.methods.approve(BSC_TESTNET_ADDRESS[ROUTER], maxAllowance).send({
      from: userAddress,
    })
    return trx
  } catch (error) {
    throw error
  }
}

export interface ERC2612PermitMessage {
  owner: string
  spender: string
  value: number | string
  nonce: number | string
  deadline: number | string
}

export const getPermit = async (
  tokenAddress: string,
  senderAddress: string,
  spender: string,
  value: string
): Promise<ERC2612PermitMessage & RSV> => {
  try {
    const web3 = getWeb3()
    const permit = await signERC2612Permit(web3.currentProvider, tokenAddress, senderAddress, spender, toWei(value))
    return permit
  } catch (error) {
    throw error
  }
}
