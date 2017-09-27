import { createAction, handleActions } from 'redux-actions';

export const SPEED_MEASUREMENTS = {
    KILOMETERS: 0,
    MILES: 1
};

const DEFAULT_STATE = { speedMeasurement: SPEED_MEASUREMENTS.KILOMETERS };

const TOGGLE = 'speedMeasurment/TOGGLE';
const SET = 'speedMeasurment/SET';

export default handleActions(
    {
        [SET]: (state, action) => Object.assign({}, state, { speedMeasurement: action.payload }),
        [TOGGLE]: state => {
            const { speedMeasurement } = state;
            const updated = speedMeasurement === SPEED_MEASUREMENTS.KILOMETERS ? SPEED_MEASUREMENTS.MILES : SPEED_MEASUREMENTS.KILOMETERS;
            
            return Object.assign({}, state, { speedMeasurement: updated });
        }
    },
    DEFAULT_STATE
);

export const setSpeedMeasurement = createAction(SET);
export const toggleSpeedMeasurement = createAction(TOGGLE);
