import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from '../../constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {queryClient} from '..';

const initialState: UserType = {
  fullName: '',
  id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.fullName = action.payload.fullName;
      state.id = action.payload.id;
    },
    clearUser: state => {
      state.fullName = '';
      state.id = '';
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;

export const signOut = () => async dispatch => {
  // Clear Redux state
  dispatch(clearUser());

  // Clear React Query cache
  queryClient.clear();

  // Clear persisted React Query cache
  await AsyncStorage.removeItem('QUERY_CACHE');
};

export default userSlice.reducer;
