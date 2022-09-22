import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { walletLogin } from '../../logic/wallet'

export interface WalletState {
  account: string | null
}

const initialState: WalletState = {
  account: null,
}

export const loginReducer = createAsyncThunk('wallet/login', async () => {
  const account = await walletLogin()
  return account
})

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginReducer.fulfilled, (state, action) => {
      localStorage.setItem('walletLogin', 'true')
      state.account = action.payload
    })
  },
  reducers: {
    changeAccount: (state, action) => {
      state.account = action.payload
    },
    logoutReducer: (state) => {
      localStorage.removeItem('walletLogin')
      state.account = null
    },
  },
})

export const { logoutReducer, changeAccount } = walletSlice.actions

export default walletSlice.reducer
