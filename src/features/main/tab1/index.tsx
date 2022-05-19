import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Container, Header, LoadingHud, Text, TouchableOpacity } from 'components';
import { Theme, useTheme } from 'theme';
import Toast from 'utils/Toast';

type Tab1ScreenProps = {};
const Tab1Screen = ({ ...props }: Tab1ScreenProps) => {
  const styles = makeStyles(useTheme());
  return (
    <Container>
      <Header title="Tab 1" />
      <TouchableOpacity
        onPress={() => {
          LoadingHud.show();
          setTimeout(() => {
            LoadingHud.hide();
          }, 3000);
        }}>
        <Text>Show hud</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Toast.show({
            title: 'done',
            message: 'cancel',
          });
        }}>
        <Text>Show Toast</Text>
      </TouchableOpacity>
    </Container>
  );
};
const makeStyles = ({ colors, dimensions }: Theme) =>
  StyleSheet.create({
    container: {},
  });
export default Tab1Screen;
