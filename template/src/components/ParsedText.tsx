import React from 'react';
import { TextStyle } from 'react-native';
import RNParsedText from 'react-native-parsed-text';
import { fonts } from 'constants/fonts';
import LinkingUtils from 'utils/LinkingUtils';

import { StyleSheet } from './StyleSheet';

type ParsedTextProps = {
  children: string;
  style?: TextStyle;
  highlightStyle?: TextStyle;
  onPress?: (url: string) => any;
};
export const ParsedText = ({ children, style, onPress, highlightStyle }: ParsedTextProps) => {
  const renderText = React.useCallback((text: string) => {
    if (!text || text.length === 0) {
      return '';
    }
    return text.substring(1, text.length - 1);
  }, []);

  return (
    <RNParsedText
      style={[styles.text, style]}
      parse={[
        {
          pattern: /\[.+?\]/,
          style: [styles.highlight, highlightStyle],
          renderText,
          onPress,
        },
        { type: 'url', style: [styles.highlight, highlightStyle], onPress: LinkingUtils.openUrl },
      ]}
      childrenProps={{ allowFontScaling: false }}>
      {children}
    </RNParsedText>
  );
};
const styles = StyleSheet.create({
  highlight: {
    textDecorationLine: 'underline',
    color: 'green',
  },
  text: {
    fontFamily: fonts.regular,
  },
});
