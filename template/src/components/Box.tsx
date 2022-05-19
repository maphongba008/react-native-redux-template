import React, { LegacyRef } from 'react';
import { View, ViewProps } from 'react-native';
import { Theme, ThemeContext } from 'theme';

import { StyleSheet } from './StyleSheet';

export interface BoxProps extends ViewProps {
  horizontal?: boolean;
  vertical?: boolean;
  full?: boolean;
  center?: boolean;
  centerVertical?: boolean;
  absoluteFillParent?: boolean;
  children?: any;
  paddingH?: boolean;
  paddingV?: boolean;
  padding?: boolean;
  marginH?: boolean;
  marginTop?: boolean;
  hide?: boolean;
}

export const Box = React.forwardRef((props: BoxProps, ref: LegacyRef<View>) => {
  const styles = makeStyles(React.useContext(ThemeContext));
  if (props.hide) {
    return null;
  }
  const customStyles = Object.keys(props)
    // @ts-ignore
    .filter((key) => !!props[key])
    // @ts-ignore
    .filter((key) => !!styles[key])
    // @ts-ignore
    .map((key) => styles[key]);
  return (
    <View ref={ref} {...props} style={[customStyles, props.style]}>
      {props.children}
    </View>
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
    centerVertical: {
      alignItems: 'center',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    paddingH: {
      paddingHorizontal: dimensions.large,
    },
    paddingV: {
      paddingVertical: dimensions.large,
    },
    padding: {
      padding: dimensions.large,
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
