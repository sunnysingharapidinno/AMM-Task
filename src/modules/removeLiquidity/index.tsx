import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { AMMLP } from '../../constants'
import { getBalance, getLpPairDetails, getTotalSupply } from '../../logic/shared'
import { toEther } from '../../logic/utility'
import { RootState } from '../../redux/store'
import Button from '../../shared/button'
import CurrentPositionCard from '../../shared/currentPositionCard'
import { Center, CustomText, Flex, LoadingSpinner, Spacer } from '../../shared/shared'
import RemoveLiquidityDetailedView from './Components/RemoveLiquidityDetailedView'
import RemoveLiquiditySimpleView from './Components/RemoveLiquiditySimpleView'

export interface I_liquidityData {
  pairBalance: number | string
  token0: string
  token1: string
  token0Address?: string
  token1Address?: string
  token0Balance: number | string
  token1Balance: number | string
  poolShare: number | string
}

const RemoveLiquidityPage: React.FC = () => {
  const [currentLiquidityData, setCurrentLiquidityData] = useState<I_liquidityData | null>()
  const [noPairFound, setNoPairFound] = useState<boolean>(false)
  const [removeLiquidityDetailedView, setRemoveLiquidityDetailedView] = useState<boolean>(false)

  const { account } = useSelector((state: RootState) => state.wallet)

  const { lpaddress } = useParams()
  const state = useLocation().state as I_liquidityData

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (account) {
      _getDataFromLpAddress()
    }
  }, [lpaddress, state, account])

  const _getDataFromLpAddress = async () => {
    try {
      setNoPairFound(false)
      setLoading(true)
      if (account) {
        /* if (state && Object.keys(state).length > 0) {
          setCurrentLiquidityData(state)
        } else */ if (lpaddress) {
          const { token0Address, token0Symbol, token1Address, token1Symbol } = await getLpPairDetails(lpaddress)

          const totalSupply = await getTotalSupply(AMMLP, lpaddress)
          const balance = await getBalance(lpaddress, account)
          const token0Balance = await getBalance(token0Address, lpaddress)
          const token1Balance = await getBalance(token1Address, lpaddress)

          const poolToken0Balance = (Number(balance) * Number(token0Balance)) / Number(toEther(totalSupply))
          const poolToken1Balance = (Number(balance) * Number(token1Balance)) / Number(toEther(totalSupply))
          const share = (Number(balance) / Number(toEther(totalSupply))) * 100

          setCurrentLiquidityData({
            pairBalance: balance,
            poolShare: share,
            token0: token0Symbol,
            token0Address: token0Address,
            token0Balance: poolToken0Balance,
            token1: token1Symbol,
            token1Address: token1Address,
            token1Balance: poolToken1Balance,
          })
        }
      }
      setLoading(false)
    } catch (error) {
      setNoPairFound(true)
      setLoading(false)
      throw error
    }
  }

  return (
    <Center>
      <Spacer marginTop="3rem" />
      <CustomText variants="h4" weight="700">
        Remove Liquidity
      </CustomText>

      {noPairFound && (
        <CustomText variants="h5" weight="700">
          LP Pair not found
        </CustomText>
      )}

      {loading ? (
        <Center>
          <Flex>
            <LoadingSpinner size="2rem" />
            <Spacer marginLeft="1rem" />
            <CustomText size={'1.5rem'}>Loading pool data</CustomText>
          </Flex>
        </Center>
      ) : (
        <>
          <Spacer margin="1rem 0rem">
            <Button onClick={() => setRemoveLiquidityDetailedView(!removeLiquidityDetailedView)}>
              {!removeLiquidityDetailedView ? 'Detailed View' : 'Simple View'}
            </Button>
          </Spacer>

          {currentLiquidityData && (
            <>
              {removeLiquidityDetailedView
                ? lpaddress && <RemoveLiquidityDetailedView lpAddress={lpaddress} />
                : lpaddress && <RemoveLiquiditySimpleView lpAddress={lpaddress} />}

              <Spacer marginTop="2rem" />
              <CurrentPositionCard {...currentLiquidityData} />
              <Spacer marginTop="2rem" />
            </>
          )}
        </>
      )}
    </Center>
  )
}

export default RemoveLiquidityPage
