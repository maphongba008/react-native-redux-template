import RNToast from 'react-native-toast-message';
import { strings } from 'localization';

const Toast = {
  show: ({ title, message }: { title?: string; message?: string }) => {
    RNToast.show({
      type: 'success',
      text1: title || strings.toast.success,
      text2: message,
    });
  },
  error: ({ title, message }: { title?: string; message?: string }) => {
    RNToast.show({
      type: 'error',
      text1: title || strings.toast.failed,
      text2: message,
    });
  },
};

export default Toast;
