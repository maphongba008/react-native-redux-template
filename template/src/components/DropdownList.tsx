import React from 'react';
import { Modal, ViewStyle } from 'react-native';
import { dimensions } from 'constants/dimensions';
import { useTheme } from 'selectors';
import { Theme } from 'types';

import { Box } from './Box';
import { Icon } from './Icon';
import { List } from './List';
import { Separator } from './Separator';
import { StyleSheet } from './StyleSheet';
import { Text } from './Text';
import { TouchableOpacity } from './TouchableOpacity';

type Item = {
  id?: string;
  name?: string;
  data?: any;
};

type Position = {
  height: number;
  width: number;
  pageX: number;
  pageY: number;
};

type Props = {
  items: Item[];
  currentItem: Item;
  onChooseItem: (item: Item) => void;
  style?: ViewStyle;
};

export const DropdownList = ({ items, currentItem, style, onChooseItem }: Props) => {
  const styles = makeStyles(useTheme());
  const ref = React.useRef<any>();
  const [position, setPosition] = React.useState<Position>({
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  });
  const [visible, setVisible] = React.useState(false);
  const onLayout = React.useCallback(() => {
    setTimeout(() => {
      ref.current.measure((_: number, __: number, width: number, height: number, pageX: number, pageY: number) => {
        setPosition({ width, height, pageX, pageY });
      });
    }, 0);
  }, []);
  return (
    <Box ref={ref} onLayout={onLayout} style={[styles.container, style]}>
      <TouchableOpacity onPress={() => setVisible(true)} horizontal centerVertical style={styles.button}>
        <Text numberOfLines={1} f16 bold style={styles.name}>
          {currentItem.name}
        </Text>
        <Icon style={styles.chevronIcon} name="icon-arrow-down" />
      </TouchableOpacity>
      <DropdownModal
        items={items}
        position={position}
        visible={visible}
        onClose={() => setVisible(false)}
        onChooseItem={onChooseItem}
      />
    </Box>
  );
};

type DropdownModalProps = {
  visible?: boolean;
  onClose: () => void;
  onChooseItem: (option: Item) => void;
  position: Position;
  items: Item[];
};

const DropdownModal = ({ visible, onChooseItem, onClose, position, items }: DropdownModalProps) => {
  const styles = makeStyles(useTheme());
  const popupStyle: ViewStyle = {
    left: position.pageX,
    width: position.width,
    top: position.pageY + position.height,
  };
  const onItemPress = React.useCallback(
    (item: Item) => {
      return () => {
        onClose();
        onChooseItem(item);
      };
    },
    [onChooseItem, onClose],
  );
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <TouchableOpacity activeOpacity={1} onPress={onClose} full>
        <Box style={[styles.popup, popupStyle]}>
          <List data={items} ItemSeparatorComponent={() => <Separator />}>
            {(item: Item) => (
              <TouchableOpacity style={styles.itemView} onPress={onItemPress(item)}>
                <Text f16 bold numberOfLines={2}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          </List>
        </Box>
      </TouchableOpacity>
    </Modal>
  );
};

const makeStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: dimensions.radius,
      // alignSelf: 'flex-start',
      zIndex: 2,
      overflow: 'visible',
      backgroundColor: colors.backgroundColor,
    },
    button: {
      padding: dimensions.normal,
    },
    chevronIcon: {
      marginLeft: dimensions.normal,
    },
    name: {
      flex: 1,
    },
    popup: {
      // ...sharedStyle.shadow,
      position: 'absolute',
      borderWidth: 1,
      borderColor: colors.border,
    },
    itemView: {
      paddingVertical: dimensions.normal,
      paddingHorizontal: dimensions.normal,
    },
  });
