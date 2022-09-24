import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Box, Icon, IconNames, StyleSheet, Text, TouchableOpacity } from 'components';
import { dimensions } from 'constants/dimensions';
import { strings } from 'localization';
import { AppTabParams } from 'types/navigation';

type Props = BottomTabBarProps;

const Tabs: Record<keyof AppTabParams, { name: string; icon: IconNames }> = {
  tab1: {
    name: strings.tabs.tab1,
    icon: 'dashboard',
  },
  tab2: {
    name: strings.tabs.tab2,
    icon: 'cart',
  },
};

const TabBar = ({ navigation, state, descriptors }: Props) => {
  return (
    <Box horizontal style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true, params: {} });
          }
        };
        const name = route.name as keyof AppTabParams;
        const icon = Tabs[name].icon;
        return (
          <TouchableOpacity
            key={name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            center
            style={styles.tab}
            full>
            <Text primary brandPrimary={isFocused} f16>
              {label}
            </Text>
            <Icon style={styles.icon} f18 name={icon} primary brandPrimary={isFocused} />
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    paddingBottom: dimensions.paddingBottom,
  },
  tab: {
    marginVertical: dimensions.large,
  },
  icon: {
    marginTop: dimensions.normal,
  },
});
