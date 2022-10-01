import { CustomText, Spacer } from '../shared'
import { TokenWrapper } from './style'

interface TokenProps {
  token?: string
  label?: string | boolean
  labelColor?: string
  size?: string
  className?: string
}

const Token = (props: TokenProps) => {
  const { token = 'unknown', label, labelColor, size, className } = props

  return (
    <TokenWrapper className={className} labelColor={labelColor} size={size}>
      <img src={require(`../../assets/tokens/${token?.toLowerCase()}.png`)} alt={token} />
      {label ? (
        <Spacer marginLeft="0.5rem">
          <CustomText variants="normal" color={props.labelColor}>
            {typeof label === 'boolean' ? token : label}
          </CustomText>
        </Spacer>
      ) : null}
    </TokenWrapper>
  )
}

export default Token
