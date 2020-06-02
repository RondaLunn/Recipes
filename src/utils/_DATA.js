import axios from 'axios'

let users = {
  Ronda: {
    name: 'Ronda',
    recipes: []
  }
}

let recipes = {
  hgfeiuhgbg1: {
    id: 'hgfeiuhgbg1',
    timestamp: Date.now(),
    author: 'Ronda',
    uid: 'qgw2sACRQ9MIYT4Fpwm4K2lWgDn2',
    recipeText: {
      title: 'Test Recipe',
      category: 'dessert',
      prepTime: '10 min',
      cookTime: '20 min',
      servings: '4',
      ingredients: ['milk', 'flour', 'eggs', 'sugar'],
      instructions: ['mix ingredients', 'cook for 10 minutes', 'eat'],
      notes: "Don't overmix",
      tags: [],
      images: [
        {
          url: 'https://www.rondalunn.com/static/hearttree-86b5108f76f0f5d0b0ef724d64979c46.jpg',
          caption: 'My first recipe image',
        },
        {
          url: 'https://www.rondalunn.com/static/AI-character-9b7667968b1959189708583cce762208.jpg',
          caption: 'My second recipe image',
        },
        {
          url: 'https://www.rondalunn.com/static/imagine-yourself-0a4b761c9a43fe1d9544dfb7d86c1906.jpg',
          caption: 'My third recipe image',
        },
      ],
    },
    
  }
}

function generateID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {  
  const url = '/api/users.php'
  axios.get(url).then(response => response.data)
  .then(data => {
    Array.isArray(data) && data.forEach(user => {
      const { username, name, recipes }  = user
      let recipeList = recipes === '' ? [] : recipes.split(',')
      users = {
        ...users,
        [username]: {name, recipes: recipeList}
      }
    })
  })
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}


export function _getRecipes () {
  const url = '/api/recipes.php'
  axios.get(url).then(response => response.data)
  .then(data => {
    Array.isArray(data) && data.forEach(recipe => {
      const { timestamp, author, uid, title, category, servings, ingredients, instructions, notes, tags, images} = recipe
      let id = recipe.recipe_id
      let prepTime = recipe.prep_time
      let cookTime = recipe.cook_time
      let ingredientList = JSON.parse(ingredients)
      let instructionList = JSON.parse(instructions)
      let tagList = JSON.parse(tags)
      let imageList = JSON.parse(images)
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
        images: imageList
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

function formatRecipe (recipeText, author, uid) {
  return {
    id: generateID(),
    timestamp: Date.now(),
    author,
    uid,
    recipeText: recipeText,
  }
}

export function _saveUser (user) {
  return new Promise((res, rej) => {
    const username = user.username
    const name = user.name
    const recipes = user.recipes

    setTimeout(() => {
      users = {
        ...users,
        [username]: {
          name,
          recipes
        },
      }
      res(user)
    }, 1000)
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
      
      // users = {
      //   ...users,
      //   [author]: {
      //     ...users[author],
      //     recipes: users[author].recipes.concat([formattedRecipe.id])
      //   }
      // }

      res(formattedRecipe)
    }, 1000)
    })
  })
}

export function _deleteRecipe (recipeID) {
  return new Promise((res, rej) => {
    const url = `/api/recipes.php`
      axios.delete(url, {params: {id: recipeID}})
        .then((response) => {
          setTimeout(() => {
            delete recipes[recipeID]
            res(recipeID)
          }, 1000)
    })
  })
}