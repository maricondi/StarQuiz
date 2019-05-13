import { ADD_POINTS, CLEAR_POINTS } from '../action-types/points'

const addPoints = (value) => ({
    type: ADD_POINTS,
    payload: value
});

const clearPoints = () => ({
    type: CLEAR_POINTS,
});

export const dispatchAddPoints = (dispatch, value) => {
    dispatch(addPoints(value));
};

export const dispatchClearPoints = (dispatch) => {
    dispatch(clearPoints());
};