import { Platform } from 'react-native';
import { check, Permission, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const isAndroid = Platform.OS === 'android';

const requestPermission = (permission: Permission): Promise<any | undefined> => {
  return new Promise(async (resolve, reject) => {
    const checkRes = await check(permission);
    console.info({ permission, checkRes });
    if (checkRes === 'unavailable') {
      return reject(checkRes);
    }
    if (checkRes === 'blocked' || checkRes === 'limited') {
      return reject(checkRes);
    }
    if (checkRes === 'granted') {
      return resolve(undefined);
    }
    if (checkRes === 'denied') {
      const requestRes = await request(permission);
      console.info({ permission, requestRes });
      if (requestRes === 'granted') {
        return resolve(undefined);
      }
      return reject(requestRes);
    }
  });
};

export const PermissionUtils = {
  camera: () => {
    return requestPermission(isAndroid ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA);
  },
  gallery: () => {
    if (!isAndroid) {
      return Promise.resolve();
    }
    return requestPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  },
  location: () => {
    return requestPermission(
      isAndroid ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    );
  },
};
