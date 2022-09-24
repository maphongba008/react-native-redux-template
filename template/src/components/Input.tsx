import React from 'react';
import { KeyboardTypeOptions, StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'selectors';

import { Box } from './Box';
import { SharedTextProps, useTextStyles } from './Shared';
import { StyleSheet } from './StyleSheet';
import { Text } from './Text';

type InputProps = {
  error?: string;
  errorStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  inputProps?: TextInputProps;
  nextRef?: React.RefObject<TextInput>;
} & SharedTextProps;

const LABEL_FONT_SIZE = 14;
const INPUT_FONT_SIZE = 16;
const INPUT_HEIGHT = 30;

export const Input = React.forwardRef(
  ({ inputProps = {}, style, error, errorStyle, nextRef, ...props }: InputProps, ref: any) => {
    const colors = useTheme();
    const { onFocus, onBlur, value, placeholder } = inputProps;
    const additionalStyles = useTextStyles({ primary: true, ...props });
    const inputHeight = parseInt(String(StyleSheet.flatten(inputProps.style)?.height || 0), 10) || INPUT_HEIGHT;
    const onSubmitPress = React.useCallback(
      (e: any) => {
        nextRef?.current?.focus();
        inputProps.onSubmitEditing?.(e);
      },
      [inputProps, nextRef],
    );
    const returnKeyType = (() => {
      const types: (KeyboardTypeOptions | undefined)[] = ['number-pad', 'numeric'];
      if (types.includes(inputProps?.keyboardType)) {
        return 'done';
      }
      return nextRef ? 'next' : 'done';
    })();
    const [isFocused, setIsFocused] = React.useState(false);
    const animation = useSharedValue(0);
    const onInputFocus = React.useCallback(
      (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );
    const onInputBlur = React.useCallback(
      (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );
    const hasValue = (value || '')?.length > 0;
    React.useEffect(() => {
      animation.value = withTiming(isFocused || hasValue ? 1 : 0);
    }, [animation, hasValue, isFocused]);

    const animatedStyles = useAnimatedStyle(() => {
      return {
        left: 0,
        top: interpolate(animation.value, [0, 1], [LABEL_FONT_SIZE + inputHeight / 4, 0]),
        color: error
          ? colors.red
          : interpolateColor(animation.value, [0, 1], [colors.secondaryText, colors.primaryText]),

        fontSize: interpolate(animation.value, [0, 1], [INPUT_FONT_SIZE, LABEL_FONT_SIZE]),
      };
    });

    const borderStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(animation.value, [0, 1], [colors.border, colors.primaryText]),
      opacity: interpolate(animation.value, [0, 1], [1, 0.5]),
    }));

    return (
      <Box style={[styles.container, style]}>
        <Box>
          <Animated.Text style={[styles.placeholder, animatedStyles]}>{placeholder}</Animated.Text>
          <TextInput
            {...{
              ref,
              returnKeyType,
              ...inputProps,
              placeholder: '',
              onFocus: onInputFocus,
              onBlur: onInputBlur,
              onSubmitEditing: onSubmitPress,
              style: [styles.input, additionalStyles, inputProps.style, { height: inputHeight }],
            }}
          />
        </Box>
        <Animated.View style={[styles.border, borderStyle]} />
        {!!error && (
          <Text red f12 style={[styles.errorText, errorStyle]}>
            {error}
          </Text>
        )}
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  container: {},
  input: {
    marginTop: LABEL_FONT_SIZE,
    height: INPUT_HEIGHT,
  },
  errorText: {},
  placeholder: {
    position: 'absolute',
  },
  border: {
    height: 1,
  },
});
