import { START_QUIZ, STOP_QUIZ } from '../action-types/quiz'

const initialState = {
    statusQuiz: false
};

export const quiz = (state = initialState, action) => {
    switch (action.type) {
        case START_QUIZ:
            return {
                ...state,
                statusQuiz: true
            };
        case STOP_QUIZ:
            return {
                ...state,
                statusQuiz: false
            };
        default:
            return state;
    }
};