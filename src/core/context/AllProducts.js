import { createSlice } from '@reduxjs/toolkit';


export const allProductsSlice = createSlice({

    name: "allproducts",
    initialState: {allProductsData: null},
    reducers: {
        getAllProducts: (state,action) =>{
            state.allProductsData = action.payload;
        }
    }

});

export const {getAllProducts} = allProductsSlice.actions;
export default allProductsSlice.reducer;