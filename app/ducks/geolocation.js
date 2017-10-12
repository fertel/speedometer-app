import { MODAL_LEVELS, closeModal, setModal } from './modal';
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

const RESET_SPEEDS = 'geolocation/RESET_SPEEDS';
const RESET_TOP_SPEED = 'geolocation/RESET_TOP_SPEED';
const SUCCESS = 'geolocation/SUCCESS';

export default handleActions({
    [RESET_SPEEDS]: state => Object.assign({}, state, { speeds: DEFAULT_STATE.speeds }),
    [RESET_TOP_SPEED]: state => Object.assign({}, state, { topSpeed: DEFAULT_STATE.topSpeed }),
    [SUCCESS]: (state, action) => {
        const result = action.payload;
        const { accuracy, currentPosition, heading, speed } = result;
        const { distanceTravelled, lastPosition, routeCoordinates, speeds, topSpeed } = state;
        const adjustedSpeed = speed < 0 ? 0 : speed;

        let updatedDistanceTraveled = distanceTravelled;
        let updatedSpeeds = speeds;

        if (calculateDistance(lastPosition, currentPosition) > 5) {
            updatedDistanceTraveled = distanceTravelled + calculateDistance(lastPosition, currentPosition);
            updatedSpeeds = speeds.concat([adjustedSpeed]);
        }

        return Object.assign({}, state, {
            accuracy,
            distanceTravelled: updatedDistanceTraveled,
            heading,
            lastPosition: currentPosition,
            routeCoordinates: routeCoordinates.concat([currentPosition]),
            speed,
            speeds: updatedSpeeds,
            topSpeed: topSpeed < adjustedSpeed ? adjustedSpeed : topSpeed
        });
    }
}, DEFAULT_STATE);

export const geolocationSuccess = createAction(SUCCESS);
export const resetSpeeds = createAction(RESET_SPEEDS);
export const resetTopSpeed = createAction(RESET_TOP_SPEED);

// export const getCurrentPosition = () => dispatch => {

//     // TODO: Throw error modal if no geolocation
//     return Location.getCurrentPositionAsync(GEOLOCATION_OPTIONS)
//         .then(success => {
//             const result = formatGeolocationSuccessResponse(success);
//             return dispatch(geolocationSuccess(result));
//         })
//         .catch(error => console.log('Geolocation Error: ', error));
// };

export const watchCurrentPosition = () => dispatch => {

    return Location.watchPositionAsync(GEOLOCATION_OPTIONS,
        success => {
            dispatch(closeModal());

            const result = formatGeolocationSuccessResponse(success);
            return dispatch(geolocationSuccess(result));
        },
        error => {
            setModal({
                hasLoadIndicator: true,
                heading: 'Difficulty Finding Location',
                level: MODAL_LEVELS.ERROR,
                message: 'Please wait while we try again...'
            });
        }
    );
};
