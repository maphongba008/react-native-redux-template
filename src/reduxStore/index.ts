import { createSlice, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';
const persistConfig = {
  storage: FilesystemStorage,
  toFileName: (name: string) => name.split(':').join('-'),
  fromFileName: (name: string) => name.split('-').join(':'),
};

const initialState = {
  counter: 0,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    increase: (state) => {
      state.counter++;
    },
  },
});

const store = configureStore({
  reducer: {
    app: persistReducer(
      {
        ...persistConfig,
        key: 'app',
      },
      appSlice.reducer,
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const persistor = persistStore(store);
export const { increase } = appSlice.actions;
