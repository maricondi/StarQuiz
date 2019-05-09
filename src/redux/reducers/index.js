import { combineReducers } from 'redux'
import { quiz } from '../reducers/quiz'
import { chars } from '../reducers/chars'

export const Reducers = combineReducers({
    quiz,
    chars
});