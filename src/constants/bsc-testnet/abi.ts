import { AMMLP, ERC20, FACTORY, ROUTER } from '..'
import ERC20ABI from '../contract/ABI/ERC20.json'
import AMMLPABI from '../contract/ABI/AMMLP.json'
import FactoryABI from '../contract/ABI/Factory.json'
import UniV2RouterABI from '../contract/ABI/UniswapRouter.json'
import { ABI_INTERFACE } from '../contract'

export const BSC_TESTNET_ABI: ABI_INTERFACE = {
  [ROUTER]: UniV2RouterABI.abi,
  [ERC20]: ERC20ABI.abi,
  [FACTORY]: FactoryABI.abi,
  [AMMLP]: AMMLPABI.abi,
}
