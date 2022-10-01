import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AMMLP } from '../../constants'
import { liquidityPath } from '../../logic/paths'
import { getBalance, getLpPairDetails, getTotalSupply, I_GetLpPairDetails } from '../../logic/shared'
import { toEther } from '../../logic/utility'
import { RootState } from '../../redux/store'
import Button from '../button'
import Expander from '../expander'
import Pair from '../pair'
import { CustomText, Flex, LoadingSpinner, Spacer } from '../shared'
import Token from '../token'

interface I_LiquidityPairInfo {
  pairAddress: string
}

const LiquidityPairInfo = (props: I_LiquidityPairInfo) => {
  const { pairAddress } = props
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<I_GetLpPairDetails | undefined>()
  const [balance, setBalance] = useState<string | number>(0)
  const [poolShare, setPoolShare] = useState<string | number>(0)
  const [token0Balance, setToken0Balance] = useState<string | number>(0)
  const [token1Balance, setToken1Balance] = useState<string | number>(0)
  const [removeLiquidityModal, setRemoveLiquidity] = useState<boolean>(false)
  const navigate = useNavigate()

  const { account } = useSelector((state: RootState) => state.wallet)

  const _fetchData = async (pairAddress: string) => {
    try {
      setLoading(true)
      const data = await getLpPairDetails(pairAddress)
      setData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const _getBalance = async (pairAddress: string, account: string) => {
    try {
      const balance = await getBalance(pairAddress, account)
      setBalance(balance)
    } catch (error) {
      throw error
    }
  }

  const _getUserPoolData = async (
    pairAddress: string,
    balance: string,
    token0Address: string,
    token1Address: string
  ) => {
    try {
      const totalSupply = await getTotalSupply(AMMLP, pairAddress)
      const token0Balance = await getBalance(token0Address, pairAddress)
      const token1Balance = await getBalance(token1Address, pairAddress)

      const poolToken0Balance = (Number(balance) * Number(token0Balance)) / Number(toEther(totalSupply))
      const poolToken1Balance = (Number(balance) * Number(token1Balance)) / Number(toEther(totalSupply))

      setToken0Balance(poolToken0Balance)
      setToken1Balance(poolToken1Balance)

      const share = (Number(balance) / Number(toEther(totalSupply))) * 100
      setPoolShare(share)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (pairAddress) {
      _fetchData(pairAddress)
    }
  }, [pairAddress])

  useEffect(() => {
    if (account && pairAddress) {
      _getBalance(pairAddress, account)
    }
  }, [account, pairAddress])

  useEffect(() => {
    if (pairAddress && balance && data?.token0Address && data.token1Address) {
      _getUserPoolData(pairAddress, String(balance), data?.token0Address, data.token1Address)
    }
  }, [pairAddress, balance, data])

  if (loading) {
    return (
      <Spacer padding="2.5rem 1rem">
        <Flex>
          <LoadingSpinner size="2rem" />
          <Spacer marginLeft="1rem" />
          <CustomText variants="h5">Loading LP Token Data...</CustomText>
        </Flex>
      </Spacer>
    )
  }

  if (data) {
    return (
      <Expander open header={() => <Pair token0={data.token0Symbol} token1={data.token1Symbol} label />}>
        <Flex justifyContent="space-between">
          <CustomText size={'1rem'}>Pooled {data.token0Symbol}:</CustomText>
          <CustomText size={'1rem'}>
            <Flex>
              {Number(token0Balance).toFixed(4)} <Spacer marginLeft="1rem" />{' '}
              <Token token={data.token0Symbol} size="1.5rem" />
            </Flex>
          </CustomText>
        </Flex>
        <Spacer marginTop="0.5rem" />
        <Flex justifyContent="space-between">
          <CustomText size={'1rem'}>Pooled {data.token1Symbol}:</CustomText>
          <CustomText size={'1rem'}>
            <Flex>
              {Number(token1Balance).toFixed(4)} <Spacer marginLeft="1rem" />{' '}
              <Token token={data.token1Symbol} size="1.5rem" />
            </Flex>
          </CustomText>
        </Flex>
        <Spacer marginTop="0.5rem" />
        <Flex justifyContent="space-between">
          <CustomText size={'1rem'}>Your pool tokens:</CustomText>
          <CustomText size={'1rem'}>
            {Number(balance).toFixed(4)} {`${data.token0Symbol}-${data.token1Symbol}`}
          </CustomText>
        </Flex>
        <Spacer marginTop="0.5rem" />
        <Flex justifyContent="space-between">
          <CustomText size={'1rem'}>Your pool share:</CustomText>
          <CustomText size={'1rem'}>{Number(poolShare).toFixed(4)}%</CustomText>
        </Flex>
        <Spacer marginTop="2rem" />
        <Flex justifyContent="space-evenly">
          <Button
            onClick={() =>
              navigate(`${liquidityPath}/${data.token0Address}/${data.token1Address}`, {
                state: {
                  pairBalance: balance,
                  poolShare: poolShare,
                  token0: data.token0Symbol,
                  token0Address: data.token0Address,
                  token0Balance: token0Balance,
                  token1: data.token1Symbol,
                  token1Address: data.token1Address,
                  token1Balance: token1Balance,
                },
              })
            }
          >
            Add
          </Button>
          <Button
            onClick={() =>
              navigate(`/remove/${pairAddress}`, {
                state: {
                  pairBalance: balance,
                  poolShare: poolShare,
                  token0: data.token0Symbol,
                  token0Address: data.token0Address,
                  token0Balance: token0Balance,
                  token1: data.token1Symbol,
                  token1Address: data.token1Address,
                  token1Balance: token1Balance,
                },
              })
            }
            /* onClick={() => setRemoveLiquidity(true)} */
          >
            Remove
          </Button>
        </Flex>
      </Expander>
    )
  }

  return <></>
}

export default LiquidityPairInfo
