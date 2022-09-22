import React from 'react';
import { dimensions } from 'constants/dimensions';
import RootNavigation from 'navigation/RootNavigation';
import { useStyles } from 'selectors/hooks';
import { Theme } from 'types';

import { Box } from './Box';
import { Icon } from './Icon';
import { StyleSheet } from './StyleSheet';
import { Text } from './Text';
import { TouchableOpacity } from './TouchableOpacity';

type HeaderProps = {
  title?: string;
  separator?: boolean;
  backEnabled?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  leftIconStyle?: any;
  rightIconStyle?: any;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  children?: any;
};

export const Header = ({
  leftIcon,
  rightIcon,
  title,
  onPressLeft,
  onPressRight,
  separator = true,
  leftIconStyle,
  rightIconStyle,
  backEnabled,
  children,
}: HeaderProps) => {
  if (backEnabled) {
    leftIcon = leftIcon || 'ic-arrow-short-left';
    onPressLeft = onPressLeft || RootNavigation.back;
  }

  const styles = useStyles(makeStyles);
  return (
    <Box borderBottom={separator} style={[styles.header, undefined]}>
      <TouchableOpacity activeOpacity={0.7} disabled={!leftIcon} onPress={onPressLeft} style={styles.leftButton}>
        {!!leftIcon && <Icon f18 primary style={[styles.leftIcon, leftIconStyle]} name={leftIcon} />}
      </TouchableOpacity>
      {!!children && children}
      {!children && (
        <Text primary bold numberOfLines={2} style={[styles.titleText]}>
          {title}
        </Text>
      )}
      <TouchableOpacity activeOpacity={0.7} disabled={!rightIcon} onPress={onPressRight} style={styles.rightButton}>
        {!!rightIcon && <Icon f18 primary name={rightIcon} style={[styles.rightIcon, rightIconStyle]} />}
      </TouchableOpacity>
    </Box>
  );
};

const makeStyles = (colors: Theme) =>
  StyleSheet.create({
    header: {
      height: dimensions.navBar,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.navigationBar,
    },
    leftIcon: {},
    leftButton: {
      width: 60,
      paddingLeft: 16,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    rightIcon: {},
    rightButton: {
      width: 60,
      paddingRight: 16,
      alignItems: 'flex-end',
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    titleText: {
      textAlign: 'center',
      paddingHorizontal: 8,
      flex: 1,
      fontSize: 18,
      lineHeight: 22,
    },
    separator: {
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
    },
  });
