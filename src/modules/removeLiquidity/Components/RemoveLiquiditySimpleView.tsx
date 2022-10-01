import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AMMLP } from '../../../constants'
import { getBalance, getLpPairDetails, getTotalSupply } from '../../../logic/shared'
import { toEther } from '../../../logic/utility'
import { RootState } from '../../../redux/store'
import Button from '../../../shared/button'
import { Card, Center, CustomText, Flex, RotateContainer, Slider, Spacer } from '../../../shared/shared'
import Token from '../../../shared/token'
import { AiOutlineArrowDown } from 'react-icons/ai'

interface I_RemoveLiquiditySimpleView {
  lpAddress: string
}

const RemoveLiquiditySimpleView = (props: I_RemoveLiquiditySimpleView) => {
  const { lpAddress } = props
  const range = [25, 50, 75, 100]
  const { account } = useSelector((state: RootState) => state.wallet)
  const [rangeValue, setRangeValue] = useState<number>(0)
  const [balance, setBalance] = useState<number>(0)

  const [token0Balance, setToken0Balance] = useState<number>(0)
  const [token1Balance, setToken1Balance] = useState<number>(0)

  const [token0, setToken0] = useState<string | null>(null)
  const [token1, setToken1] = useState<string | null>(null)

  const [changedToken0Balance, setChangedToken0Balance] = useState<number>(0)
  const [changedToken1Balance, setChangedToken1Balance] = useState<number>(0)
  const [changedBalance, setChangedBalance] = useState<number>(0)

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

  const _handleOnRangeChange = (percent: number) => {
    try {
      const changedBalance = (balance / 100) * percent
      const changed0Balance = (token0Balance / 100) * percent
      const changed1Balance = (token1Balance / 100) * percent

      setChangedBalance(changedBalance)
      setChangedToken0Balance(changed0Balance)
      setChangedToken1Balance(changed1Balance)
    } catch (error) {
      setChangedBalance(0)
      setChangedToken0Balance(0)
      setChangedToken1Balance(0)
    }
  }

  if (props) {
    return (
      <Card>
        <Spacer marginTop="1rem" marginBottom="2rem">
          <CustomText variants="h5" weight="700">
            Simple View
          </CustomText>
        </Spacer>
        <Spacer margin="1rem">
          <CustomText variants="h2" weight="700">
            {rangeValue}%
          </CustomText>
        </Spacer>
        <Slider
          value={rangeValue}
          onChange={(e) => {
            setRangeValue(Number(e.target.value))
            _handleOnRangeChange(Number(e.target.value))
          }}
        />
        <Spacer marginTop="1rem" />
        <Flex justifyContent="space-around">
          {range.map((value, index) => (
            <Button
              onClick={() => {
                setRangeValue(value)
                _handleOnRangeChange(Number(value))
              }}
              key={index}
            >
              {value}
            </Button>
          ))}
        </Flex>

        <Center>
          <RotateContainer>
            <AiOutlineArrowDown className="icon" />
          </RotateContainer>
        </Center>

        <Spacer marginTop="0rem" marginBottom="1.5rem">
          <CustomText variants="h6" weight="700">
            <Flex justifyContent="space-between">
              <div> {token0 && <Token token={token0} label size="2rem" />} </div>
              <div>{Number(changedToken0Balance).toFixed(4)}</div>
            </Flex>
            <Spacer margin="0.5rem 0rem">
              <Flex justifyContent="space-between">
                <div>{token1 && <Token token={token1} label size="2rem" />}</div>
                <div>{Number(changedToken1Balance).toFixed(4)}</div>
              </Flex>
            </Spacer>
            <Flex justifyContent="space-between">
              <div>Balance:</div>
              <div>{Number(changedBalance).toFixed(4)}</div>
            </Flex>
          </CustomText>
        </Spacer>
        <Flex justifyContent="space-around">
          <Button>Approve</Button>
          <Button>Remove </Button>
        </Flex>
        <Spacer marginBottom="1rem" />
      </Card>
    )
  } else {
    return <></>
  }
}

export default RemoveLiquiditySimpleView
