import { SAVE_CHAR, ADD_POINTS } from '../action-types/chars'

const saveChar = (value) => ({
    type: SAVE_CHAR,
    payload: value
});

const addPoints = (value) => ({
    type: ADD_POINTS,
    payload: value
});

export const dispatchSaveChar = (dispatch, value) => {
    dispatch(saveChar(value));
};

export const dispatchAddPoints = (dispatch, value) => {
    dispatch(addPoints(value));
};