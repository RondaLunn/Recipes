import { RECEIVE_USER, ADD_USER_UPDATE, ADD_USER } from '../actions/users'

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USER:
            return action.user
        case ADD_USER_UPDATE:
            return action.updatedUser
        case ADD_USER:
            return action.newUser
        default:
            return state
    }
}