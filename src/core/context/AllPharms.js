import { createSlice } from '@reduxjs/toolkit';


export const allPharmsSlice = createSlice({

    name: "allpharms",
    initialState: {allPharmsData: null},
    reducers: {
        getAllPharms: (state,action) =>{
            state.allPharmsData = action.payload;
        }
    }

});

export const {getAllPharms} = allPharmsSlice.actions;
export default allPharmsSlice.reducer;