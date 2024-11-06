import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ExpensesStateType, ExpenseType} from '../../constants/types';
import {dummyExpenses} from '../../utils/dummyData';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: ExpensesStateType = {
  expenses: dummyExpenses,
  filteredData: [],
  filters: {
    title: '',
    date: '',
  },
};

const fetchExpenses = createAsyncThunk('expenses/fetch', async () => {
  try {
    await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    console.log(await AsyncStorage.getItem('expenses'));
  } catch (error) {
    console.log('Error updating local storage:', error);
  }
});

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
    updateExpense: (state, action: PayloadAction<ExpenseType>) => {
      const index = state.expenses.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(e => e.id !== action.payload);
    },
    setFilterTitle: (state, action: PayloadAction<string | ''>) => {
      state.filters.title = action.payload;
    },
    setFilterDate: (state, action: PayloadAction<string | ''>) => {
      state.filters.date = action.payload;
    },
    clearFilters: state => {
      state.filters.title = '';
      state.filters.date = '';
    },
    clearFilterData: state => {
      state.filteredData = [];
    },
    filterExpenses: state => {
      try {
        const {title, date} = state.filters;
        const {expenses} = state;
        console.log({title, date});

        let filteredData = [...expenses]; // TODO: use immer js

        if (title && date) {
          filteredData = filteredData.filter(
            expense =>
              expense?.date === date &&
              expense.title.toLowerCase().includes(title.toLowerCase()),
          );
        } else if (title) {
          filteredData = filteredData.filter(expense =>
            expense.title.toLowerCase().includes(title.toLowerCase()),
          );
        } else if (date) {
          filteredData = filteredData.filter(expense => expense?.date === date);
        }

        state.filteredData = filteredData;

        if (filteredData.length < 1) {
          Alert.alert('Sorry!', 'No results found.');
        }
      } catch (error) {
        console.log('Filter Expenses Error', error);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.expenses = action.payload;
    });
  },
});

export const {
  addExpense,
  updateExpense,
  deleteExpense,
  setFilterTitle,
  setFilterDate,
  clearFilters,
  filterExpenses,
  clearFilterData,
} = expensesSlice.actions;
export default expensesSlice.reducer;
