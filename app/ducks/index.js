import { combineReducers } from 'redux';
import geolocationDuck from './geolocation';
import modalDuck from './modal';
import unitMeasurementDuck from './unit-measurement';

const Reducers = combineReducers({
    geolocationDuck,
    modalDuck,
    unitMeasurementDuck
});

export default Reducers;
