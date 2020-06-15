import { combineReducers } from 'redux'
import recipes from './recipes'
import authedUser from './authedUser'
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
    authedUser,
    recipes,
    loadingBar: loadingBarReducer
})