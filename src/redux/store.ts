// store.ts
import {configureStore} from '@reduxjs/toolkit';
import expensesReducer from './slices/expenses-slice';
import userReducer from './slices/user-slice';
import Reactotron from '../../ReactotronConfig';

const store = configureStore({
  reducer: {
    user: userReducer,
    expenses: expensesReducer,
  },
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat(Reactotron.createEnhancer!()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
