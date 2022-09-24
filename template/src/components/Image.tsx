import React from 'react';
import { ActivityIndicator, Animated } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { useTheme } from 'selectors';
import { useStyles } from 'selectors/hooks';
import { Theme } from 'types';

import { Box } from './Box';
import { StyleSheet } from './StyleSheet';
interface Props extends FastImageProps {
  color?: string;
}
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
export const Image = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const { color, style, ...rest } = props;
  const styles = useStyles(makeStyles);
  const colors = useTheme();
  const onLoadEnd = () => {
    setLoading(false);
  };
  const onLoadStart = () => {
    setLoading(true);
  };
  return (
    <AnimatedFastImage
      {...rest}
      style={[styles.container, style]}
      onError={onLoadEnd}
      onLoadEnd={onLoadEnd}
      onLoadStart={onLoadStart}>
      {loading && (
        <Box center style={styles.loadingView}>
          <ActivityIndicator color={color || colors.primaryText} />
        </Box>
      )}
    </AnimatedFastImage>
  );
};
const makeStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundColor,
    },
    loadingView: {
      ...StyleSheet.absoluteFillObject,
    },
  });
