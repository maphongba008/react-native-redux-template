import React from 'react';
import { KeyboardAvoidingView as KAV, KeyboardAvoidingViewProps, Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const KeyboardAvoidingView = ({ ...props }: KeyboardAvoidingViewProps & { children?: any }) => {
  const style = { flex: 1 };
  return (
    <KAV style={style} behavior={isAndroid ? undefined : 'padding'} {...props}>
      {props.children}
    </KAV>
  );
};
