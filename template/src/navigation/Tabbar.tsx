import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Box, Icon, IconNames, StyleSheet, Text, TouchableOpacity } from 'components';
import { strings } from 'localization';
import { Theme, useTheme } from 'theme';
import { Screens } from 'types/enums';
import { AppTabParams } from 'types/navigation';

type Tab = {
  name: string;
  icon?: IconNames;
  target: keyof AppTabParams;
};

const Tabs: Record<string, Tab> = {
  Tab1: {
    name: strings.tabs.tab1,
    icon: 'dashboard',
    target: Screens.TAB_1,
  },
  Tab2: {
    name: strings.tabs.tab2,
    icon: 'cart',
    target: Screens.TAB_2,
  },
};

type Props = BottomTabBarProps;

const Tabbar = (props: Props) => {
  const styles = makeStyle(useTheme());
  const currentTab = props.state.routeNames[props.state.index];
  const onTabPress = (target: string) => {
    return () => {
      props.navigation.navigate(target);
    };
  };
  return (
    <Box horizontal style={styles.container}>
      {Object.values(Tabs).map((tab) => {
        const isSelected = tab.target === currentTab;
        return (
          <TouchableOpacity onPress={onTabPress(tab.target)} key={tab.target} center style={styles.tab}>
            <Box center>
              {!!tab.icon && (
                <Icon f24 brandPrimary={isSelected} secondary={!isSelected} name={tab.icon} style={styles.icon} />
              )}
              <Text f12 style={[styles.text, isSelected && styles.textSelected]}>
                {tab.name}
              </Text>
            </Box>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

export default Tabbar;

const makeStyle = ({ colors, dimensions }: Theme) =>
  StyleSheet.create({
    container: {
      borderTopWidth: 1,
      borderTopColor: colors.borderOrDisabled,
      paddingBottom: dimensions.paddingBottom,
      backgroundColor: colors.backgroundColor,
    },
    tab: {
      flex: 1,
      paddingVertical: dimensions.large,
    },
    text: {
      color: colors.secondaryText,
    },
    textSelected: {
      color: colors.brandPrimary,
    },
    indicator: {
      width: 16,
      height: 16,
      backgroundColor: colors.primaryText,
      borderRadius: 8,
      position: 'absolute',
      right: 0,
      top: -8,
    },
    indicatorText: {
      color: '#FFF',
    },
    icon: {},
  });
