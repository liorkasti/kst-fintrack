import {configureStore} from '@reduxjs/toolkit';
import expensesReducer from './slices/expenses-slice';
import userReducer from './slices/user-slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    expenses: expensesReducer,
  },
});

export default store;
