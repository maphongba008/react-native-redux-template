import React from 'react';
import { ViewStyle } from 'react-native';
import { useTheme } from 'theme';

import { Box } from './Box';

export const Separator = ({ style }: { style?: ViewStyle }) => {
  const { colors, dimensions } = useTheme();
  return (
    <Box
      style={[
        {
          height: dimensions.separator,
          backgroundColor: colors.borderOrDisabled,
        },
        style,
      ]}
    />
  );
};
