import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLpPairs } from '../../logic/liquidity'
import { loginReducer } from '../../redux/action/walletAction'
import { AppDispatch, RootState } from '../../redux/store'
import Button from '../../shared/button'
import LiquidityPairInfo from '../../shared/liquidityPairInfo'
import { Card, Center, CustomText, Flex, GridContainer, LoadingSpinner, Spacer } from '../../shared/shared'

type Props = {}

const LiquidityListPage = (props: Props) => {
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
      <>
        <Spacer marginTop="3rem" />

        {loading ? (
          <Center>
            <Flex>
              <LoadingSpinner size="2rem" />
              <Spacer marginLeft="1rem" />
              <CustomText size={'1.5rem'}>Loading user pools</CustomText>
            </Flex>
          </Center>
        ) : (
          <GridContainer gridContentMinWidth="420px">
            {userLpAddress.map((item, index) => (
              <Spacer paddingBottom="2rem" key={index}>
                <Card>
                  <LiquidityPairInfo pairAddress={item} />
                </Card>
              </Spacer>
            ))}
          </GridContainer>
        )}
      </>
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

export default LiquidityListPage
