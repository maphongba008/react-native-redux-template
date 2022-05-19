import React from 'react';
import { StyleSheet, TouchableOpacity as TO, TouchableOpacityProps as TP } from 'react-native';
import { Theme, ThemeContext } from 'theme';

import { BoxProps } from './Box';
export type TouchableOpacityProps = TP & {
  children?: any;
} & BoxProps;

export const TouchableOpacity = React.forwardRef((props: TouchableOpacityProps, ref: any) => {
  const styles = makeStyles(React.useContext(ThemeContext));

  const customStyles = Object.keys(props)
    // @ts-ignore
    .filter((key) => props[key])
    // @ts-ignore
    .map((key) => styles[key])
    .filter((t) => t);
  return (
    <TO ref={ref} activeOpacity={0.7} {...props} style={[customStyles, props.style]}>
      {props.children}
    </TO>
  );
});

const makeStyles = ({ dimensions }: Theme) =>
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
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    centerVertical: {
      alignItems: 'center',
    },
    paddingH: {
      paddingHorizontal: dimensions.normal,
    },
    paddingV: {
      paddingVertical: dimensions.normal,
    },
    padding: {
      padding: dimensions.normal,
    },
    absoluteFillParent: {
      ...StyleSheet.absoluteFillObject,
    },
    marginH: {
      marginHorizontal: dimensions.large,
    },
    marginTop: {
      marginTop: dimensions.large,
    },
  });
