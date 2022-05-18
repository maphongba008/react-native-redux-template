import React from 'react';
import { Text, View } from 'react-native';
import Test from 'test';
export default () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' }}>
      <Text>App</Text>
      <Test />
    </View>
  );
};
