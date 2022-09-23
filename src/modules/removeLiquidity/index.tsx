import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLpPairs } from '../../logic/liquidity'
import { loginReducer } from '../../redux/action/walletAction'
import { AppDispatch, RootState } from '../../redux/store'
import Button from '../../shared/button'
import LiquidityPairInfo from '../../shared/liquidityPairInfo'
import { Card, Center, CustomText, Flex, LoadingSpinner, Spacer } from '../../shared/shared'

const RemoveLiquidityPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [userLpAddress, setUserLpAddress] = useState<string[]>([])

  const { account } = useSelector((state: RootState) => state.wallet)
  const dispatch = useDispatch<AppDispatch>()

  const _getUserLpPairAddress = async (account: string) => {
    try {
      setLoading(true)
      const address = await getUserLpPairs(account)
      setUserLpAddress(address)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  useEffect(() => {
    if (account) {
      _getUserLpPairAddress(account)
    }
  }, [account])

  if (account) {
    return (
      <Center>
        <Spacer marginTop="3rem" />

        <Card>
          {loading ? (
            <Flex>
              <LoadingSpinner size="2rem" />
              <Spacer marginLeft="1rem" />
              <CustomText size={'1.5rem'}>Loading user pools</CustomText>
            </Flex>
          ) : (
            <>
              {userLpAddress.map((item, index) => (
                <Spacer paddingBottom="2rem" key={index}>
                  <LiquidityPairInfo pairAddress={item} />
                </Spacer>
              ))}
            </>
          )}
        </Card>
      </Center>
    )
  } else {
    return (
      <Center>
        <Spacer marginTop="3rem" />
        <Card>
          <Flex flexDirection="column">
            <CustomText size={'1.5rem'}>Please Connect with a wallet</CustomText>
            <Spacer marginTop="1.5rem" />
            <Button onClick={() => dispatch(loginReducer())}>Connect Wallet</Button>
            <Spacer marginTop="1.5rem" />
          </Flex>
        </Card>
      </Center>
    )
  }
}

export default RemoveLiquidityPage
