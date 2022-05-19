import React from 'react';
import AS from 'react-native-actionsheet';
import { strings } from 'localization';
import EventEmitter, { EventTypes } from 'utils/EventEmitter';

type Option = {
  title: string;
  buttons: Button[];
};

type Button = {
  text: string;
  onPress?: () => void;
};

const show = (option: Option) => {
  EventEmitter.notify(EventTypes.SHOW_ACTION_SHEET, { option });
};

const Provider = () => {
  const ref = React.useRef<any>();
  const [option, setOption] = React.useState<Option>();
  React.useEffect(() => {
    const showActionSheet = ({ option: _option }: { option: Option }) => {
      setOption(_option);
    };
    EventEmitter.register(EventTypes.SHOW_ACTION_SHEET, showActionSheet);
    return () => {
      EventEmitter.unregister(showActionSheet);
    };
  }, []);
  React.useEffect(() => {
    if (option) {
      ref.current?.show();
    }
  }, [option]);
  if (!option) {
    return null;
  }
  const { title, buttons } = option;
  return (
    <AS
      // @ts-ignore
      ref={ref}
      title={title}
      options={[...buttons.map((e) => e.text), strings.common.cancel]}
      cancelButtonIndex={buttons.length}
      // destructiveButtonIndex={1}
      onPress={(index: number) => {
        const btn = buttons[index];
        if (!btn) {
          return;
        }
        btn.onPress?.();
      }}
    />
  );
};

export const ActionSheet = {
  show,
  Provider,
};
