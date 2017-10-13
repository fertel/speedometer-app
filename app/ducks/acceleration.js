import { createAction, handleActions } from 'redux-actions';

import { Accelerometer } from 'expo';
import { convertAccelerationToSpeed } from '../util/convert-acceleration-to-speed';
import { updateSpeed } from './speed';

const DEFAULT_STATE = {
    acceleration: { x: 0, y: 0, z: 0 },
    accelerationSpeed: 0
};

const SUCCESS = 'acceleration/SUCCESS';

export default handleActions({
    [SUCCESS]: (state, action) => {
        const acceleration = action.payload;
        const accelerationSpeed = convertAccelerationToSpeed(acceleration);

        return Object.assign({}, state, {
            acceleration,
            accelerationSpeed
        });
    }
}, DEFAULT_STATE);

export const accelerationSuccess = createAction(SUCCESS);

export const listenToAcceleration = () => dispatch => {
    Accelerometer.setUpdateInterval(100);

    return Accelerometer.addListener(success => {
        dispatch(accelerationSuccess(success));
        return dispatch(updateSpeed());
    });
};
