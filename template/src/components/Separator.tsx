import React from 'react';
import { ViewStyle } from 'react-native';

import { Box } from './Box';

export const Separator = ({ style }: { style?: ViewStyle }) => {
  return <Box borderBottom style={style} />;
};
