import { strings } from 'localization';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { Theme, ThemeContext } from 'theme';

import { StyleSheet } from './StyleSheet';
type TextProps = {
  id?: string;
  value?: any;
  text?: string;
  f8?: boolean;
  f10?: boolean;
  f12?: boolean;
  f1216?: boolean;
  f13?: boolean;
  f14?: boolean;
  f1416?: boolean;
  f15?: boolean;
  f1520?: boolean;
  f16?: boolean;
  f1623?: boolean;
  f17?: boolean;
  f18?: boolean;
  f20?: boolean;
  f22?: boolean;
  f24?: boolean;
  f28?: boolean;
  bold?: boolean;
  medium?: boolean;
  regular?: boolean;
  white?: boolean;
  navigation?: boolean;
  full?: boolean;
  primary?: boolean;
  secondary?: boolean;
  red?: boolean;
  sub?: boolean;
  marginH?: boolean;
  center?: boolean;
  orange?: boolean;
  [key: string]: any;
} & RNTextProps;

export const Text = (props: TextProps) => {
  const styles = makeStyles(React.useContext(ThemeContext));
  const text = props.children || props.text || strings.formatString(props.id || '', props.value);
  const textStyles = Object.keys(props)
    .filter((key) => props[key])
    // @ts-ignore
    .map((key) => styles[key])
    .filter((t) => t);
  return (
    <RNText {...props} style={[styles.text, textStyles, props.style]}>
      {text}
    </RNText>
  );
};

const makeStyles = ({ fonts, colors, dimensions }: Theme) =>
  StyleSheet.create({
    text: {
      color: colors.primaryText,
      fontSize: 16,
      fontFamily: fonts.regular,
    },
    marginH: {
      marginHorizontal: dimensions.large,
    },
    primary: {
      color: colors.primaryText,
    },
    sub: {
      color: colors.secondaryText,
    },
    orange: {
      color: colors.orange,
    },
    secondary: {
      color: colors.secondaryText,
    },
    navigation: {
      color: colors.navigationText,
    },
    f8: {
      fontSize: 8,
    },
    f10: {
      fontSize: 10,
    },
    f12: {
      fontSize: 12,
    },
    f1216: {
      fontSize: 12,
      lineHeight: 16,
    },
    f13: {
      fontSize: 13,
    },
    f14: {
      fontSize: 14,
    },
    f1416: {
      fontSize: 14,
      lineHeight: 16,
    },
    f15: {
      fontSize: 15,
    },
    f1520: {
      fontSize: 15,
      lineHeight: 20,
    },
    f16: {
      fontSize: 16,
    },
    f1623: {
      fontSize: 16,
      lineHeight: 23,
    },
    f17: {
      fontSize: 17,
    },
    f18: {
      fontSize: 18,
    },
    f20: {
      fontSize: 20,
    },
    f2030: {
      fontSize: 20,
      lineHeight: 30,
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
    bold: {
      fontFamily: fonts.bold,
    },
    medium: {
      fontFamily: fonts.medium,
    },
    regular: {
      fontFamily: fonts.regular,
    },
    white: {
      color: '#FFF',
    },
    red: {
      color: colors.red,
    },
    full: {
      flex: 1,
    },
    center: {
      textAlign: 'center',
    },
  });
