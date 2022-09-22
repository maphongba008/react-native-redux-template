import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

import { SharedTextProps, useTextStyles } from './Shared';
type TextProps = Omit<RNTextProps, 'children'> & {
  text?: string;
  children?: any;
} & SharedTextProps;

export const Text = (props: TextProps) => {
  const text = props.text || props.children;
  const textStyles = useTextStyles(props);
  return (
    <RNText {...props} style={[textStyles, props.style]}>
      {text}
    </RNText>
  );
};
