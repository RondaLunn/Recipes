import { RECEIVE_USERS, SAVE_USER_RECIPE, SAVE_USER } from '../actions/users'

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state, 
                ...action.users
            }
        case SAVE_USER_RECIPE:
            const { author, recipeId } = action
            return {
                ...state,
                [author]: {
                    ...state[author],
                    recipes: state[author].recipes.concat([recipeId])
                  }
            }
        case SAVE_USER:
            const { user } = action
            const username = user.username
            const name = user.name
            const recipes = user.recipes
            return {
                ...state, 
                [username]: {
                    name,
                    recipes
                }
            }
        default:
            return state
    }
}