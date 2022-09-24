import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import EventEmitter, { EventTypes } from 'utils/EventEmitter';

import { BackHandler } from './BackHandler';
import { StyleSheet } from './StyleSheet';
import { Text } from './Text';

const { height } = Dimensions.get('window');

export const LoadingHud = {
  show: () => {
    EventEmitter.notify(EventTypes.SHOW_HUD);
  },
  hide: () => {
    EventEmitter.notify(EventTypes.HIDE_HUD);
  },
};

export const LoadingHudProvider = () => {
  const [isFinishAnimation, setAnimationFinish] = React.useState(false);
  // const animation = React.useRef(new Animated.Value(0)).current;
  const animation = useSharedValue(0);
  const [hudCount, setHudCount] = React.useState(0);
  React.useEffect(() => {
    const increaseHudCount = () => {
      setHudCount((count) => count + 1);
    };
    const decreaseHudCount = () => {
      setHudCount((count) => count - 1);
    };
    EventEmitter.register(EventTypes.SHOW_HUD, increaseHudCount);
    EventEmitter.register(EventTypes.HIDE_HUD, decreaseHudCount);
    return () => {
      EventEmitter.unregister(increaseHudCount);
      EventEmitter.unregister(decreaseHudCount);
    };
  }, []);

  React.useEffect(() => {
    const onAnimationFinished = () => {
      'worklet';
      runOnJS(setAnimationFinish)(true);
    };

    if (hudCount > 0) {
      setAnimationFinish(false);

      animation.value = withSpring(1, undefined, onAnimationFinished);
    } else {
      setAnimationFinish(false);
      animation.value = withTiming(0, undefined, onAnimationFinished);
    }
  }, [animation, hudCount]);
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(animation.value, [0, 1], ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .5)']),
  }));

  const popupAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(animation.value, [0, 1], [(height * 2) / 3, 0]),
      },
    ],
  }));
  if (hudCount === 0 && isFinishAnimation) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Animated.View style={[styles.popup, popupAnimatedStyle]}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={styles.loadingText}>Loading</Text>
      </Animated.View>
      <BackHandler disabled />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    padding: 20,
    // borderRadius: 10,
    // backgroundColor: color.white,
  },
  loadingText: {
    color: '#FFF',
    marginTop: 8,
    fontSize: 20,
  },
});
