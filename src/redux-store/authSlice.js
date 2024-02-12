import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthanticated: false,
    },
    reducers: {
        login: (state) => {
            state.isAuthanticated = true
        },
        logout: (state) => {
            state.isAuthanticated = false
        },
       
    },
});

export const { login, logout } = authSlice.actions;



export default authSlice.reducer;
