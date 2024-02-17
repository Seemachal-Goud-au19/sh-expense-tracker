import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        login: (state, action) => {

            state.isLoggedIn = !!action.payload.token
            localStorage.setItem('token', action?.payload?.token)
            localStorage.setItem('email', action?.payload?.email)
        },
        islogin: (state) => {
            console.log("token", localStorage.getItem('token'))
            state.isLoggedIn = !!localStorage.getItem('token') || false
            console.log(state.isLoggedIn)
        },

        logout: (state) => {
            state.isLoggedIn = false
            localStorage.removeItem('token')
            localStorage.removeItem('email')
        },

    },
});

export const { login, logout, islogin } = authenticationSlice.actions;



export default authenticationSlice.reducer;
