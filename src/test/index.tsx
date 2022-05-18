import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { strings } from 'localization';
import { increase } from 'reduxStore';
import { useCounter } from 'selectors';
import { useStyles } from 'selectors/hooks';
import { Theme } from 'theme';

export default () => {
  const dispatch = useDispatch();
  const counter = useCounter();
  const styles = useStyles(makeStyles);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        dispatch(increase());
      }}>
      <Text>{strings.common.cancel}</Text>
      <Text>{`Counter: ${counter}`}</Text>
    </TouchableOpacity>
  );
};

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundColor,
    },
  });
