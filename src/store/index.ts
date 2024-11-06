import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import expensesReducer from './slices/expenses-slice';
import userReducer from './slices/user-slice';
import Reactotron from '../../ReactotronConfig';
import {QueryClient} from 'react-query';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['expenses', 'user'],
};

const persistedExpensesReducer = persistReducer(persistConfig, expensesReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const queryClient = new QueryClient();

export const store = configureStore({
  reducer: {
    expenses: persistedExpensesReducer,
    user: persistedUserReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat(Reactotron.createEnhancer!()),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
