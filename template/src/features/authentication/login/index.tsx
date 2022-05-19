import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setLogin } from 'app/reducer';
import { Box, Container, Header, Text, TouchableOpacity } from 'components';
import { Theme, useTheme } from 'theme';

type LoginScreenProps = {};
const LoginScreen = ({ ...props }: LoginScreenProps) => {
  const styles = makeStyles(useTheme());
  console.log('render login screen');
  const dispatch = useDispatch();
  return (
    <Container>
      <Header title="Login" />
      <TouchableOpacity
        onPress={() => {
          dispatch(setLogin({ isLoggedIn: true }));
        }}>
        <Text text="Login" />
      </TouchableOpacity>
    </Container>
  );
};
const makeStyles = ({ _colors }: Theme) =>
  StyleSheet.create({
    container: {},
  });
export default LoginScreen;
