import React from 'react';
import { ViewStyle } from 'react-native';
import { Theme, useTheme } from 'theme';

import { Box } from './Box';
import { StyleSheet } from './StyleSheet';

type ProgressBarProps = {
  progress: number;
  style?: ViewStyle;
};
export const ProgressBar = ({ progress, style, ...props }: ProgressBarProps) => {
  const styles = makeStyles(useTheme());
  return (
    <Box horizontal style={[styles.container, style]}>
      <Box style={[styles.active, { flex: progress }]} />
      <Box style={[styles.inactive, { flex: 100 - progress }]} />
    </Box>
  );
};
const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      height: 8,
      backgroundColor: colors.progressBarInactive,
      borderRadius: 4,
    },
    active: {
      backgroundColor: colors.progressBarActive,
      borderRadius: 4,
    },
    inactive: {
      backgroundColor: colors.progressBarInactive,
      borderRadius: 4,
    },
  });
