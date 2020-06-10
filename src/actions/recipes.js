import { saveRecipe, updateRecipe, deleteRecipe } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { handleUserRecipe, handleRemoveUserRecipe } from './users'

export const RECEIVE_RECIPES = 'RECEIVE_RECIPES'
export const ADD_RECIPE = 'ADD_RECIPE'
export const REMOVE_RECIPE = 'REMOVE_RECIPE'

export function receiveRecipes (recipes) {
    return {
        type: RECEIVE_RECIPES,
        recipes,
    }
}

function addRecipe (recipe) {
    return {
        type: ADD_RECIPE,
        recipe
    }
}

function removeRecipe (id) {
    return {
        type: REMOVE_RECIPE,
        id
    }
}

export function handleAddRecipe (recipeText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveRecipe({
            recipeText,
            author: authedUser.name,
            uid: authedUser.uid
        })
        .then(recipe => {
            dispatch(addRecipe(recipe))
            dispatch(handleUserRecipe(recipe.id))
        })
        .then(() => {
            dispatch(hideLoading())
        })
        .catch(() => {
            alert('There was an error saving your recipe. Please try again.')
        })
    }
}

export function handleUpdateRecipe (recipeText, recipeID) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return updateRecipe({
            recipeText,
            author: authedUser.name,
            uid: authedUser.uid,
            recipeID 
        })
        .then(recipe => {
            dispatch(addRecipe(recipe))
        })
        .then(() => {
            dispatch(hideLoading())
        })
        .catch(() => {
            alert('There was an error saving your recipe. Please try again.')
        })
    }
}

export function handleRemoveRecipe (recipeID) {
    return (dispatch) => {
        dispatch(showLoading())
        return deleteRecipe(recipeID)
        .then(() => {
            dispatch(removeRecipe(recipeID))
            dispatch(handleRemoveUserRecipe(recipeID))
        })
        .then(() => {
            dispatch(hideLoading())
        })
        .catch(() => {
            alert('There was an error deleting your recipe. Please try again.')
        })
    }
}