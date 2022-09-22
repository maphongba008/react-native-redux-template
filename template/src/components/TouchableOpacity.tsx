import React, { LegacyRef } from 'react';
import { TouchableOpacity as TO, TouchableOpacityProps as TP } from 'react-native';

import { BoxProps } from './Box';
import { useBoxStyles } from './Shared';
export type TouchableOpacityProps = TP & {
  children?: any;
} & BoxProps;

export const TouchableOpacity = React.forwardRef((props: TouchableOpacityProps, ref: LegacyRef<TO>) => {
  const styles = useBoxStyles(props);
  return (
    <TO ref={ref} activeOpacity={0.7} {...props} style={[styles, props.style]}>
      {props.children}
    </TO>
  );
});
