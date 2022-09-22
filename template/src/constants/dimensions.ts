import { Platform, StyleSheet } from 'react-native';
import { hasDynamicIsland, hasNotch } from 'react-native-device-info';

const isX = hasNotch();
const isAndroid = Platform.OS === 'android';

const statusBarHeight = (() => {
  if (isAndroid) {
    return 0;
  }
  if (hasDynamicIsland()) {
    return 50;
  }
  return isX ? 44 : 20;
})();

const paddingBottom = (() => {
  if (isAndroid) {
    return 0;
  }
  return isX ? 34 : 0;
})();

export const dimensions = {
  separator: StyleSheet.hairlineWidth,
  narrow: 4,
  normal: 8,
  large: 16,
  semiXLarge: 24,
  xLarge: 40,
  buttonHeight: 50,
  avatar: 60,
  radius: 4,
  radiusLarge: 10,
  navBar: 60,
  paddingBottom,
  statusBarHeight,
};
