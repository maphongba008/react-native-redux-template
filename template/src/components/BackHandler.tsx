import React from 'react';
import { BackHandler as BH } from 'react-native';

type BackHandlerProps = {
  // return true if you want to prevent default onBack
  onBack?: () => boolean | void;
  disabled?: boolean;
};

export const BackHandler = (props: BackHandlerProps) => {
  React.useEffect(() => {
    BH.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BH.removeEventListener('hardwareBackPress', onBackPress);
    };
  });
  const onBackPress = () => {
    const { onBack, disabled } = props;
    if (disabled) {
      return true;
    }
    if (onBack) {
      onBack();
      return true;
    }
    return false;
  };

  return null;
};
