import { Linking } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

function uuid() {
  return uuidv4();
}

// Result is in metres
export function distance(lat1?: number, lon1?: number, lat2?: number, lon2?: number) {
  if (!lat1 || !lat2 || !lon1 || !lon2) {
    return null;
  }
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
}

function toOrdinal(i: number) {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k !== 13) {
    return i + 'rd';
  }
  return i + 'th';
}

const StringUtils = {
  uuid,
  toOrdinal,
  distance,
};

export default StringUtils;
