import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authenticationSlice';
import expenseReducer from './expenseSlice';
import themeReducer from "./themeSlice"

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
    expenseList: expenseReducer,
    theme: themeReducer
  },
});