import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from 'app/reducer';
import { persistReducer, persistStore } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';
const persistConfig = {
  storage: FilesystemStorage,
  toFileName: (name: string) => name.split(':').join('-'),
  fromFileName: (name: string) => name.split('-').join(':'),
};

const store = configureStore({
  reducer: {
    app: persistReducer(
      {
        ...persistConfig,
        key: 'app',
        whitelist: [],
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
