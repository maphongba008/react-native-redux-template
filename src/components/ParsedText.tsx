import React from 'react';
import { TextStyle } from 'react-native';
import RNParsedText from 'react-native-parsed-text';
import { Theme, useTheme } from 'theme';
import { fonts } from 'theme/themes';
import LinkingUtils from 'utils/LinkingUtils';

import { StyleSheet } from './StyleSheet';

type ParsedTextProps = {
  children: string;
  style?: TextStyle;
  highlightStyle?: TextStyle;
  onPress?: (url: string) => any;
};
export const ParsedText = ({ children, style, onPress, highlightStyle }: ParsedTextProps) => {
  const styles = makeStyles(useTheme());
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
const makeStyles = ({ colors, dimensions }: Theme) =>
  StyleSheet.create({
    highlight: {
      textDecorationLine: 'underline',
      color: 'green',
    },
    text: {
      fontFamily: fonts.regular,
    },
  });
