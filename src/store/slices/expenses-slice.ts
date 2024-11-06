import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ExpensesStateType, ExpenseType} from '../../constants/types';

const initialState: ExpensesStateType = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseType>) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action: PayloadAction<ExpenseType>) => {
      const index = state.expenses.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(e => e.id !== action.payload);
    },
  },
});

export const {addExpense, updateExpense, deleteExpense} = expensesSlice.actions;
export default expensesSlice.reducer;
