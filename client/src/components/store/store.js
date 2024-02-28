import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import SearchSlice from './SearchSlice'
import { cartReducer } from './cartSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        search: SearchSlice,
        cart: cartReducer,
    },
})