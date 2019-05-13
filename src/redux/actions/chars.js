import { SAVE_CHAR } from '../action-types/chars'

const saveChar = (value) => ({
    type: SAVE_CHAR,
    payload: value
});

export const dispatchSaveChar = (dispatch, value) => {
    dispatch(saveChar(value));
};
