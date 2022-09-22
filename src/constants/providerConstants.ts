interface PROVIDER_INTERFACE {
  [networkId: number]: {
    networkId: number
    rpc: string
    name: string
    currencySymbol: string
    explorerURL: string
  }
}

export const PROIVDER: PROVIDER_INTERFACE = {
  97: {
    name: 'BNB Smart Chain Testnet',
    currencySymbol: 'tBNB',
    networkId: 97,
    rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    explorerURL: 'https://testnet.bscscan.com/',
  },
}
