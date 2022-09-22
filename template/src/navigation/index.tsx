import React from 'react';
import { ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsLoggedIn } from 'app/selector';
import { Box } from 'components';
import LoginScreen from 'features/authentication/login';
import Tab1Screen from 'features/main/tab1';
import Tab2Screen from 'features/main/tab2';
import { Screens } from 'types/enums';
//
import { AppTabParams, AuthenticationStackParams, RootStackParams } from 'types/navigation';

import { navigationRef } from './RootNavigation';
//
import TabBar from './TabBar';

const AuthenticationStack = createStackNavigator<AuthenticationStackParams>();
const RootStack = createStackNavigator<RootStackParams>();
const AppTab = createBottomTabNavigator<AppTabParams>();

const AppTabMain = () => {
  console.log('render tab navigator');
  return (
    <AppTab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <AppTab.Screen name={Screens.TAB_1} component={Tab1Screen} options={{ tabBarLabel: 'Tab 1' }} />
      <AppTab.Screen name={Screens.TAB_2} component={Tab2Screen} options={{ tabBarLabel: 'Tab 2' }} />
    </AppTab.Navigator>
  );
};

const Authentication = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name={Screens.LOGIN} component={LoginScreen} />
    </AuthenticationStack.Navigator>
  );
};

const AppNavigator = () => {
  console.log('render app navigator');
  const isLoading = false;
  if (isLoading) {
    return (
      <Box full center>
        <ActivityIndicator />
      </Box>
    );
  }
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={Screens.APP_TAB} component={AppTabMain} />
    </RootStack.Navigator>
  );
};

const Navigation = () => {
  console.log('render navigation');
  const language = 'en';
  const isLoggedIn = useIsLoggedIn();
  return (
    <NavigationContainer
      ref={navigationRef}
      key={language}
      onReady={() => {
        SplashScreen.hide();
      }}>
      {isLoggedIn ? <AppNavigator /> : <Authentication />}
    </NavigationContainer>
  );
};

export default connect()(Navigation);
