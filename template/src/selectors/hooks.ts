import React from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import _ from 'lodash';
import { Theme, useTheme } from 'theme';
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const useStyles = <T extends NamedStyles<T> | NamedStyles<any>>(makeStyles: (_: Theme) => T) => {
  const theme = useTheme();
  return React.useMemo(() => makeStyles(theme), [theme, makeStyles]);
};

export const useSearchDebounce = (func: (...params: any) => void, time: number = 1000) => {
  return React.useRef(_.debounce(func, time)).current;
};
