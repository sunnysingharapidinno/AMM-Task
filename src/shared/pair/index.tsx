import { CustomText } from '../shared'
import Token from '../token'
import { PairContainer } from './style'

interface I_Pair {
  size?: string
  token0: string
  token1: string
  label?: boolean | string
  labelColor?: string
}

const Pair = (props: I_Pair) => {
  const { size, token0, token1, label, labelColor } = props

  return (
    <PairContainer>
      <Token size={size} token={token0} />
      <Token size={size} token={token1} className="token1" />

      {label && (
        <CustomText variants="normal" color={labelColor}>
          {typeof label === 'boolean' ? `${token0}-${token1}` : label}
        </CustomText>
      )}
    </PairContainer>
  )
}

export default Pair
