import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        login: (state, action) => {
          
            state.isLoggedIn = !!action.payload.token
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('email', action.payload.email)
        },
        logout: (state) => {
            state.isAuthanticated = false
        },

    },
});

export const { login, logout } = authenticationSlice.actions;



export default authenticationSlice.reducer;
