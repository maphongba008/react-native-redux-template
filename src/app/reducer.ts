import { createSlice } from '@reduxjs/toolkit';
import { Action, AppState } from 'types';

const initialState: AppState = {
  counter: 0,
  isLoggedIn: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    increase: (state) => {
      state.counter++;
    },
    setLogin: (state, action: Action<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const { increase, setLogin } = appSlice.actions;
