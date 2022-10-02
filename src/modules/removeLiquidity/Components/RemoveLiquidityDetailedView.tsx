import { RSV } from 'eth-permit/dist/rpc'
import { useEffect, useState } from 'react'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { AMMLP, ROUTER } from '../../../constants'
import { BSC_TESTNET_ADDRESS } from '../../../constants/bsc-testnet/contract'
import { removeLiquidity } from '../../../logic/liquidity/transaction'
import { getBalance, getLpPairDetails, getTotalSupply } from '../../../logic/shared'
import { ERC2612PermitMessage, getPermit } from '../../../logic/shared/transactions'
import { toEther, toWei } from '../../../logic/utility'
import { RootState } from '../../../redux/store'
import AmmInput from '../../../shared/ammInput'
import Button from '../../../shared/button'
import { Card, Center, CustomText, Flex, RotateContainer, Spacer } from '../../../shared/shared'

interface I_RemoveLiquiditySimpleView {
  lpAddress: string
}

const RemoveLiquidityDetailedView = (props: I_RemoveLiquiditySimpleView) => {
  const { lpAddress } = props

  const { account } = useSelector((state: RootState) => state.wallet)

  const [balance, setBalance] = useState<number>(0)

  const [token0Balance, setToken0Balance] = useState<number>(0)
  const [token1Balance, setToken1Balance] = useState<number>(0)

  const [token0, setToken0] = useState<string | null>(null)
  const [token1, setToken1] = useState<string | null>(null)

  const [lpInput, setLpInput] = useState<string | number>('')
  const [token0Input, setToken0Input] = useState<string | number>('')
  const [token1Input, setToken1Input] = useState<string | number>('')
  const [percentage, setPercentage] = useState<number>(0)
  const [permit, setPermit] = useState<(ERC2612PermitMessage & RSV) | null>(null)

  useEffect(() => {
    if (account && lpAddress) {
      _getData(account, lpAddress)
    }
  }, [account, lpAddress])

  const _getData = async (account: string, lpAddress: string) => {
    try {
      if (account) {
        const totalSupply = await getTotalSupply(AMMLP, lpAddress)
        const lpBalance = await getBalance(lpAddress, account)

        const { token0Address, token1Address, token0Symbol, token1Symbol } = await getLpPairDetails(lpAddress)

        setToken0(token0Symbol)
        setToken1(token1Symbol)

        const token0Balance = await getBalance(token0Address, lpAddress)
        const token1Balance = await getBalance(token1Address, lpAddress)

        const poolToken0Balance = (Number(lpBalance) * Number(token0Balance)) / Number(toEther(totalSupply))
        const poolToken1Balance = (Number(lpBalance) * Number(token1Balance)) / Number(toEther(totalSupply))

        setBalance(Number(lpBalance))
        setToken0Balance(Number(poolToken0Balance))
        setToken1Balance(Number(poolToken1Balance))
      }
    } catch (error) {
      setBalance(0)
      setToken0Balance(0)
      setToken1Balance(0)
    }
  }

  const _handleLpInput = async (value: string | number) => {
    if (balance >= value) {
      const percentage = (Number(value) / Number(balance)) * 100
      const token0Value = (token0Balance / 100) * percentage
      const token1Value = (token1Balance / 100) * percentage

      setPercentage(percentage)
      setLpInput(value)
      setToken0Input(token0Value)
      setToken1Input(token1Value)
    }
  }

  const _handleToken0Input = async (value: string | number) => {
    if (token0Balance >= value) {
      const percentage = (Number(value) / Number(token0Balance)) * 100
      const lpValue = (balance / 100) * percentage
      const token1Value = (token1Balance / 100) * percentage

      setPercentage(percentage)
      setToken0Input(value)
      setLpInput(lpValue)
      setToken1Input(token1Value)
    }
  }

  const _handleToken1Input = async (value: string | number) => {
    if (token1Balance >= value) {
      const percentage = (Number(value) / Number(token1Balance)) * 100
      const lpValue = (balance / 100) * percentage
      const token0Value = (token0Balance / 100) * percentage

      setPercentage(percentage)
      setLpInput(lpValue)
      setToken0Input(token0Value)
      setToken1Input(value)
    }
  }

  const _handleMaxLpClick = async () => {
    await _handleLpInput(balance)
  }

  const _handleToken0MaxClick = async () => {
    await _handleToken0Input(token0Balance)
  }

  const _handleToken1MaxClick = async () => {
    await _handleToken1Input(token1Balance)
  }

  const _handleApprove = async () => {
    try {
      if (account && lpAddress && lpInput) {
        const permit = await getPermit(lpAddress, account, BSC_TESTNET_ADDRESS[ROUTER], String(lpInput))
        setPermit(permit)
      }
    } catch (error) {
      setPermit(null)
      throw error
    }
  }

  const _handleRemoveLiquidity = async () => {
    try {
      if (permit && token0 && token1 && account) {
        const trx = await removeLiquidity({
          liquidityAmount: toWei(lpInput),
          token0Address: BSC_TESTNET_ADDRESS[token0],
          token1Address: BSC_TESTNET_ADDRESS[token1],
          userAddress: account,
          permit,
        })
        return trx
      }
    } catch (error) {
      throw error
    }
  }

  if (props) {
    return (
      <Card>
        <Spacer marginTop="1rem" marginBottom="2rem">
          <CustomText variants="h5" weight="700">
            Detailed View
          </CustomText>
        </Spacer>
        <Spacer margin="1rem">
          <CustomText variants="h2" weight="700">
            {percentage.toFixed(2)}%
          </CustomText>
        </Spacer>
        <AmmInput
          placeholder="0.00"
          balance={balance}
          value={lpInput}
          disableSelectTokenButton
          selctedToken={'BNB-BUSD'}
          onChange={_handleLpInput}
          onMaxClick={_handleMaxLpClick}
        />
        <Center>
          <RotateContainer>
            <AiOutlineArrowDown className="icon" />
          </RotateContainer>
        </Center>
        <AmmInput
          placeholder="0.00"
          balance={token0Balance}
          value={token0Input}
          disableSelectTokenButton
          selctedToken={token0 ? token0 : undefined}
          onTokenChange={(token) => {
            setToken0(token)
          }}
          onMaxClick={_handleToken0MaxClick}
          onChange={_handleToken0Input}
        />
        <Center>
          <RotateContainer>
            <AiOutlineArrowDown className="icon" />
          </RotateContainer>
        </Center>
        <AmmInput
          placeholder="0.00"
          balance={token1Balance}
          className="input1"
          value={token1Input}
          disableSelectTokenButton
          selctedToken={token1 ? token1 : undefined}
          onTokenChange={(token) => {
            setToken1(token)
          }}
          onMaxClick={_handleToken1MaxClick}
          onChange={_handleToken1Input}
        />
        <Spacer marginTop="1.5rem" marginBottom="1rem">
          <Flex justifyContent="space-around">
            <Button disabled={!!permit} onClick={_handleApprove}>
              Approve
            </Button>
            <Button disabled={!!!permit} onClick={_handleRemoveLiquidity}>
              Remove
            </Button>
          </Flex>
        </Spacer>
      </Card>
    )
  } else {
    return <></>
  }
}

export default RemoveLiquidityDetailedView
