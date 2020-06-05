import { getInitialData, getUser } from '../utils/api'
import { receiveUser } from '../actions/users'
import { receiveRecipes } from './recipes'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { setAuthedUser } from '../actions/authedUser'

import * as firebase from "firebase/app"
import "firebase/auth"

export function handleInitialData() {
    return dispatch => {
        dispatch(showLoading())
        return getInitialData()
            .then((recipes) => {
                dispatch(receiveRecipes(recipes))
                firebase.auth().onAuthStateChanged(user => {
                    if (user){
                        const name = user.displayName
                        const uid = user.uid
                        dispatch(setAuthedUser({name, uid}))
                        getUser(uid).then(currentUser => {
                            dispatch(receiveUser(currentUser))
                        })
                    }
                })
                dispatch(hideLoading())
            })
    }
}