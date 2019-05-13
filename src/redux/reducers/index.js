import { combineReducers } from 'redux'
import { quiz } from '../reducers/quiz'
import { chars } from '../reducers/chars'
import { points } from '../reducers/points'

export const Reducers = combineReducers({
    quiz,
    chars,
    points
});