import React from 'react';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { ActionSheet, Box, LoadingHudProvider } from 'components';
import Navigation from 'navigation';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'reduxStore';

export default () => {
  console.log('123');

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="dark-content" />
        <Box full>
          <Navigation />
          <LoadingHudProvider />
          <Toast />
          <ActionSheet.Provider />
        </Box>
      </PersistGate>
    </Provider>
  );
};
