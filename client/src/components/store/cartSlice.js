// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

let initialState = [];
if (typeof window !== "undefined") {
    if (localStorage.getItem('cart')) {
        initialState = JSON.parse(localStorage.getItem('cart'));
    } else {
        initialState = [];
    }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
