import { createSlice } from "@reduxjs/toolkit"


export const ecartSlicer = createSlice(
    {
        name: 'ecart',
    initialState: {ecartProducts: []},
    reducers:{
       addProductToEcart: (state,action) => {
            state.ecartProducts.filter(({productId} , i) => productId === action.payload.productId ? state.ecartProducts.splice(i, i+1): null)
            state.ecartProducts.push(action.payload)
       },
       removeProductFromEcart: (state,action) => {
            state.ecartProducts = state.ecartProducts.filter(({productId}) => productId != action.payload)
       }

    }

});

export const {addProductToEcart, removeProductFromEcart} = ecartSlicer.actions;
export default ecartSlicer.reducer;