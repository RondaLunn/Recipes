import { combineReducers } from 'redux'
import recipes from './recipes'
import users from './users'
import authedUser from './authedUser'
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
    authedUser,
    users, 
    recipes,
    loadingBar: loadingBarReducer
})