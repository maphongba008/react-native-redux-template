import React from 'react';
import { connect } from 'react-redux';
import { ThemeName } from 'types';
import EventEmitter, { EventTypes } from 'utils/EventEmitter';

import { Color, Dimensions, dimensions, Font, fonts, LightTheme, sharedStyle, ShareStyle } from './themes';

export type Theme = {
  colors: Color;
  sharedStyle: ShareStyle;
  dimensions: Dimensions;
  fonts: Font;
};

export const defaultTheme: Theme = {
  colors: LightTheme,
  sharedStyle: sharedStyle,
  dimensions,
  fonts,
};

export const ThemeContext = React.createContext(defaultTheme);

export const useTheme = () => {
  return React.useContext(ThemeContext);
};

const Provider = ({ children }: { children: any }) => {
  const [theme, setTheme] = React.useState<Theme>({ ...defaultTheme, colors: LightTheme });
  React.useEffect(() => {
    const changeTheme = (colors: any) => {
      setTheme({ ...theme, colors });
    };
    EventEmitter.register(EventTypes.CHANGE_THEME, changeTheme);
    return () => {
      EventEmitter.unregister(changeTheme);
    };
  }, []);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const ThemeProvider = connect()(Provider);
