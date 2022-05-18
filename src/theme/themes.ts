import { ImageStyle, Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { hasNotch } from 'react-native-device-info';

const isX = hasNotch();
const isAndroid = Platform.OS === 'android';
export const LightTheme = {
  statusBar: '#000000', // color of status bar on android
  navigationBar: '#000000', // background of header (1)
  backgroundColor: '#FFFFFF', // main background color (2)
  backgroundSecondaryColor: '#F7F7F7', // background color for selected item, section separator (3)
  primaryText: '#000000', // main text color (4), and button background color
  secondaryText: '#9A9A9A', // secondary text color (5)
  //
  iconSecondary: '#9A9A9A', // icon color (7)
  navigationText: '#FFFFFF', // header title color (8)
  //
  borderOrDisabled: '#E6E6E6', // border, horizontal line (10)
  placeholder: 'rgba(0, 0, 0, .25)', // input placeholder text color (11)
  errorText: '#d84315', // input error text color (12)
  backdrop: 'rgba(0, 0, 0, .4)', // backdrop of modal (13)
  facebook: '#3B5998', // facebook icon background color (14)
  google: '#FFFFFF', // google icon background color (15)
  twitter: '#00ACED', // twitter icon background color (16)
  progressBarActive: '#F26F21', // progress bar completed percent (17)
  progressBarInactive: '#F7F7F7', // progress bar remaining progress (18)
  grey: '#7C7C7C', // disabled button color (19)
  orange: '#F26F21', // waitlisted or orange button (20)
  green: '#43B837', // booked or orange button (21)
  red: '#ED0000', // input error border, or payment status fail (22)
};

export type Color = typeof LightTheme;

type MergeStyle = ViewStyle | ImageStyle | TextStyle;

export type ShareStyle = {
  shadow: MergeStyle;
  shadow2: MergeStyle;
  circle: (size: number) => MergeStyle;
  rounded: (height: number) => MergeStyle;
  center: MergeStyle;
};

export const sharedStyle: ShareStyle = {
  shadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, .1)',
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 2,
    backgroundColor: '#FFF',
  },
  shadow2: {
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowColor: 'rgba(107,107,107,0.36)',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 2,
    backgroundColor: '#FFF',
  },
  circle: (size: number) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
  }),
  rounded: (height: number) => ({
    height,
    borderRadius: height / 2,
  }),
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const paddingBottom = (() => {
  if (isAndroid) {
    return 0;
  }
  return isX ? 34 : 0;
})();

const statusBarHeight = (() => {
  if (isAndroid) {
    return 0;
  }
  return isX ? 44 : 20;
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

export const fonts = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
};

export type Font = typeof fonts;

export type Dimensions = typeof dimensions;
