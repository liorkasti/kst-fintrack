import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {StoreUserPayload, StoreUserType} from '../../constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: StoreUserType = {
  id: '',
  userName: '',
  isLoading: false,
  error: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const storedUser = await AsyncStorage.getItem('user');
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
});

export const saveUser = createAsyncThunk(
  'user/saveUser',
  async (user: {id: string; userName: string}) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return user;
  },
);

export const signOutUser = createAsyncThunk('user/signOut', async () => {
  await AsyncStorage.removeItem('user');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<StoreUserPayload>) => {
      state.userName = action.payload.userName;
      state.id = action.payload.id;
    },
    removeUser: state => {
      state.userName = '';
      state.id = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.id = action.payload.id;
          state.userName = action.payload.userName;
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(saveUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.userName = action.payload.userName;
      })
      .addCase(signOutUser.fulfilled, state => {
        state.id = '';
        state.userName = '';
      });
  },
});

export const {storeUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
