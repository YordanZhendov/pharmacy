import { createSlice } from '@reduxjs/toolkit';


export const pharmacySlice = createSlice({

    name: "pharmacy",
    initialState: {pharmacyData: null},
    reducers: {
        getAllPharmacies: (state,action) =>{
            state.pharmacyData = action.payload;
        }
    }

});

export const {getAllPharmacies} = pharmacySlice.actions;
export default pharmacySlice.reducer;