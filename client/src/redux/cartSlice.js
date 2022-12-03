
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        detail: []
    },
    reducers: {
        changeCart: (state, action) => {
            state.detail = action.payload;
        }
    }
});

export const {
    changeCart
} = cartSlice.actions;

export default cartSlice.reducer;