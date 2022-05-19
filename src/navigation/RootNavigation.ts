// RootNavigation.js

import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { AuthenticationStackParams } from 'types/navigation';

export const navigationState = { isReady: false };

export const navigationRef = React.createRef<NavigationContainerRef>();

type ScreenNames = keyof AuthenticationStackParams;

function navigate(name: ScreenNames, params?: any) {
  if (navigationState.isReady && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  }
}

const back = () => {
  navigationRef.current?.goBack();
};

const RootNavigation = {
  navigate,
  back,
};
export default RootNavigation;
