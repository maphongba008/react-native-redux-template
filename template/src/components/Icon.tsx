import React from 'react';
import { StyleSheet } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { useStyles } from 'selectors/hooks';
import { Theme } from 'theme';

import { IconNames } from './IconNames';
import config from './selection.json';

const IcoIcon = createIconSetFromIcoMoon(config);

type Props = {
  name: IconNames | string;
  f10?: boolean;
  f12?: boolean;
  f14?: boolean;
  f16?: boolean;
  f18?: boolean;
  f20?: boolean;
  f22?: boolean;
  f24?: boolean;
  f28?: boolean;
  f30?: boolean;
  f32?: boolean;
  f36?: boolean;
  f40?: boolean;
  f42?: boolean;
  f50?: boolean;
  f60?: boolean;
  f72?: boolean;
  o3?: boolean;
  o8?: boolean;
  style?: any;
  white?: boolean;
  buttonText?: boolean;
  accent?: boolean;
  primary?: boolean;
  secondary?: boolean;
  brandPrimary?: boolean;
  iconSize?: number;
  red?: boolean;
};
export const Icon = (props: Props) => {
  const styles = useStyles(mStyles);
  const iconStyle = Object.keys(props)
    //@ts-ignored
    .filter((key) => props[key])
    //@ts-ignored
    .map((key) => styles[key])
    .filter((t) => t);
  return <IcoIcon testID="" accessibilityLabel="" {...props} style={[styles.icon, iconStyle, props.style]} />;
};

const mStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    icon: {
      color: colors.primaryIcon,
    },
    f10: {
      fontSize: 10,
    },
    f12: {
      fontSize: 12,
    },
    f14: {
      fontSize: 14,
    },
    f16: {
      fontSize: 16,
    },
    f18: {
      fontSize: 18,
    },
    f20: {
      fontSize: 20,
    },
    f22: {
      fontSize: 22,
    },
    f24: {
      fontSize: 24,
    },
    f28: {
      fontSize: 28,
    },
    f30: {
      fontSize: 30,
    },
    f32: {
      fontSize: 32,
    },
    f36: {
      fontSize: 36,
    },
    f40: {
      fontSize: 40,
    },
    f42: {
      fontSize: 42,
    },
    f50: {
      fontSize: 50,
    },
    f60: {
      fontSize: 60,
    },
    f72: {
      fontSize: 72,
    },
    o3: {
      opacity: 0.3,
    },
    o8: {
      opacity: 0.8,
    },
    primary: {
      color: colors.primaryIcon,
    },
    red: {
      color: colors.red,
    },
    secondary: {
      color: colors.secondaryIcon,
    },
    brandPrimary: {
      color: colors.brandPrimary,
    },
  });
