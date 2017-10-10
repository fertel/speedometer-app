import { createAction, handleActions } from 'redux-actions';

import { GEOLOCATION_OPTIONS } from '../config/config';
import { Location } from 'expo';
import { calculateDistance } from '../util/calculate-distance';
import { formatGeolocationSuccessResponse } from '../util/format-geolocation-success-response';

const DEFAULT_STATE = {
    accuracy: 40,
    distanceTravelled: 0, // in meters
    heading: -1, // set to -1 to prevent flash of 0 degrees of ('N') on the compass on load
    lastPosition: {},
    routeCoordinates: [],
    speed: 0,
    speeds: [0],
    topSpeed: 0
};

const SUCCESS = 'geolocation/SUCCESS';

export default handleActions({
    [SUCCESS]: (state, action) => {
        const result = action.payload;
        const { accuracy, currentPosition, heading, speed } = result;
        const { distanceTravelled, lastPosition, routeCoordinates, speeds, topSpeed } = state;

        const adjustedSpeed = speed < 0 ? 0 : speed;

        return Object.assign({}, state, {
            accuracy,
            distanceTravelled: distanceTravelled + calculateDistance(lastPosition, currentPosition),
            heading,
            lastPosition: currentPosition,
            routeCoordinates: routeCoordinates.concat([currentPosition]),
            speed,
            speeds: speeds.concat([adjustedSpeed]),
            topSpeed: topSpeed < adjustedSpeed ? adjustedSpeed : topSpeed
        });
    }
}, DEFAULT_STATE);

const geolocationSuccess = createAction(SUCCESS);

export const watchPosition = () => dispatch => {

    // TODO: Throw error modal if no geolocation
    return Location.watchPositionAsync(GEOLOCATION_OPTIONS,
        success => {
            const result = formatGeolocationSuccessResponse(success);
            return dispatch(geolocationSuccess(result));
        }
    );
};
