import React from 'react';
import { ActivityIndicator, Animated, Dimensions } from 'react-native';
import { Theme, useTheme } from 'theme';
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
  const animation = React.useRef(new Animated.Value(0)).current;
  const styles = makeStyles(useTheme());
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
    if (hudCount > 0) {
      setAnimationFinish(false);
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: false,
      }).start(() => {
        setAnimationFinish(true);
      });
    } else {
      setAnimationFinish(false);
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: false,
      }).start(() => {
        setAnimationFinish(true);
      });
    }
  }, [animation, hudCount]);

  if (hudCount === 0 && isFinishAnimation) {
    return null;
  }
  const containerAnimatedStyle = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .5)'],
    }),
  };

  const popupAnimatedStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [(height * 2) / 3, 0],
        }),
      },
    ],
  };
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

const makeStyles = (_theme: Theme) =>
  StyleSheet.create({
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
