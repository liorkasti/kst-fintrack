import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {dummyExpenses} from '../../constants';
import {ExpensesStateType, ExpenseType} from '../types';

const initialState: ExpensesStateType = {
  expenses: dummyExpenses,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseType>) => {
      const newExpense = action.payload;
      state.expenses = [...state.expenses, newExpense];
      state.expenses.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      const expenseId = action.payload;
      state.expenses = state.expenses.filter(
        expense => expense.id !== expenseId,
      );
      state.filteredData = state.filteredData.filter(
        expense => expense.id !== expenseId,
      );
    },
  },
});

export const {addExpense, deleteExpense} = expensesSlice.actions;

export const updateLocalStorage = async (expenses: ExpenseType[]) => {
  try {
    await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    // console.log(await AsyncStorage.getItem('expenses'));
  } catch (error) {
    console.log('Error updating local storage:', error);
  }
};

export default expensesSlice.reducer;
