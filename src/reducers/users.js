import { RECEIVE_USER, ADD_USER_UPDATE, ADD_USER } from '../actions/users'

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USER:
            return {
                ...state, 
                ...action.user
            }
        case ADD_USER_UPDATE:
            const { updatedUser } = action
            return updatedUser
        case ADD_USER:
            const { user } = action
            return user
        default:
            return state
    }
}