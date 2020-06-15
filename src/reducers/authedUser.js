import { SET_AUTHED_USER } from '../actions/authedUser'
import { RECEIVE_USER, ADD_USER_UPDATE, ADD_USER } from '../actions/users'

export default function authedUser (state=null, action) {
    switch(action.type) {
        case SET_AUTHED_USER:
            return action.user
        case RECEIVE_USER:
            return action.currentUser
        case ADD_USER_UPDATE:
            return action.updatedUser
        case ADD_USER:
            return action.newUser
        default:
            return state
    }
}