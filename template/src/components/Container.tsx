import React from 'react';
import { ViewStyle } from 'react-native';
import { dimensions } from 'constants/dimensions';
import { useTheme } from 'selectors';
import { Theme } from 'types';

import { Box, BoxProps } from './Box';
import { StyleSheet } from './StyleSheet';

type Props = {
  noStatusBar?: boolean;
  hasFooter?: boolean;
  statusBarStyle?: ViewStyle;
} & BoxProps;

export const Container = ({ noStatusBar, statusBarStyle, hasFooter, ...props }: Props) => {
  const styles = makeStyle(useTheme());
  return (
    <Box full {...props} style={[styles.container, props.style]}>
      {!noStatusBar && <Box style={[styles.statusBar, statusBarStyle]} />}
      {props.children}
      {hasFooter && <Box style={styles.footer} />}
    </Box>
  );
};

const makeStyle = (colors: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundColor,
    },
    statusBar: {
      height: dimensions.statusBarHeight,
      backgroundColor: colors.backgroundColor,
    },
    footer: {
      height: dimensions.paddingBottom,
    },
  });
