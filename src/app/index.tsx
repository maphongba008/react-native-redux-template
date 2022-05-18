import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Test from 'test';
import store, { persistor } from 'reduxStore';

import { PersistGate } from 'redux-persist/integration/react';
import { useCounter } from 'selectors';
export default () => {
  console.log('123');
 
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' }}>
          <Test />
        </View>
      </PersistGate>
    </Provider>
  );
};
