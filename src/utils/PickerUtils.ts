import { ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { openSettings } from 'react-native-permissions';
import { strings } from 'localization';

import { PermissionUtils } from './PermissionUtils';

const showAlert = (option: { title: string; description: string; buttons: any[] }) => {};

const imageOption: ImageLibraryOptions = {
  mediaType: 'photo',
  includeBase64: true,
  quality: 0.8,
  maxWidth: 1000,
  maxHeight: 1000,
  selectionLimit: 1,
};

type ImageResponse = {
  base64: string;
};

export const PickerUtils = {
  pick: (): Promise<ImageResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await PermissionUtils.gallery();
      } catch (e) {
        showAlert({
          title: strings.permissions.permission_required,
          description: strings.permissions.gallery,
          buttons: [
            {
              title: strings.permissions.open_settings,
              onPress: openSettings,
              type: 'positive',
            },
            {
              title: strings.permissions.not_now,
              type: 'negative',
            },
          ],
        });
        return reject();
      }
      launchImageLibrary(imageOption, (response) => {
        if (response.didCancel) {
          return reject(undefined);
        }
        if (
          response.errorCode ||
          response.errorMessage ||
          !response.assets ||
          response.assets.length === 0 ||
          !response.assets[0].base64
        ) {
          return reject(response.errorCode || response.errorMessage || 'Something went wrong');
        }
        const base64 = response.assets[0].base64;
        return resolve({ base64 });
      });
    });
  },
  takePhoto: (): Promise<ImageResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        await PermissionUtils.camera();
      } catch (e) {
        console.log(e);
        showAlert({
          title: strings.permissions.permission_required,
          description: strings.permissions.camera,
          buttons: [
            {
              title: strings.permissions.open_settings,
              onPress: openSettings,
              type: 'positive',
            },
            {
              title: strings.permissions.not_now,
              type: 'negative',
            },
          ],
        });
        return reject();
      }
      launchCamera(imageOption, (response) => {
        if (response.didCancel) {
          return reject(undefined);
        }
        console.log(response);
        if (
          response.errorCode ||
          response.errorMessage ||
          !response.assets ||
          response.assets.length === 0 ||
          !response.assets[0].base64
        ) {
          return reject(response.errorCode || response.errorMessage || 'Something went wrong');
        }
        const base64 = response.assets[0].base64;
        return resolve({ base64 });
      });
    });
  },
};
