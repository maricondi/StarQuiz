import { SAVE_CHAR, ADD_POINTS } from '../action-types/chars'

const initialState = {
    character: [],
    points: 0
};

export const chars = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_CHAR:
            return {
                ...state,
                character: action.payload
            };
        case ADD_POINTS:
            return {
                ...state,
                points: state.points + action.payload
            };
        default:
            return state;
    }
};