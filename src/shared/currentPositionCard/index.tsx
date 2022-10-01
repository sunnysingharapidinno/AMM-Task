import { I_liquidityData } from '../../modules/removeLiquidity'
import Pair from '../pair'
import { Card, CustomText, Flex, Spacer } from '../shared'
import Token from '../token'

const CurrentPositionCard = (props: I_liquidityData) => {
  if (props) {
    return (
      <Card>
        <CustomText variants="h6" weight="700">
          Your Current Position
        </CustomText>
        <Spacer marginTop="1rem" />
        <Flex justifyContent="space-between">
          <Pair token0={props?.token0} token1={props?.token1} label />
          <CustomText size="0.9rem" weight="700">
            {Number(props.pairBalance).toFixed(4)}
          </CustomText>
        </Flex>
        <Spacer marginTop="1rem" />
        <Flex justifyContent="space-between">
          <Token token={props?.token0} label size="2rem" />
          <CustomText size="0.9rem" weight="700">
            {Number(props.token0Balance).toFixed(4)} {props?.token0}
          </CustomText>
        </Flex>
        <Spacer marginTop="1rem" />
        <Flex justifyContent="space-between">
          <Token token={props?.token1} label size="2rem" />
          <CustomText size="0.9rem" weight="700">
            {Number(props.token1Balance).toFixed(4)} {props?.token1}
          </CustomText>
        </Flex>
        <Spacer marginTop="1rem" />
        <Flex justifyContent="space-between">
          <CustomText size="0.9rem" weight="700">
            Pool Share
          </CustomText>
          <CustomText size="0.9rem" weight="700">
            {Number(props.poolShare).toFixed(4)}%
          </CustomText>
        </Flex>
      </Card>
    )
  } else {
    return <></>
  }
}

export default CurrentPositionCard
