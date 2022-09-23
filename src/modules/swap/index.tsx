import { useEffect, useState } from 'react'
import { BsArrowDownCircle } from 'react-icons/bs'
import AmmInput from '../../shared/ammInput'
import Button from '../../shared/button'
import Expander from '../../shared/expander'
import { Card, Center, CustomText, Flex, RotateContainer, Spacer, TextBox } from '../../shared/shared'
import { InputContainer, TransactionSettingsContainer } from './style'
import { AiOutlineSetting } from 'react-icons/ai'
import { checkApproval, getBalance } from '../../logic/shared'
import { BNB, BUST, RST, WBNB } from '../../constants'
import { getAmountsOut, getMinReceived } from '../../logic/swap'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { approveToken } from '../../logic/shared/transactions'
import Modal from '../../shared/modal'
import { swap, SwapMethods } from '../../logic/swap/transaction'

export const tokensList = [BNB, RST, BUST]
const SwapPage: React.FC = () => {
  const [input0, setInput0] = useState<string | number>('')
  const [input1, setInput1] = useState<string | number>('')
  const [token0, setToken0] = useState<string>(tokensList[0])
  const [token1, setToken1] = useState<string>(tokensList[1])
  const [token0Balance, setToken0Balance] = useState<string | number>(0)
  const [token1Balance, setToken1Balance] = useState<string | number>(0)
  const [tokenApproved, setTokenApproved] = useState(false)
  const [slippage, setSlippage] = useState<string | number | undefined>(0.5)
  const [trxDeadline, setTrxDeadline] = useState<string | number | undefined>(15)
  const [switchInput, setSwitchInput] = useState<boolean | undefined>()
  const [token0PerToken1, setToken0PerToken1] = useState<string | number>(0)
  const [approvingToken0, setApprovingToken0] = useState(false)
  const [minReceived, setMinReceived] = useState<number | string>(0)
  const [swapMethod, setSwapMethod] = useState<string | null>()

  const [notifyMessage, setNotifyMessage] = useState<{ name: string; message: string; autoClose: boolean } | null>(null)

  const { account } = useSelector((state: RootState) => state.wallet)

  const _handleInput0OnChange = async (value: string | number) => {
    setInput0(value)
    if (value && Number(value) > 0) {
      const amount = await getAmountsOut(value?.toString(), token0, token1)
      setInput1(amount)
      setMinReceived(getMinReceived(amount, Number(slippage)))
      if (!switchInput) {
        _swapMethodFromInput0()
      } else {
        _swapMethodFromInput1()
      }
    } else {
      setInput1('')
    }
  }

  const _handleInput1OnChange = async (value: string | number) => {
    setInput1(value)
    if (value && Number(value) > 0) {
      const amount = await getAmountsOut(value?.toString(), token1, token0)
      setInput0(amount)
      setMinReceived(getMinReceived(amount, Number(slippage)))
      if (switchInput) {
        _swapMethodFromInput0()
      } else {
        _swapMethodFromInput1()
      }
    } else {
      setInput0('')
    }
  }

  const _swapMethodFromInput0 = () => {
    if (token0 === BNB || token0 === WBNB) {
      setSwapMethod(SwapMethods[1])
    } else {
      if (token1 === BNB || token1 === WBNB) {
        setSwapMethod(SwapMethods[3])
      } else {
        setSwapMethod(SwapMethods[5])
      }
    }
  }

  const _swapMethodFromInput1 = () => {
    if (token0 === BNB || token0 === WBNB) {
      setSwapMethod(SwapMethods[2])
    } else {
      if (token1 === BNB || token1 === WBNB) {
        setSwapMethod(SwapMethods[4])
      } else {
        setSwapMethod(SwapMethods[6])
      }
    }
  }

  const _getToken0PerToken1 = async () => {
    try {
      if (switchInput) {
        const value = await getAmountsOut(1, token1, token0)
        setToken0PerToken1(value)
      } else {
        const value = await getAmountsOut(1, token0, token1)
        setToken0PerToken1(value)
      }
    } catch (error) {
      setToken0PerToken1(0)
    }
  }

  const _checkApproval = async () => {
    try {
      if (account) {
        if (switchInput) {
          const token1Approval = await checkApproval(token1, account)
          setTokenApproved(token1Approval)
        } else {
          const token0Approval = await checkApproval(token0, account)
          setTokenApproved(token0Approval)
        }
      }
    } catch (error) {
      throw error
    }
  }

  const _getBalance = async () => {
    try {
      if (account) {
        const token0Balance = await getBalance(token0, account)
        const token1Balance = await getBalance(token1, account)

        setToken0Balance(token0Balance)
        setToken1Balance(token1Balance)
      }
    } catch (error) {
      console.log(error)
      setToken0Balance(0)
      setToken1Balance(0)
    }
  }

  const _handleToken0Approval = async () => {
    if (account) {
      try {
        setApprovingToken0(true)

        if (switchInput) {
          await approveToken(token1, account)
        } else {
          await approveToken(token0, account)
        }

        setApprovingToken0(false)
        setNotifyMessage({
          message: `Successfully approved ${switchInput ? token1 : token0}`,
          name: 'Transaction Success',
          autoClose: true,
        })
      } catch (error) {
        console.log(error)
        setApprovingToken0(false)
        setNotifyMessage({
          /* @ts-ignore */
          message: error?.message,
          name: 'Error in transaction',
          autoClose: true,
        })
      }
    }
  }

  const _handleSwap = async () => {
    try {
      setNotifyMessage({
        message: `Transaction in progress for ${input1} ${token1} for ${input0} ${token0} `,
        name: 'Transaction in progress',
        autoClose: false,
      })
      const trx = await swap({
        minReceived,
        maxInput: Number(input0) + (Number(input0) * Number(slippage)) / 100,
        token0,
        token1,
        account,
        trxDeadline,
        swapMethod,
        input0,
        input1,
      })

      console.log(trx)

      setNotifyMessage({
        message: `Transaction hash ${trx.transactionHash}`,
        name: 'Transaction success',
        autoClose: false,
      })
    } catch (error) {
      setNotifyMessage({
        /* @ts-ignore */
        message: error?.message,
        name: 'Error in transaction',
        autoClose: false,
      })
    }
  }

  const _handleSwitchInput = () => {
    setSwitchInput(!switchInput)
    _getToken0PerToken1()

    if (switchInput) {
      setMinReceived(getMinReceived(Number(input1), Number(slippage)))
    } else {
      setMinReceived(getMinReceived(Number(input0), Number(slippage)))
    }
  }

  const _handleSlippageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlippage(e.target.value)
    if (switchInput) {
      setMinReceived(getMinReceived(Number(input1), Number(e.target.value)))
    } else {
      setMinReceived(getMinReceived(Number(input0), Number(e.target.value)))
    }
  }

  const _handleAutoSlippageClick = () => {
    setSlippage(0.5)
    if (switchInput) {
      setMinReceived(getMinReceived(Number(input1), 0.5))
    } else {
      setMinReceived(getMinReceived(Number(input0), 0.5))
    }
  }

  const _handleInput0MaxClick = async () => {
    if (account) {
      if (token0 === BNB || token0 === WBNB) {
        await _handleInput0OnChange(Number(token0Balance) - 0.01)
      } else {
        await _handleInput0OnChange(token0Balance)
      }
    }
  }

  const _handleInput1MaxClick = async () => {
    if (account) {
      if (token1 === BNB || token1 === WBNB) {
        await _handleInput1OnChange(Number(token1Balance) - 0.01)
      } else {
        await _handleInput1OnChange(token1Balance)
      }
    }
  }

  const _handleSwapButtonDisabled = (): boolean => {
    if (!account || Number(token0Balance) < Number(input0) || !input0 || !input1) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    if (notifyMessage && notifyMessage?.autoClose) {
      setTimeout(() => {
        setNotifyMessage(null)
      }, 3000)
    }
  }, [notifyMessage])

  useEffect(() => {
    if (account) {
      _checkApproval()
      _getBalance()
    }
  }, [account, switchInput, approvingToken0, token0, token1])

  useEffect(() => {
    _getToken0PerToken1()
  }, [token0])

  return (
    <Center>
      <Spacer marginTop="3rem" />
      <Card>
        <Expander
          header={() => (
            <CustomText variants="h5" weight="700">
              Swap
            </CustomText>
          )}
          expanderIcon={<AiOutlineSetting className="icon" />}
        >
          <TransactionSettingsContainer>
            <CustomText size="1.2rem" weight="700">
              Transaction Settings
            </CustomText>
            <Spacer margin="0.5rem" />

            <CustomText size="0.9rem" weight="700">
              Slippage
            </CustomText>
            <div className="column">
              <Button onClick={_handleAutoSlippageClick}>Auto</Button>
              <TextBox fullWidth type="text" value={slippage} placeholder="Slippage" onChange={_handleSlippageInput} />
            </div>
            <CustomText size="0.9rem" weight="700">
              Transaction Deadline
            </CustomText>

            <div className="column">
              <Button onClick={() => setTrxDeadline('5')}>Auto</Button>
              <TextBox
                fullWidth
                type="text"
                placeholder="Transaction Deadline"
                value={trxDeadline}
                onChange={(e) => setTrxDeadline(e.target.value)}
              />
            </div>
            <Spacer margin="2rem" />
          </TransactionSettingsContainer>
        </Expander>
        <Spacer margin="2rem" />
        <InputContainer rotate={switchInput}>
          <AmmInput
            placeholder="0.00"
            balance={token0Balance}
            className="input0"
            value={input0}
            selctedToken={token0}
            onMaxClick={_handleInput0MaxClick}
            onChange={_handleInput0OnChange}
            tokenList={tokensList.filter((token) => token !== token1)}
            onTokenChange={(token) => {
              setToken0(token)
            }}
          />
          <Center>
            <RotateContainer onClick={_handleSwitchInput} rotate={switchInput}>
              <BsArrowDownCircle className="icon" />
            </RotateContainer>
          </Center>
          <AmmInput
            placeholder="0.00"
            balance={token1Balance}
            tokenList={tokensList.filter((token) => token !== token0)}
            className="input1"
            value={input1}
            selctedToken={token1}
            onTokenChange={(token) => {
              setToken1(token)
            }}
            onMaxClick={_handleInput1MaxClick}
            onChange={_handleInput1OnChange}
          />
        </InputContainer>
        <Spacer margin="1rem" />
        <Expander
          open={true}
          header={`1 ${switchInput ? token1 : token0} = ${Number(token0PerToken1).toFixed(2)} ${
            switchInput ? token0 : token1
          }`}
        >
          <Flex justifyContent="space-between">
            <CustomText size="0.9rem" weight="700">
              Min Received
            </CustomText>
            <CustomText size="0.9rem" weight="700">
              {Number(minReceived).toFixed(2)}
            </CustomText>
          </Flex>
          <Spacer marginTop="0.5rem" />
          <Flex justifyContent="space-between">
            <CustomText size="0.9rem" weight="700">
              Price Impact
            </CustomText>
            <CustomText size="0.9rem" weight="700">
              <i>TODO</i>
            </CustomText>
          </Flex>
          <Spacer marginTop="1rem" />
        </Expander>

        <Center>
          {!tokenApproved && account ? (
            <Flex>
              <Button disabled={!account || approvingToken0 || tokenApproved} onClick={_handleToken0Approval}>
                Approve {switchInput ? token1 : token0}
              </Button>
            </Flex>
          ) : (
            <Button disabled={_handleSwapButtonDisabled()} onClick={_handleSwap}>
              Swap
            </Button>
          )}
        </Center>
      </Card>

      <Modal
        show={!!notifyMessage}
        toggleModal={() => {
          setNotifyMessage(null)
        }}
        heading={notifyMessage?.name}
      >
        <CustomText
          variants="normal"
          style={{
            wordWrap: 'break-word',
          }}
        >
          {notifyMessage?.message}
        </CustomText>
      </Modal>
    </Center>
  )
}

export default SwapPage
