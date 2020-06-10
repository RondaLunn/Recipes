import axios from 'axios'

let users = {}

let recipes = {}

function generateID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUser (uid) {  
  const url = '/api/users.php'
  axios.get(url, {params: {uid}})
  .then(response => response.data)
  .then(data => {
    Array.isArray(data) && data.forEach(userInfo => {
      const { uid, name, email, recipes, favorites, cookbooks, activity }  = userInfo
      users = {
        uid: uid, 
        name, 
        email,
        recipes: JSON.parse(recipes), 
        favorites: JSON.parse(favorites),
        cookbooks: JSON.parse(cookbooks),
        activity: JSON.parse(activity)
      }
    })
  })
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _saveUser (newUser) {
  return new Promise((res, rej) => {
    const uid = newUser.uid
    const name = newUser.name
    const email = newUser.email
    const recipes = newUser.recipes
    const favorites = newUser.favorites
    const cookbooks = newUser.cookbooks
    const activity = newUser.activity

    let formData = new FormData()
    formData.append('uid', uid)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('recipes', JSON.stringify(recipes))
    formData.append('favorites', JSON.stringify(favorites))
    formData.append('cookbooks', JSON.stringify(cookbooks))
    formData.append('activity', JSON.stringify(activity))
    axios({
      method: 'post',
      url: '/api/users.php',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data'}}
    })
    .then(() => {
      setTimeout(() => {
      users = {
        uid, 
        name, 
        email,
        recipes,
        favorites,
        cookbooks, 
        activity
      }
      res(users)
    }, 1000)
    })
  })
}

export function _updateUser (user) {
  return new Promise((res, rej) => {
    const { uid, name, email, recipes, favorites, cookbooks, activity } = user
    let formData = new FormData()
    formData.append('uid', uid)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('recipes', JSON.stringify(recipes))
    formData.append('favorites', JSON.stringify(favorites))
    formData.append('cookbooks', JSON.stringify(cookbooks))
    formData.append('activity', JSON.stringify(activity))
    formData.append('update', 1)
    axios({
      method: 'post',
      url: '/api/users.php',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data'}}
    })
    .then(() => {
      setTimeout(() => {
        users = {
          uid, 
          name, 
          email,
          recipes,
          favorites,
          cookbooks,
          activity
        }
        res(users)
      }, 1000)
    })
  })
}

function formatRecipe (recipeText, author, uid, recipeID=generateID()) {
  return {
    id: recipeID,
    timestamp: Date.now(),
    author,
    uid,
    recipeText: recipeText,
  }
}

export function _getRecipes () {
  const url = '/api/recipes.php'
  axios.get(url).then(response => response.data)
  .then(data => {
    Array.isArray(data) && data.forEach(recipe => {
      const { timestamp, author, uid, title, category, servings, ingredients, instructions, notes, tags, images, cookbooks, favorites, ratings, comments} = recipe
      let id = recipe.recipe_id
      let prepTime = recipe.prep_time
      let cookTime = recipe.cook_time
      let ingredientList = JSON.parse(ingredients)
      let instructionList = JSON.parse(instructions)
      let tagList = JSON.parse(tags)
      let imageList = JSON.parse(images)
      let cookbookList = JSON.parse(cookbooks)
      let favoriteList = JSON.parse(favorites)
      let ratingList = JSON.parse(ratings)
      let commentList = JSON.parse(comments)
      let recipeText = {
        title, 
        category, 
        prepTime, 
        cookTime, 
        servings, 
        ingredients: ingredientList, 
        instructions: instructionList, 
        notes,
        tags: tagList, 
        images: imageList,
        cookbooks: cookbookList,
        favorites: favoriteList,
        ratings: ratingList,
        comments: commentList
      }
      recipes = {
        ...recipes,
        [id]: {id, timestamp, author, uid, recipeText}
      }
    })
  })
  return new Promise((res, rej) => {
    setTimeout(() => res({...recipes}), 1000)
  })
}

export function _saveRecipe (recipeInfo) {
  return new Promise((res, rej) => {
    const  { recipeText, author, uid } = recipeInfo
    const formattedRecipe = formatRecipe(recipeText, author, uid)

    let formData = new FormData()
    formData.append('recipe_id', formattedRecipe.id)
    formData.append('timestamp', formattedRecipe.timestamp)
    formData.append('author', author)
    formData.append('uid', uid)
    formData.append('title', recipeText.title)
    formData.append('category', recipeText.category)
    formData.append('prep_time', recipeText.prepTime)
    formData.append('cook_time', recipeText.cookTime)
    formData.append('servings', recipeText.servings)
    formData.append('ingredients', JSON.stringify(recipeText.ingredients))
    formData.append('instructions', JSON.stringify(recipeText.instructions))
    formData.append('notes', recipeText.notes)
    formData.append('tags', JSON.stringify(recipeText.tags))
    formData.append('images', JSON.stringify(recipeText.images))
    formData.append('cookbooks', JSON.stringify(recipeText.cookbooks))
    formData.append('favorites', JSON.stringify(recipeText.favorites))
    formData.append('ratings', JSON.stringify(recipeText.ratings))
    formData.append('comments', JSON.stringify(recipeText.comments))
    axios({
      method: 'post',
      url: '/api/recipes.php',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data'}}
    })
    .then(() => {
      setTimeout(() => {
      recipes = {
        ...recipes,
        [formattedRecipe.id]: formattedRecipe
      }
      
      res(formattedRecipe)
    }, 1000)
    })
  })
}

export function _updateRecipe (recipeInfo) {
  return new Promise((res, rej) => {
    const  { recipeText, author, uid, recipeID } = recipeInfo
    const formattedRecipe = formatRecipe(recipeText, author, uid, recipeID)

    let formData = new FormData()
    formData.append('recipe_id', recipeID)
    formData.append('timestamp', formattedRecipe.timestamp)
    formData.append('author', author)
    formData.append('uid', uid)
    formData.append('title', recipeText.title)
    formData.append('category', recipeText.category)
    formData.append('prep_time', recipeText.prepTime)
    formData.append('cook_time', recipeText.cookTime)
    formData.append('servings', recipeText.servings)
    formData.append('ingredients', JSON.stringify(recipeText.ingredients))
    formData.append('instructions', JSON.stringify(recipeText.instructions))
    formData.append('notes', recipeText.notes)
    formData.append('tags', JSON.stringify(recipeText.tags))
    formData.append('images', JSON.stringify(recipeText.images))
    formData.append('cookbooks', JSON.stringify(recipeText.cookbooks))
    formData.append('favorites', JSON.stringify(recipeText.favorites))
    formData.append('ratings', JSON.stringify(recipeText.ratings))
    formData.append('comments', JSON.stringify(recipeText.comments))
    formData.append('update', 1)
    axios({
      method: 'post',
      url: '/api/recipes.php',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data'}}
    })
    .then(() => {
      setTimeout(() => {
      recipes = {
        ...recipes,
        [recipeID]: formattedRecipe
      }
      res(formattedRecipe)
    }, 1000)
    })
  })
}

export function _deleteRecipe (recipeID) {
  return new Promise((res, rej) => {
    const url = `/api/recipes.php`

    axios.delete(url, {params: {id: recipeID}})
    .then(() => {
      setTimeout(() => {
        delete recipes[recipeID]

        res(recipeID)
      }, 1000)
    })
  })
}