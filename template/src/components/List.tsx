import React from 'react';
import {
  ActivityIndicator,
  FlatList as FL,
  FlatListProps as FP,
  SectionList as SL,
  SectionListProps as SLP,
  StyleSheet,
} from 'react-native';
import { useStyles } from 'selectors/hooks';
import { Theme, useTheme } from 'theme';

import { Box } from './Box';
import { Icon } from './Icon';
import { IconNames } from './IconNames';
import { Text } from './Text';

type EmptyOption = {
  image: IconNames;
  text: string;
  description?: string;
};

type FlatListProps<T> = Omit<FP<T>, 'renderItem' | 'children'> & {
  children?: (item: T, index: number) => any;
  emptyOption?: EmptyOption;
  isLoading?: boolean;
  loadingText?: string;
  loadingComponent?: () => any;
};

type SectionListProps<T> = {
  emptyOption?: EmptyOption;
  isLoading?: boolean;
  loadingText?: string;
  loadingComponent?: () => any;
} & SLP<T>;

const EmptyView = ({ emptyOption }: { emptyOption?: EmptyOption }) => {
  const styles = useStyles(makeStyles);
  if (!emptyOption) {
    return null;
  }
  return (
    <Box full center>
      {!!emptyOption.image && <Icon name={emptyOption.image} />}
      {!!emptyOption.text && (
        <Text center medium f28 style={styles.text}>
          {emptyOption.text}
        </Text>
      )}
      {!!emptyOption.description && (
        <Text center f15 style={styles.text}>
          {emptyOption.description}
        </Text>
      )}
    </Box>
  );
};

export const SectionList = <T extends unknown>({
  isLoading,
  loadingText,
  loadingComponent,
  emptyOption,
  ...props
}: SectionListProps<T>) => {
  const styles = makeStyles(useTheme());
  if (isLoading) {
    if (loadingComponent) {
      return (
        <List data={Array.from({ length: 8 })} keyExtractor={(_, item) => String(item)}>
          {() => <React.Fragment>{loadingComponent()}</React.Fragment>}
        </List>
      );
    }
    return (
      <Box full center>
        <ActivityIndicator />
        {!!loadingText && <Text style={styles.text}>{loadingText}</Text>}
      </Box>
    );
  }
  return (
    <SL
      ListEmptyComponent={() => <EmptyView emptyOption={emptyOption} />}
      onEndReachedThreshold={0.5}
      {...props}
      contentContainerStyle={[styles.container, props.contentContainerStyle]}
    />
  );
};

export const List = <T extends unknown>(props: FlatListProps<T>) => {
  if (typeof props.children !== 'function') {
    throw new Error('Children must be a function');
  }
  const styles = makeStyles(useTheme());
  const { emptyOption, isLoading, loadingComponent, loadingText } = props;
  if (isLoading) {
    if (loadingComponent) {
      return (
        <List data={Array.from({ length: 8 })} keyExtractor={(_, item) => String(item)}>
          {() => <React.Fragment>{loadingComponent()}</React.Fragment>}
        </List>
      );
    }
    return (
      <Box full center>
        <ActivityIndicator />
        {!!loadingText && <Text style={styles.text}>{loadingText}</Text>}
      </Box>
    );
  }
  const _renderItem = ({ item, index }: { item: T; index: number }) => props.children?.(item, index);

  return (
    <FL
      ListEmptyComponent={() => <EmptyView emptyOption={emptyOption} />}
      onEndReachedThreshold={0.5}
      renderItem={_renderItem}
      data={[]}
      contentContainerStyle={[styles.container, props.contentContainerStyle]}
    />
  );
};

const makeStyles = ({ dimensions }: Theme) =>
  StyleSheet.create({
    text: {
      marginTop: dimensions.normal,
      marginHorizontal: dimensions.xLarge,
    },
    container: {
      flexGrow: 1,
    },
  });
