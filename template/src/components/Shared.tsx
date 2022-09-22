import { dimensions } from 'constants/dimensions';
import { fonts } from 'constants/fonts';
import _ from 'lodash';
import { useTheme } from 'selectors';
import { Theme } from 'types';

import { StyleSheet } from './StyleSheet';
export type SharedBoxProps = {
  horizontal?: boolean;
  vertical?: boolean;
  full?: boolean;
  center?: boolean;
  centerVertical?: boolean;
  absoluteFillParent?: boolean;
  red?: boolean;
  disabled?: boolean;
  border?: boolean;
  borderBottom?: boolean;
  borderTop?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
};

export type SharedTextProps = {
  f16?: boolean;
  f18?: boolean;
  bold?: boolean;
  regular?: boolean;
  red?: boolean;
  brandPrimary?: boolean;
  primary?: boolean;
  center?: boolean;
  capitalize?: boolean;
} & SharedBoxProps;

const getStylesFromProps = (props: Partial<SharedBoxProps & SharedTextProps>, styles: any) => {
  return (
    Object.keys(props)
      // @ts-ignore
      .filter((key) => !!props[key])
      // @ts-ignore
      .filter((key) => !!styles[key])
      // @ts-ignore
      .map((key) => styles[key])
  );
};

export const useBoxStyles = (props: Partial<SharedBoxProps>) => {
  return getStylesFromProps(props, makeBoxStyles(useTheme()));
};

export const useTextStyles = (props: Partial<SharedTextProps>) => {
  const mTextStyles = makeTextStyles(useTheme());
  // if there are same props from box and text, get the text one
  const boxStyles = useBoxStyles(_.omit(props, Object.keys(mTextStyles)));
  const textStyles = getStylesFromProps(props, mTextStyles);
  return [...boxStyles, ...textStyles];
};

const makeBoxStyles = (colors: Theme) =>
  StyleSheet.create({
    horizontal: {
      flexDirection: 'row',
    },
    vertical: {
      flexDirection: 'column',
    },
    full: {
      flex: 1,
    },
    centerVertical: {
      alignItems: 'center',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    absoluteFillParent: {
      ...StyleSheet.absoluteFillObject,
    },
    red: {
      backgroundColor: colors.red,
    },
    disabled: {
      opacity: 0.5,
    },
    border: {
      borderWidth: dimensions.separator,
      borderColor: colors.border,
    },
    borderBottom: {
      borderBottomWidth: dimensions.separator,
      borderBottomColor: colors.border,
    },
    borderTop: {
      borderTopWidth: dimensions.separator,
      borderTopColor: colors.border,
    },
    borderLeft: {
      borderLeftWidth: dimensions.separator,
      borderLeftColor: colors.border,
    },
    borderRight: {
      borderRightWidth: dimensions.separator,
      borderRightColor: colors.border,
    },
  });

const makeTextStyles = (colors: Theme) =>
  StyleSheet.create({
    f16: {
      fontSize: 16,
    },
    f18: {
      fontSize: 18,
    },
    bold: {
      fontFamily: fonts.bold,
      fontWeight: '600',
    },
    red: {
      color: colors.red,
    },
    brandPrimary: {
      color: colors.brandPrimary,
    },
    primary: {
      color: colors.textPrimary,
    },
    regular: {
      fontFamily: fonts.regular,
    },
    center: {
      textAlign: 'center',
    },
    capitalize: {
      textTransform: 'capitalize',
    },
  });
