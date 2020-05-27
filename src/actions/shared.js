import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveRecipes } from './recipes'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const AUTHED_ID = 'Ronda'

export function handleInitialData() {
    return dispatch => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, recipes }) => {
            dispatch(receiveUsers(users))
            dispatch(receiveRecipes(recipes))
            dispatch(hideLoading())
            })
    }
}