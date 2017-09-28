import { combineReducers } from 'redux';
import geolocationDuck from './geolocation';
import unitMeasurementDuck from './unit-measurement';

const Reducers = combineReducers({
    geolocationDuck,
    unitMeasurementDuck
});

export default Reducers;
