import React from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { ActionSheet, Box, LoadingHudProvider } from 'components';
import Navigation from 'navigation';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'reduxStore';
import { ThemeProvider } from 'theme';

export default () => {
  console.log('123');

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Box full>
            <Navigation />
            <LoadingHudProvider />
            <Toast />
            <ActionSheet.Provider />
          </Box>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
