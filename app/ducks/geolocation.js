import { createAction, handleActions } from 'redux-actions';

import { GEOLOCATION_OPTIONS } from '../config/config';
import { Location } from 'expo';
import { calculateDistance } from '../util/calculate-distance';
import { formatGeolocationSuccessResponse } from '../util/format-geolocation-success-response';

const DEFAULT_STATE = {
    accuracy: 40,
    distanceTravelled: 0, // in meters
    heading: -1, // set to -1 to prevent flash of 0 degrees of ('N') on the compass on load
    isRequestingGeolocation: false,
    lastPosition: {},
    routeCoordinates: [],
    speed: 0,
    topSpeed: 0
};

const REQUEST = 'geolocation/REQUEST';
const SUCCESS = 'geolocation/SUCCESS';
const FAILURE = 'geolocation/FAILURE';

export default handleActions({
    [FAILURE]: state => Object.assign({}, state, {isRequestingGeolocation: false}),
    [REQUEST]: state => Object.assign({}, state, {isRequestingGeolocation: true}),
    [SUCCESS]: (state, action) => {
        const result = action.payload;
        const { accuracy, currentPosition, heading, speed } = result;
        const { distanceTravelled, lastPosition, routeCoordinates, topSpeed } = state;

        return Object.assign({}, state, {
            accuracy,
            distanceTravelled: distanceTravelled + calculateDistance(lastPosition, currentPosition),
            heading,
            isRequestingGeolocation: false,
            lastPosition: currentPosition,
            routeCoordinates: routeCoordinates.concat([currentPosition]),
            speed,
            topSpeed: topSpeed < speed ? speed : topSpeed
        });
    }
}, DEFAULT_STATE);

const geolocationRequest = createAction(REQUEST);
const geolocationSuccess = createAction(SUCCESS);
const geolocationFailure = createAction(FAILURE);

export const watchGeolocation = () => dispatch => {

    dispatch(geolocationRequest());

    setInterval(() => {
        return Location.getCurrentPositionAsync(GEOLOCATION_OPTIONS)
            .then(success => {
                const result = formatGeolocationSuccessResponse(success);
                return dispatch(geolocationSuccess(result));
            })
            // TODO: have error modal;
            .catch(error => {
                console.log('error: ', error);
                return dispatch(geolocationFailure());
            });
    }, 300);
};
