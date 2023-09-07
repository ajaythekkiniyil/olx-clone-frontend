import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {}
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, payload) => {
            state.value = payload.payload
        },
    }
})

export const { setProduct } = productSlice.actions
export default productSlice.reducer