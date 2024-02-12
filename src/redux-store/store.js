import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authenticationSlice';
import authenticationReducer from './authenticationSlice';
import expenseReducer from './expenseSlice';
import themeReducer from "./themeSlice"

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth:authReducer,
    authentication:authenticationReducer,
    expenseList:expenseReducer,
    theme:themeReducer
  },
});