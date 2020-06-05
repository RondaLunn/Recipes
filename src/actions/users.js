import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { saveUser, updateUser } from '../utils/api'

export const RECEIVE_USER = 'RECEIVE_USER'
export const ADD_USER_UPDATE = 'ADD_USER_UPDATE'
export const ADD_USER = 'ADD_USER'

export function receiveUser (user) {
    return {
        type: RECEIVE_USER,
        user,
    }
}

function addUserUpdate (updatedUser) {
    return {
        type: ADD_USER_UPDATE,
        updatedUser
    }
}

function addUser (user) {
    return {
        type: ADD_USER,
        user
    }
}

export function handleUserRecipe (id) {
    return (dispatch, getState) => {
        const { users } = getState()
        const userRecipes = users.recipes.concat([id])
        updateUser({
            ...users,
            recipes: userRecipes
          }).then(updatedUser => {
            dispatch(addUserUpdate(updatedUser))
          })
    }
}

export function handleNewUser (user) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveUser(user)
        .then(() => {
            dispatch(addUser(user))
        })
        .then(() => {
            dispatch(hideLoading())
        })
        .catch(() => {
            alert('There was an error saving your user data. Please try again.')
        })
    }
}