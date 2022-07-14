import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({

    name: "user",
    initialState: {userData: {}},
    reducers: {
        login: (state, action) => {
            state.userData = action.payload
        },
        logout: (state) =>{
            state.userData = {}
        },
    }

});

export const {login,logout} = userSlice.actions;
export default userSlice.reducer;