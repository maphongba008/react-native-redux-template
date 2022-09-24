import React from 'react';
import { ActivityIndicator, StyleProp, TextStyle } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Box, StyleSheet } from 'components';
import { dimensions } from 'constants/dimensions';
import { useTheme } from 'selectors';
import { Theme } from 'types';
import EventEmitter, { EventTypes } from 'utils/EventEmitter';

import { BackHandler } from './BackHandler';
import { Input } from './Input';
import { Text } from './Text';
import { TouchableOpacity } from './TouchableOpacity';

type Button = {
  text: string;
  onPress?: (content: string) => void | Promise<void>;
  isCancel?: boolean;
  isPositive?: boolean;
  isNegative?: boolean;
};

type DialogProps = {
  title?: string;
  message?: string;
  buttons: Button[];
  inputProps?: {
    placeholder?: string;
    value?: string;
    style?: StyleProp<TextStyle>;
  };
};

const DialogButton = ({
  button,
  closeAlert,
  setDisabled,
  content,
}: {
  button: Button;
  closeAlert: () => void;
  setDisabled: (disabled: boolean) => void;
  content: string;
}) => {
  const [isLoading, setLoading] = React.useState(false);
  const colors = useTheme();
  return (
    <TouchableOpacity
      full
      center
      onPress={async () => {
        setLoading(true);
        setDisabled(true);
        await button.onPress?.(content);
        setLoading(false);
        closeAlert();
      }}>
      {isLoading && <ActivityIndicator animating color={colors.primaryText} />}
      {!isLoading && (
        <Text secondary={button.isCancel} red={button.isNegative} brandPrimary={button.isPositive} text={button.text} />
      )}
    </TouchableOpacity>
  );
};

const DialogView = () => {
  const styles = makeStyles(useTheme());
  // const animation = React.useRef(new Animated.Value(0)).current;
  const animation = useSharedValue(0);
  const [props, setProps] = React.useState<DialogProps>();
  const [visible, setVisible] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [value, onChangeText] = React.useState('');
  React.useEffect(() => {
    const showAlert = (mProps: DialogProps) => {
      setProps(mProps);
      setVisible(true);
      setDisabled(false);
      onChangeText(mProps.inputProps?.value || '');
      animation.value = withTiming(1, { duration: 250 });
    };
    EventEmitter.register(EventTypes.SHOW_ALERT, showAlert);
    return () => {
      EventEmitter.unregister(showAlert);
    };
  }, [animation]);

  const closeAlert = React.useCallback(() => {
    animation.value = withTiming(0, { duration: 250 }, () => {
      runOnJS(setVisible)(false);
    });
  }, [animation]);
  const onBackPress = React.useCallback(() => {
    if (!disabled) {
      closeAlert();
    }
    return true;
  }, [closeAlert, disabled]);
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(animation.value, [0, 1], ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .3)']),
  }));
  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(animation.value, [0, 1], [800, 0]),
      },
    ],
  }));
  if (!visible) {
    return null;
  }
  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <BackHandler onBack={onBackPress} />
      <TouchableOpacity disabled={disabled} style={StyleSheet.absoluteFill} activeOpacity={1} onPress={closeAlert} />
      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        {!!props?.title && <Text f18 bold center text={props.title} style={styles.title} />}
        {!!props?.message && <Text f16 center text={props.message} style={styles.message} />}
        {!!props?.inputProps && (
          <Box style={styles.inputContainer}>
            <Input
              inputProps={{
                ...props.inputProps,
                value,
                onChangeText,
              }}
            />
          </Box>
        )}
        <Box style={styles.buttonBox} horizontal>
          {props?.buttons.map((button, index) => (
            <React.Fragment key={button.text}>
              {index !== 0 && <Box style={styles.vSeparator} />}
              <DialogButton
                content={value}
                setDisabled={() => setDisabled(true)}
                button={button}
                closeAlert={closeAlert}
              />
            </React.Fragment>
          ))}
        </Box>
      </Animated.View>
    </Animated.View>
  );
};
const makeStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
    },
    content: {
      backgroundColor: colors.backgroundColor,
      borderRadius: dimensions.radiusLarge,
      marginHorizontal: dimensions.xLarge * 2,
    },
    title: {
      marginTop: dimensions.semiXLarge,
      marginHorizontal: dimensions.large,
    },
    message: {
      marginTop: dimensions.narrow,
      marginHorizontal: dimensions.large,
    },
    buttonBox: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      marginTop: dimensions.semiXLarge,
      height: 44,
    },
    vSeparator: {
      width: 1,
      backgroundColor: colors.border,
    },
    inputContainer: {
      marginTop: dimensions.large,
      paddingHorizontal: dimensions.large,
    },
  });

export const Dialog = {
  Provider: DialogView,
  show: (props: DialogProps) => {
    EventEmitter.notify(EventTypes.SHOW_ALERT, props);
  },
  warn: (props: DialogProps) => {
    EventEmitter.notify(EventTypes.SHOW_ALERT, props);
  },
};
