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
  showForResponse: (response: any, successMessage?: string): boolean => {
    if (!response) {
      return false;
    }
    const { isSuccess, message } = response.payload;
    if (isSuccess) {
      successMessage && Toast.show({ message: successMessage });
    } else {
      Toast.error({ message });
    }
    return isSuccess;
  },
};

export default Toast;
