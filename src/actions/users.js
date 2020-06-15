import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { saveUser, updateUser } from '../utils/api'

export const RECEIVE_USER = 'RECEIVE_USER'
export const ADD_USER_UPDATE = 'ADD_USER_UPDATE'
export const ADD_USER = 'ADD_USER'

export function receiveUser (currentUser) {
    return {
        type: RECEIVE_USER,
        currentUser,
    }
}

function addUserUpdate (updatedUser) {
    return {
        type: ADD_USER_UPDATE,
        updatedUser
    }
}

function addUser (newUser) {
    return {
        type: ADD_USER,
        newUser
    }
}

export function handleUserRecipe (id) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const userRecipes = authedUser.recipes.concat([id])
        updateUser({
            ...authedUser,
            recipes: userRecipes
          }).then(updatedUser => {
            dispatch(addUserUpdate(updatedUser))
          })
    }
}

export function handleUserFavorite (id) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const userFavorites = authedUser.favorites.concat([id])
        updateUser({
            ...authedUser,
            favorites: userFavorites
          }).then(updatedUser => {
            dispatch(addUserUpdate(updatedUser))
          })
    }
}

export function handleRemoveUserRecipe (id) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const userRecipes = authedUser.recipes.filter(recipe => recipe !== id)
        updateUser({
            ...authedUser,
            recipes: userRecipes
          }).then(updatedUser => {
            dispatch(addUserUpdate(updatedUser))
          })
          .catch(() => {
              alert('There was an error removing your recipe.')
          })
    }
}

export function handleRemoveUserFavorite (id) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const userFavorites = authedUser.favorites.filter(favorite => favorite !== id)
        updateUser({
            ...authedUser,
            favorites: userFavorites
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