import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { useTheme } from 'selectors';
import { Theme } from 'types';

import { IconNames } from './IconNames';
import config from './selection.json';
import { SharedTextProps, useTextStyles } from './Shared';

const IcoIcon = createIconSetFromIcoMoon(config);

type Props = {
  name: IconNames | string;
  style?: StyleProp<TextStyle>;
} & SharedTextProps;
export const Icon = (props: Props) => {
  const styles = makeStyles(useTheme());
  const mStyles = useTextStyles(props);
  return <IcoIcon testID="" accessibilityLabel="" {...props} style={[styles.icon, mStyles, props.style]} />;
};

const makeStyles = (colors: Theme) =>
  StyleSheet.create({
    icon: {
      color: colors.textPrimary,
    },
  });
