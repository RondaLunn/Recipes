# Recipes Project
Recipes is a React single page app which allows users to share recipes. Logged in users can view recipes from different users and are able to create, edit, and delete their own recipes. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The project uses [React Redux](https://react-redux.js.org/) for state management. 

The project uses [React Router](https://www.npmjs.com/package/react-router-dom) for page navigation. 

The project uses [Google Firebase Authentication](https://firebase.google.com/docs/auth) for user management. To set up Google Firebase Authentication, create or log into your [Google Developer Console](https://console.firebase.google.com/u/0/), create a project, and add authentication. Follow the directions in this [Setup Guide](https://firebase.google.com/docs/web/setup) to set up your Google Firebase Project. Create a file named api.config at the root of your project, and copy the config object information in the following format:
    "apiKey": "AIzaSyDOCAbC123dEf456GhI789jKl01-MnO",
    "authDomain": "myapp-project-123.firebaseapp.com",
    "databaseURL": "https://myapp-project-123.firebaseio.com",
    "projectId": "myapp-project-123",
    "storageBucket": "myapp-project-123.appspot.com",
    "messagingSenderId": "65211879809",
    "appId": "1:65211879909:web:3ae38ef1cdcb2e01fe5f0c",
    "measurementId": "G-8GSGZQ44ST"
The values listed above are example values. You will need to insert the values specific to your project. 

## File Structure
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
|   ├── favicon.ico # Recipes Icon, You may change if you wish.
│   ├── index.html # DO NOT MODIFY
│   ├── logo192.png # Recipes Icon, You may change if you wish. 192x192 px.
│   ├── logo512.png # Recipes Icon, You may change if you wish. 512x512 px.
│   ├── manifest.json # Web app manifest.
│   ├── robots.txt # Instructions for web crawlers.
|   └── api
|   |   ├── config.php # API for accessing the Google Firebase config information.
|   |   ├── recipes.php # API for accessing recipe information from the database.
|   |   └── users.php # API for accessing user information from the database.
└── src
    ├── actions
    |   ├── authedUser.js # This file contains the actions and action creators for the logged in    user.
    |   ├── recipes.js # This file contains the actions and action creators for the recipe data.
    |   ├── shared.js # This file contains the actions and action creators for getting the initial data for the app.
    |   └── users.js # This file contains the actions and action creators for the user data.
    ├── components
    |   ├── AdminPanel.js # This is the code for rendering the edit and delete options for user created recipes.
    |   ├── App.js # This is the root of the app.
    |   ├── Home.js # This is the code for rendering the main dashboard for the app.
    |   ├── ImageSlider.js # This is the code for rendering an image slider.
    |   ├── LineImage.js # This is the code for rendering previews for images added within the create/edit recipe form.
    |   ├── LineItem.js # This is the code for rendering items added to a list within the create/edit recipe form.
    |   ├── Login.js # This is the code for the login controller for the app.
    |   ├── Navigation.js # This is the code for the navigation bar.
    |   ├── NewRecipe.js # This is the code for the form to create a new recipe or edit an existing recipe.
    |   ├── NotFound.js # This is the code for rendering the error 404 page.
    |   ├── Recipe.js # This is the rendering code for each recipe.
    |   ├── RecipePage.js # This is the code for the page that shows an individual recipe.
    |   └── RecipeThumb.js # This is the rendering code for showing the preview thumbnail for a recipe on the main dashboard.
    ├── middleware
    |   ├── index.js # This is the main middleware file which combines the middleware to create the store.
    |   └── logger.js # This is the middleware for logging the actions performed and the new state. 
    ├── reducers
    |   ├── authedUser.js # This the reducer for information regarding the logged in user.
    |   ├── index.js # This is the main reducer file which combines the reducers to create the store.
    |   ├── recipes.js # This the reducer for recipe data.
    |   └── users.js # This the reducer for user data.
    ├── utils
    |   ├── _DATA.js # This is the file containing methods for updating the state and database.
    |   └── api.js # This is the file connecting the app to the API methods. 
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Data

There are two types of objects stored in our database:

* Users
* Recipes

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s name     |

### Recipes

Recipes include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| timestamp                  | String | The question’s creation/edit date and time |
| author        | String | The author’s name |
| uid        | String | The author’s unique identifier |
| recipeText | Object | The recipe data (The following attributes are properties of recipeText) |
| title | String | The title of the recipe |
| category | String | The meal category of the recipe |
| prepTime        | String | The time it takes to prep the recipe |
| cookTime        | String | The time it takes to cook the recipe |
| servings        | Int | The recipe's number of servings |
| ingredients        | Array | The list of ingredients used in the recipe |
| instructions        | Array | The list of steps to make the recipe |
| notes        | String | Additional notes for the recipe |
| tags        | Array | The list of tags that can be used for search/filtering |
| images        | Array | The list of images for the recipe (The images array contains objects with the url and caption properties below) |
| url        | String | The url where the image is hosted |
| caption        | String | The caption associated with the image and used for the alt property |

Your code will talk to the database via the following methods:

* `_getUsers()`
* `_getRecipes()`
* `_saveUser(user)`
* `_saveRecipe(recipeInfo)`
* `_updateRecipe(recipeInfo)`
* `_deleteRecipe(recipeID)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getRecipes()` Method

*Description*: Get all of the existing recipes from the database.  
*Return Value*: Object where the key is the recipe’s id and the value is the recipe object.

3) `_saveUser(user)` Method

*Description*: Save a new user to the database or update user information.  
*Parameters*:  Object that includes the following properties: `username`, `name`, and `recipes`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user |
| name | String | The name of the user |
| recipes | Array | The list of recipes created by the user |

*Return Value*:  The user object.

4) `_saveRecipe(recipeInfo)` Method

*Description*: Save a new recipe to the database.  
*Parameters*:  Object that includes the following properties: `recipeText`, `author`, and `uid`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| recipeText | Object | The recipe data |
| author | String | The name of the user who created the recipe (The authedUser) |
| uid | String | The unique identifier of the user who created the recipe (The authedUser) |

*Return Value*:  An object that has the following properties: `id`, `timestamp`, `author`, `uid`, `recipeText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the recipe that was posted |
| timestamp | String | The time when the recipe was created |
| author | String | The name of the user who posted the recipe |
| uid | String | The id of the user who posted the recipe |
| recipeText | Object | The object has the properties which contain the recipe's information |

5) `_updateRecipe(recipeInfo)` Method

*Description*: Update an existing recipe in the database.  
*Parameters*:  Object that includes the following properties: `recipeText`, `author`, `uid`, and `recipeID`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| recipeText | Object | The recipe data |
| author | String | The name of the user who created the recipe (The authedUser) |
| uid | String | The unique identifier of the user who created the recipe (The authedUser) |
| recipeID | String | The unique identifier of the recipe to edit |

*Return Value*:  An object that has the following properties: `id`, `timestamp`, `author`, `uid`, `recipeText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the recipe that was posted |
| timestamp | String | The time when the recipe was created |
| author | String | The name of the user who posted the recipe |
| uid | String | The id of the user who posted the recipe |
| recipeText | Object | The object has the properties which contain the recipe's information |

6) `_deleteRecipe(recipeID)` Method

*Description*: Delete a recipe from the database.
*Parameters*: A string representing the id of the recipe to delete.
*Return Value*:  A string representing the id of the deleted recipe.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
