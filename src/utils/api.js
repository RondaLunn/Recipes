import {
    _getUser,
    _saveUser,
    _updateUser,
    _getRecipes,
    _saveRecipe,
    _updateRecipe,
    _deleteRecipe,
  } from './_DATA.js'

  export const categories = [
    'breakfast',
    'appetizers',
    'entrees',
    'sides',
    'desserts',
    'beverages',
    'miscellaneous'
  ]
  
  export function getInitialData () {
    return _getRecipes()
  }

  export function getUser (uid) {
    return _getUser(uid)
  }

  export function saveUser (user) {
    return _saveUser(user)
  }

  export function updateUser (user) {
    return _updateUser(user)
  }
  
  export function saveRecipe (recipe) {
    return _saveRecipe(recipe)
  }

  export function updateRecipe (recipe) {
    return _updateRecipe(recipe)
  }

  export function deleteRecipe (id) {
    return _deleteRecipe(id)
  }