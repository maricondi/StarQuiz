import { ADD_POINTS, CLEAR_POINTS } from '../action-types/points'

const initialState = {
    points: 0
};

export const points = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POINTS:
            return {
                ...state,
                points: state.points + action.payload
            };
        case CLEAR_POINTS:
            return {
                ...state,
                points: 0
            };
        default:
            return state;
    }
};