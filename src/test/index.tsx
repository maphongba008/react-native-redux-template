import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { increase } from 'reduxStore';
import { useCounter } from 'selectors';

export default () => {
  const dispatch = useDispatch();
  const counter = useCounter();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(increase());
      }}>
      <Text>Test ne</Text>
      <Text>{`Counter: ${counter}`}</Text>
    </TouchableOpacity>
  );
};
