import { isAndroid } from '../assets/styles/variables';

export const DEBUG_MODE = false;

export const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: isAndroid ? false : true,
    timeInterval: 300,
    distanceInterval: 1
};
