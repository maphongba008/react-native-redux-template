import React from 'react';
import { Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { dimensions } from 'constants/dimensions';
import { strings } from 'localization';
import { useTheme } from 'selectors';
import { Theme } from 'types';
import { DateUtils } from 'utils/DateUtils';

import { Box } from './Box';
import { Icon } from './Icon';
import { StyleSheet } from './StyleSheet';
import { Text } from './Text';
import { TouchableOpacity, TouchableOpacityProps } from './TouchableOpacity';

const isAndroid = Platform.OS === 'android';

type Props = {
  date: Date;
  onDateSelected: (date: Date) => void;
} & TouchableOpacityProps;

export const DatePicker = ({ date, onDateSelected, ...props }: Props) => {
  const styles = makeStyle(useTheme());
  const [visible, setVisible] = React.useState(false);

  const closePicker = React.useCallback(() => setVisible(false), []);
  const openPicker = React.useCallback(() => setVisible(true), []);
  const onPrevPress = React.useCallback(() => {
    onDateSelected(DateUtils.addDate(date, -1));
  }, [date, onDateSelected]);
  const onNextPress = React.useCallback(() => {
    onDateSelected(DateUtils.addDate(date, 1));
  }, [date, onDateSelected]);
  return (
    <TouchableOpacity
      borderBottom
      horizontal
      centerVertical
      {...props}
      onPress={openPicker}
      style={[styles.container, props.style]}>
      <TouchableOpacity onPress={onPrevPress} style={styles.iconButton}>
        <Icon name="icon-date-arrow-left" style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.dateText}>{DateUtils.fullDateString(date)}</Text>
      <TouchableOpacity onPress={onNextPress} style={styles.iconButton}>
        <Icon name="icon-date-arrow-right" style={styles.icon} />
      </TouchableOpacity>
      <DatePickerModal date={date} visible={visible} onDateSelected={onDateSelected} onClose={closePicker} />
    </TouchableOpacity>
  );
};

type DatePickerModalProps = {
  visible?: boolean;
  onDateSelected: (date: Date) => void;
  onClose: () => void;
  date: Date;
};

export const DatePickerModal = ({ onClose, visible, date, onDateSelected }: DatePickerModalProps) => {
  const styles = makeStyle(useTheme());
  const [selectedDate, setSelectedDate] = React.useState(new Date(date));
  const onChange = React.useCallback(
    (_: any, d?: Date) => {
      if (isAndroid) {
        d && onDateSelected(d);
        onClose();
        return;
      }
      setSelectedDate(d || new Date());
    },
    [onClose, onDateSelected],
  );

  const onDonePress = React.useCallback(() => {
    onDateSelected(selectedDate);
    onClose();
  }, [onClose, onDateSelected, selectedDate]);
  if (isAndroid) {
    if (!visible) {
      return null;
    }
    return (
      <DateTimePicker
        minimumDate={new Date()}
        style={styles.datePicker}
        testID="dateTimePicker"
        value={selectedDate}
        mode={'date'}
        display="calendar"
        onChange={onChange}
      />
    );
  }
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <Box full style={styles.dateContainer}>
        <TouchableOpacity full activeOpacity={1} onPress={onClose} />
        <Box borderBottom borderTop style={styles.doneContainer}>
          <TouchableOpacity style={styles.doneButton} onPress={onDonePress}>
            <Text f16 style={styles.doneText}>
              {strings.common.done}
            </Text>
          </TouchableOpacity>
        </Box>
        <DateTimePicker
          minimumDate={new Date()}
          style={styles.datePicker}
          testID="dateTimePicker"
          value={selectedDate}
          mode={'date'}
          display="spinner"
          onChange={onChange}
        />
      </Box>
    </Modal>
  );
};

const makeStyle = (colors: Theme) =>
  StyleSheet.create({
    container: {
      height: 75,
      paddingHorizontal: dimensions.large,
    },
    iconButton: {
      paddingHorizontal: dimensions.large,
      paddingVertical: dimensions.large,
    },
    icon: {},
    dateText: {
      flex: 1,
      marginHorizontal: dimensions.large,
      fontSize: 24,
      textAlign: 'center',
    },
    dateContainer: {},
    datePicker: {
      height: 250,
      backgroundColor: colors.backgroundColor,
    },
    doneContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    doneButton: {
      paddingVertical: dimensions.large,
      paddingHorizontal: dimensions.large,
    },
    doneText: {
      color: '#007AFF',
    },
  });
