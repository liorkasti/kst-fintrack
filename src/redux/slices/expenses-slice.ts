import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {dummyExpenses} from '../../utils/dummyData.ts';
import {ExpensesStateType, ExpenseType} from '../../constants/types.ts';
import {Alert} from 'react-native/Libraries/Alert/Alert';

const initialState: ExpensesStateType = {
  expenses: dummyExpenses,
  filteredData: [],
  filters: {
    title: '',
    date: '',
  },
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
});

export const {
  addExpense,
  deleteExpense,
  setFilterTitle,
  setFilterDate,
  clearFilters,
  filterExpenses,
  clearFilterData,
} = expensesSlice.actions;

export const updateLocalStorage = async (expenses: ExpenseType[]) => {
  try {
    await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    // console.log(await AsyncStorage.getItem('expenses'));
  } catch (error) {
    console.log('Error updating local storage:', error);
  }
};

export default expensesSlice.reducer;
