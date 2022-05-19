import Geolocation, { GeoError, GeoPosition } from 'react-native-geolocation-service';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';

import Logger from './Logger';
class LocationUtils {
  getCurrentLocation = (): Promise<GeoPosition> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.info('get position', position);
          resolve(position);
        },
        (error: GeoError) => {
          reject(error);
          Logger.report('Fail to get current location', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
          accuracy: {
            android: 'high',
            ios: 'best',
          },
        },
      );
    });
  };

  watchPosition = async (minAccuracy: number): Promise<GeoPosition> => {
    return new Promise((resolve) => {
      const id = Geolocation.watchPosition(
        (position: GeoPosition) => {
          if (position.coords.accuracy < minAccuracy) {
            console.log('watch res', position);
            resolve(position);
            // Geolocation.clearWatch(id);
          }
        },
        (error) => {
          error && console.info('fail to watch position: ', error.message);
        },
        {
          enableHighAccuracy: true,
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          fastestInterval: 20,
        },
      );
    });
  };

  timeout = (time: number = 5 * 1000): Promise<undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(undefined), time);
    });
  };

  getAccurateLocation = async (minAccuracy: number): Promise<GeoPosition | undefined> => {
    let location = await this.getCurrentLocation();
    let count = 0;
    while (location.coords.accuracy > minAccuracy) {
      await this.timeout(200);
      count++;
      location = await this.getCurrentLocation();
      if (count >= 10) {
        Logger.report('Fail to get current location with accuracy', location);
        break;
      }
    }
    return location;
    // return Promise.race([this.timeout(), this.watchPosition(minAccuracy)]);
  };

  getExpoLocation = async () => {
    let count = 1;
    let location: LocationObject = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.BestForNavigation,
    });
    while ((location.coords.accuracy || 10000) > 100) {
      location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.BestForNavigation,
      });
      count++;
      if (count >= 10) {
        Logger.report('Fail to get expo location with accuracy', location);
        break;
      }
      await this.timeout(200);
    }
    return location;
    // console.info('expo location', JSON.stringify(location));
  };

  getMostAccurateLocation = async () => {
    const [geoLocation, expoLocation] = await Promise.all([this.getCurrentLocation(), this.getExpoLocation()]);
    console.info('current location', JSON.stringify({ geoLocation, expoLocation }));
    return geoLocation.coords.accuracy < (expoLocation.coords.accuracy || 10000) ? geoLocation : expoLocation;
  };
}

export default new LocationUtils();
