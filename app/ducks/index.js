import { combineReducers } from 'redux';
import geolocationDuck from './geolocation';
import speedMeasurementDuck from './speed-measurement';

const Reducers = combineReducers({
    geolocationDuck,
    speedMeasurementDuck
});

export default Reducers;
