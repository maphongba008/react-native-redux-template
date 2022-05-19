import React from 'react';
import { Platform, StatusBar, ViewStyle } from 'react-native';
import { Theme, useTheme } from 'theme';

import { Box, BoxProps } from './Box';
import { StyleSheet } from './StyleSheet';

type Props = {
  noStatusBar?: boolean;
  hasFooter?: boolean;
  statusBarStyle?: ViewStyle;
} & BoxProps;

const isAndroid = Platform.OS === 'android';

export const Container = ({ noStatusBar, statusBarStyle, hasFooter, ...props }: Props) => {
  const styles = makeStyle(useTheme());
  const darkContentStatusBar = ['#FFF', '#FFFFFF', 'transparent'];
  const darkContent = isAndroid
    ? false
    : noStatusBar || darkContentStatusBar.includes(statusBarStyle?.backgroundColor?.toString() || '');
  return (
    <Box full {...props} style={[styles.container, props.style]}>
      <StatusBar barStyle={darkContent ? 'dark-content' : 'light-content'} />
      {!noStatusBar && <Box style={[styles.statusBar, statusBarStyle]} />}
      {props.children}
      {hasFooter && <Box style={styles.footer} />}
    </Box>
  );
};

const makeStyle = ({ colors, dimensions }: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundColor,
    },
    statusBar: {
      height: dimensions.statusBarHeight,
      backgroundColor: colors.statusBar,
    },
    footer: {
      height: dimensions.paddingBottom,
    },
  });
