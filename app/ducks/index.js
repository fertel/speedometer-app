import { combineReducers } from 'redux';
import geolocationDuck from './geolocation';
import modalDuck from './modal';
import timerDuck from './timer';
import unitMeasurementDuck from './unit-measurement';

const Reducers = combineReducers({
    geolocationDuck,
    modalDuck,
    timerDuck,
    unitMeasurementDuck
});

export default Reducers;
