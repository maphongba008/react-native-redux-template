import React from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from 'app/reducer';
import { Container, Header, Text, TouchableOpacity } from 'components';

const LoginScreen = () => {
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
export default LoginScreen;
