import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        expenseListData: []
    },
    reducers: {
        addExpense: (state, action) => {
            state.expenseListData = [...action.payload]
        }
    }
})

export const { addExpense } = expenseSlice.actions

export default expenseSlice.reducer
