import {
    _getUsers,
    _saveUser,
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
    return Promise.all([
      _getUsers(),
      _getRecipes(),
    ]).then(([users, recipes]) => ({
      users,
      recipes,
    }))
  }
  
  export function saveRecipe (info) {
    return _saveRecipe(info)
  }

  export function updateRecipe (info) {
    return _updateRecipe(info)
  }

  export function saveUser (info) {
    return _saveUser(info)
  }

  export function deleteRecipe (id) {
    return _deleteRecipe(id)
  }