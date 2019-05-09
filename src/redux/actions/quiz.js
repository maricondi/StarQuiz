import { START_QUIZ, STOP_QUIZ } from '../action-types/quiz'

const startQuiz = () => ({
    type: START_QUIZ
});

const stopQuiz = () => ({
    type: STOP_QUIZ
});

export const dispatchStartQuiz = (dispatch) => {
    dispatch(startQuiz());
};

export const dispatchStopQuiz = (dispatch) => {
    dispatch(stopQuiz());
};