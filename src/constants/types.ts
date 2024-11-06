import {TextInputProps} from 'react-native';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export interface UserType {
  fullName: string;
  id: string;
}

export interface ExpenseType {
  id: string;
  title: string;
  amount: number;
  date: string;
}

export interface ExpensesStateType {
  expenses: ExpenseType[];
  filteredData: ExpenseType[];
  filters: FilterParamsType;
}

export interface ExpenseSectionType {
  title: string;
  data: ExpenseType[];
}

export interface FilterParamsType {
  title?: string;
  amount?: number;
  date?: string;
}

export interface RootStateType {
  expenses: ExpensesStateType;
  user: UserType;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export type RootStackParamListType = {
  WelcomeScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
  AppNavigation: undefined;
};

export interface InputType {
  label: string;
  textInputConfig?: TextInputProps;
  style?: {};
  testID?: string;
  invalid: boolean;
}
