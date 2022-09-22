import BigNumber from 'bignumber.js'

export const toEther = (amount: string | number, decimals?: string | number) => {
  const number = new BigNumber(amount)
  if (decimals) {
    return number.dividedBy(10 ** Number(decimals)).toString()
  } else {
    return number.dividedBy(10 ** 18).toString()
  }
}
export const toWei = (amount: string | number, decimals?: string | number) => {
  const number = new BigNumber(amount)
  if (decimals) {
    return number.times(10 ** Number(decimals)).toString()
  } else {
    return number
      .times(10 ** 18)
      .toFixed(0)
      .toString()
  }
}

export const isEqualTo = (num1: string | number, num2: string | number) => {
  try {
    const num = new BigNumber(num1)
    return num.isEqualTo(num2)
  } catch (error) {
    throw error
  }
}
