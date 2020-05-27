import {
    _getUsers,
    _saveUser,
    _getRecipes,
    _saveRecipe,
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

  export function saveUser (info) {
    return _saveUser(info)
  }