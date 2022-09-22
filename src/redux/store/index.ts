import { configureStore } from '@reduxjs/toolkit'
import WalletReducer from '../action/walletAction'
const store = configureStore({
  reducer: {
    wallet: WalletReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
