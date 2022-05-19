import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Container, Header } from 'components';
import { Theme, useTheme } from 'theme';

type Tab2ScreenProps = {};
const Tab2Screen = ({ ...props }: Tab2ScreenProps) => {
  const styles = makeStyles(useTheme());
  return (
    <Container>
      <Header title="Tab 2" />
    </Container>
  );
};
const makeStyles = ({ colors, dimensions }: Theme) =>
  StyleSheet.create({
    container: {},
  });
export default Tab2Screen;
