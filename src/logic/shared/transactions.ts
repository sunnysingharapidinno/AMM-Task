import BigNumber from 'bignumber.js'
import { ERC20, ROUTER } from '../../constants'
import { BSC_TESTNET_ADDRESS } from '../../constants/bsc-testnet/contract'
import { getContract } from '../contract'

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
