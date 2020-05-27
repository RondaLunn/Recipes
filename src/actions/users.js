export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_USER_RECIPE = 'SAVE_USER_RECIPE'
export const SAVE_USER = 'SAVE_USER'

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

function saveUserRecipe (author, recipeId) {
    return {
        type: SAVE_USER_RECIPE,
        author,
        recipeId
    }
}

function saveUser (user) {
    return {
        type: SAVE_USER,
        user
    }
}

export function handleUserRecipe (id) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(saveUserRecipe(authedUser, id))
    }
}

export function handleNewUser (user) {
    return (dispatch) => {
        dispatch(saveUser(user))
    }
}