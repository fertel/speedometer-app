import { createAction, handleActions } from 'redux-actions';

import { GEOLOCATION_OPTIONS } from '../config/config';
import { Location } from 'expo';

const DEFAULT_STATE = {
    isRequestingGeolocation: false,
    geolocation: {
        accuracy: 5,
        altitude: 0,
        altitudeAccuracy: -1,
        heading: -1,
        latitude: 37.785834,
        longitude: -122.406417,
        speed: -1
    }
};

const REQUEST = 'geolocation/REQUEST';
const SUCCESS = 'geolocation/SUCCESS';
const FAILURE = 'geolocation/FAILURE';

export default handleActions({
    [FAILURE]: state => Object.assign({}, state, {isRequestingGeolocation: false}),
    [REQUEST]: state => Object.assign({}, state, {isRequestingGeolocation: true}),
    [SUCCESS]: (state, action) => Object.assign({}, state, {
        geolocation: action.payload,
        isRequestingGeolocation: false
    })
}, DEFAULT_STATE);

const geolocationRequest = createAction(REQUEST);
const geolocationSuccess = createAction(SUCCESS);
const geolocationFailure = createAction(FAILURE);

export const requestGeolocation = () => dispatch => {

    dispatch(geolocationRequest());

    return Location.getCurrentPositionAsync(GEOLOCATION_OPTIONS)
        .then(
            success => {
                const { coords } = success;
                return dispatch(geolocationSuccess(coords));
            }, error => {
                console.log('Error requesting geolocation: ', error);
                return dispatch(geolocationFailure());
            }
        );
};
