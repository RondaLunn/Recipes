import { saveRecipe } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { handleUserRecipe } from './users'

export const RECEIVE_RECIPES = 'RECEIVE_RECIPES'
export const ADD_RECIPE = 'ADD_RECIPE'

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

export function handleAddRecipe (recipeText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveRecipe({
            recipeText,
            author: authedUser
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