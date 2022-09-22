import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Button from '../button'
import { floatNumRegex } from '../helpers/regex'
import Modal from '../modal'
import { CustomText, TextBox } from '../shared'
import Token from '../token'
import { AMMInputContainer, BalanceContainer, TokenContainer } from './style'

interface AMMInputInterface {
  onMaxClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  onChange?: (value: string | undefined) => void
  onTokenChange?: (token: string) => void
  value?: number | string
  className?: string
  tokenList?: string[]
  selctedToken?: string
  balance?: string | number
}

const AmmInput = (props: AMMInputInterface) => {
  const { onMaxClick, value, onChange, className, onTokenChange, tokenList, selctedToken, balance } = props
  const { account } = useSelector((state: RootState) => state.wallet)
  const [showModal, setShowModal] = useState(false)

  return (
    <AMMInputContainer className={className}>
      <TextBox
        fullWidth
        type="text"
        value={value}
        onChange={(e) => {
          if (onChange && (e.target.value.match(floatNumRegex) || e.target.value === '')) {
            onChange(e.target.value)
          }
        }}
      />

      <BalanceContainer showBalance={Boolean(balance && account)}>
        <CustomText>
          Balance {Number(balance).toFixed(2)} {selctedToken}
        </CustomText>
      </BalanceContainer>

      <Button onClick={onMaxClick}>Max</Button>
      <Button onClick={() => setShowModal(!showModal)}> {selctedToken ? selctedToken : `Select Token`} </Button>

      <Modal
        show={showModal}
        toggleModal={() => {
          setShowModal(false)
        }}
        heading="Select Token"
      >
        {tokenList?.map((token, i) => (
          <TokenContainer
            key={i}
            onClick={() => {
              onTokenChange?.(token)
              setShowModal(false)
            }}
          >
            <Token token={token} label={token} />
          </TokenContainer>
        ))}
      </Modal>
    </AMMInputContainer>
  )
}

export default AmmInput
