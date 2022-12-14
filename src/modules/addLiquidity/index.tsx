import { useEffect, useState } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { BNB, WBNB } from '../../constants'
import { getLiquidity, getPoolShare, getQuotePrice } from '../../logic/liquidity'
import { supplyLiquidity } from '../../logic/liquidity/transaction'
import { checkApproval, getBalance, getTokenNameFromAddress } from '../../logic/shared'
import { approveToken } from '../../logic/shared/transactions'
import { RootState } from '../../redux/store'
import AmmInput from '../../shared/ammInput'
import Button from '../../shared/button'
import CurrentPositionCard from '../../shared/currentPositionCard'
import Expander from '../../shared/expander'
import Modal from '../../shared/modal'
import { Card, Center, CustomText, Flex, RotateContainer, Spacer, TextBox } from '../../shared/shared'
import { tokensList } from '../swap'
import { TransactionSettingsContainer } from '../swap/style'

type Props = {}

interface I_liquidityData {
  pairBalance: number | string
  token0: string
  token1: string
  token0Balance: number | string
  token1Balance: number | string
  poolShare: number | string
}

const AddLiquidityPage = (props: Props) => {
  const [input0, setInput0] = useState<string | number>('')
  const [input1, setInput1] = useState<string | number>('')
  const [token0, setToken0] = useState<string>(tokensList[0])
  const [token1, setToken1] = useState<string>(tokensList[1])
  const [token0Balance, setToken0Balance] = useState<string | number>(0)
  const [token1Balance, setToken1Balance] = useState<string | number>(0)
  const [token0Approved, setToken0Approved] = useState(false)
  const [token1Approved, setToken1Approved] = useState(false)
  const [slippage, setSlippage] = useState<string | number>(0.5)
  const [trxDeadline, setTrxDeadline] = useState<string | number>(15)
  const [token0PerToken1, setToken0PerToken1] = useState<string | number>(0)
  const [token1PerToken0, setToken1PerToken0] = useState<string | number>(0)
  const [approvingToken0, setApprovingToken0] = useState(false)
  const [approvingToken1, setApprovingToken1] = useState(false)
  const [minReceived, setMinReceived] = useState<number | string>(0)
  const [poolShare, setPoolShare] = useState<number | string>(0)
  const [currentLiquidityData, setCurrentLiquidityData] = useState<I_liquidityData | null>()

  const [notifyMessage, setNotifyMessage] = useState<{ name: string; message: string; autoClose: boolean } | null>(null)

  const { account } = useSelector((state: RootState) => state.wallet)

  const params = useParams()
  const state = useLocation().state as I_liquidityData

  const _handleInput0OnChange = async (value: string | number) => {
    setInput0(value)

    if (value && Number(value) > 0) {
      const amount = await getQuotePrice(token0, token1, value)
      setInput1(amount)
      const share = await getPoolShare(token0, token1, value, amount)
      setPoolShare(share)
      const liquidity = await getLiquidity(token0, token1, value, amount)
      setMinReceived(liquidity)
    } else {
      setInput1('')
      setPoolShare(0)
      setMinReceived(0)
    }
  }

  const _handleInput1OnChange = async (value: string | number) => {
    setInput1(value)
    if (value && Number(value) > 0) {
      const amount = await getQuotePrice(token0, token1, value, true)
      setInput0(amount)
      const share = await getPoolShare(token0, token1, amount, value)
      setPoolShare(share)
      const liquidity = await getLiquidity(token0, token1, amount, value)
      setMinReceived(liquidity)
    } else {
      setInput0('')
      setPoolShare(0)
      setMinReceived(0)
    }
  }

  const _handleAutoSlippageClick = () => {
    setSlippage(0.5)
  }

  const _handleSlippageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlippage(e.target.value)
  }

  const _handleToken0Approval = async () => {
    if (account) {
      try {
        setApprovingToken0(true)
        await approveToken(token0, account)

        setApprovingToken0(false)
        setNotifyMessage({
          message: `Successfully approved ${token0}`,
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

  const _handleToken1Approval = async () => {
    if (account) {
      try {
        setApprovingToken1(true)
        await approveToken(token1, account)

        setApprovingToken1(false)
        setNotifyMessage({
          message: `Successfully approved ${token1}`,
          name: 'Transaction Success',
          autoClose: true,
        })
      } catch (error) {
        console.log(error)
        setApprovingToken1(false)
        setNotifyMessage({
          /* @ts-ignore */
          message: error?.message,
          name: 'Error in transaction',
          autoClose: true,
        })
      }
    }
  }

  const _handleSupplyLiquidity = async () => {
    try {
      setNotifyMessage({
        message: `Transaction in progress for supplying ${token0}-${token1} LP`,
        name: 'Transaction in progress',
        autoClose: false,
      })

      if (account) {
        const trx = await supplyLiquidity(token0, token1, input0, input1, slippage, trxDeadline, account)

        console.log(trx)

        setNotifyMessage({
          message: `Transaction hash ${trx.transactionHash}`,
          name: 'Transaction success',
          autoClose: false,
        })
      }
    } catch (error) {
      setNotifyMessage({
        /* @ts-ignore */
        message: error?.message,
        name: 'Error in transaction',
        autoClose: false,
      })
    }
  }

  const _getTokenPerToken = async () => {
    try {
      const token0PerToken1 = await getQuotePrice(token0, token1, 1)
      setToken0PerToken1(token0PerToken1)
      const token1PerToken0 = await getQuotePrice(token0, token1, 1, true)
      setToken1PerToken0(token1PerToken0)
    } catch (error) {
      setToken0PerToken1(0)
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

  const _checkApproval = async () => {
    try {
      if (account) {
        const token0Approval = await checkApproval(token0, account)
        setToken0Approved(token0Approval)
        const token1Approval = await checkApproval(token1, account)
        setToken1Approved(token1Approval)
      }
    } catch (error) {
      throw error
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

  const _handleSupplyButtonDisabled = (): boolean => {
    if (
      !account ||
      Number(token0Balance) < Number(input0) ||
      Number(token1Balance) < Number(input1) ||
      !input0 ||
      !input1
    ) {
      return true
    } else {
      return false
    }
  }

  const _fetchTokenSymbolFromParams = async (token0Address: string, token1Address: string) => {
    try {
      const token0 = await getTokenNameFromAddress(token0Address)
      const token1 = await getTokenNameFromAddress(token1Address)

      setToken0(token0)
      setToken1(token1)
      console.log(state)

      if (state) {
        setCurrentLiquidityData({
          pairBalance: state.pairBalance,
          poolShare: state.poolShare,
          token0: state.token0,
          token0Balance: state.token0Balance,
          token1: state.token1,
          token1Balance: state.token1Balance,
        })
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    _getTokenPerToken()
  }, [token0, token1])

  useEffect(() => {
    if (account) {
      _checkApproval()
      _getBalance()
    }
  }, [account, token0, token1, notifyMessage])

  useEffect(() => {
    if (Object.keys(params).length > 1) {
      if (params.token0 && params.token1) {
        _fetchTokenSymbolFromParams(String(params.token0), String(params.token1))
      }
    }
  }, [params, state])

  return (
    <Center>
      <Spacer marginTop="3rem" />
      <Card>
        <Expander
          header={() => (
            <CustomText variants="h5" weight="700">
              Add Liquidity
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
          <RotateContainer>
            <IoMdAdd className="icon" />
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
        <Spacer margin="1rem" />

        <Flex justifyContent="space-between">
          <CustomText size="0.9rem" weight="700">
            You receive
          </CustomText>
          <CustomText size="0.9rem" weight="700">
            {Number(minReceived).toFixed(4)} {token0}-{token1} LP
          </CustomText>
        </Flex>

        <Expander open={true} header={`Prices and pool share`}>
          <Flex justifyContent="space-between">
            <CustomText size="0.9rem" weight="700">
              {token0} per {token1}
            </CustomText>
            <CustomText size="0.9rem" weight="700">
              {Number(token0PerToken1).toFixed(4)}
            </CustomText>
          </Flex>
          <Spacer marginTop="0.5rem" />
          <Flex justifyContent="space-between">
            <CustomText size="0.9rem" weight="700">
              {token1} per {token0}
            </CustomText>
            <CustomText size="0.9rem" weight="700">
              {Number(token1PerToken0).toFixed(4)}
            </CustomText>
          </Flex>
          <Spacer marginTop="0.5rem" />
          <Flex justifyContent="space-between">
            <CustomText size="0.9rem" weight="700">
              Pool Share
            </CustomText>
            <CustomText size="0.9rem" weight="700">
              {Number(poolShare).toFixed(4)}%
            </CustomText>
          </Flex>
          <Spacer marginTop="1rem" />
        </Expander>

        <Center>
          {!(token0Approved && token1Approved) && account ? (
            <Flex>
              <Button disabled={!account || approvingToken0 || token0Approved} onClick={_handleToken0Approval}>
                Approve {token0}
              </Button>
              <Spacer marginRight="1rem" />
              <Button disabled={!account || approvingToken1 || token1Approved} onClick={_handleToken1Approval}>
                Approve {token1}
              </Button>
            </Flex>
          ) : (
            <Button disabled={_handleSupplyButtonDisabled()} onClick={_handleSupplyLiquidity}>
              Supply Liquidity
            </Button>
          )}
        </Center>
      </Card>

      {currentLiquidityData && (
        <>
          <Spacer marginTop="2rem" />
          <CurrentPositionCard {...currentLiquidityData} />
          <Spacer marginTop="2rem" />
        </>
      )}

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

export default AddLiquidityPage
