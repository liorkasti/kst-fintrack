import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TextInputProps} from 'react-native';

export interface UserStateType {
  username: string;
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
  filters: FiltersType;
}
export interface ExpenseSectionType {
  title: string;
  data: ExpenseType[];
}

export interface FiltersType {
  title: string | '';
  date: string | '';
}

export interface RootStateType {
  expenses: ExpensesStateType;
  user: UserStateType;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface InputType {
  label: string;
  textInputConfig?: TextInputProps;
  style?: {};
  testID?: string;
  invalid: boolean;
}

export type ModalTitle = 'Create' | 'Edit' | 'Filters';

export interface ModalContextType {
  isModalOpen: boolean;
  modalTitle: ModalTitle;
  openModal: (title: ModalTitle) => void;
  closeModal: () => void;
}
export interface ScreenProps<T extends keyof RootStackParamListType> {
  navigation: RootStackNavigationProp<T>;
  route: RootStackRouteProp<T>;
}

export type RootStackParamListType = {
  WelcomeScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
  AppNavigation: undefined;
};

export type RootStackNavigationProp<T extends keyof RootStackParamListType> =
  NativeStackNavigationProp<RootStackParamListType, T>;

export type RootStackRouteProp<T extends keyof RootStackParamListType> =
  RouteProp<RootStackParamListType, T>;
