import { createAction, handleActions } from 'redux-actions';

const DEFAULT_STATE = { timerSecondsElapsed: 0 };
let timer = null;

const UPDATE = 'timer/UPDATE';
const RESET = 'timer/RESET';

export default handleActions(
    {
        [RESET]: state => Object.assign({}, state, { timerSecondsElapsed: DEFAULT_STATE.timerSecondsElapsed }),
        [UPDATE]: state => {
            const { timerSecondsElapsed } = state;

            return Object.assign({}, state, { timerSecondsElapsed: timerSecondsElapsed + 1 });
        }
    },
    DEFAULT_STATE
);

export const timerUpdate = createAction(UPDATE);
export const timerReset = createAction(RESET);

export const startTimer = () => dispatch => {
    timer = setInterval(() => dispatch(timerUpdate()), 1000);
};
