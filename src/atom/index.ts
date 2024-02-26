import { atom } from 'recoil';
import { LocationType } from '../types/map';

const DEFAULT_LAT = '37.497625203';
const DEFAULT_LNG = '127.03088379';
const DEFAULT_ZOOM = 8;

export const mapState = atom({
  key: 'map',
  default: null,
  dangerouslyAllowMutability: true,
});

export const locationState = atom<LocationType>({
  key: 'location',
  default: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: DEFAULT_ZOOM,
  },
});

export const currentLocationState = atom<LocationType>({
  key: 'currentLocation',
  default: {
    lat: '',
    lng: '',
    zoom: DEFAULT_ZOOM,
  },
});

export const arriveLocationState = atom<LocationType>({
  key: 'arriveLocation',
  default: {
    lat: '',
    lng: '',
    zoom: DEFAULT_ZOOM,
  },
});
