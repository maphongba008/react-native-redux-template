import LocalizedStrings from 'react-native-localization';

const strings = new LocalizedStrings({
  en: {
    common: {
      done: 'Done',
      cancel: 'Cancel',
    },
    toast: {
      success: 'Success',
      failed: 'Failed',
    },
    permissions: {
      permission_required: 'Permission required',
      camera: 'Please grant camera permission.',
      gallery: 'Please grant gallery permission',
      open_settings: 'Open settings',
      not_now: 'Not now',
    },
  },
});

export { strings };
