import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import * as firebase from "firebase/app"
import axios from 'axios'
import "firebase/auth"

import { handleInitialData } from '../actions/shared'
import { handleRemoveUserRecipe, handleRemoveUserFavorite } from '../actions/users'

import LoadingBar from 'react-redux-loading-bar'

import Header from './Header'
import Login from './Login'
import Home from './Home'
import NewRecipe from './NewRecipe'
import RecipePage from './RecipePage'
import NotFound from './NotFound'

import '../App.css'
import Profile from './Profile'

class App extends Component {
  componentDidMount() {      
    const url = '/api/config.php'
    axios.get(url).then(response => response.data).then(data => {
      const firebaseConfig = data
      
      firebase.initializeApp(firebaseConfig)

      const { dispatch } = this.props
      dispatch(handleInitialData())
      .then(() => {
        setTimeout(() => {
          this.props.authedUser.recipes.map(recipe => {
            if (this.props.recipes[recipe] === undefined){
              dispatch(handleRemoveUserRecipe(recipe))
            }
          })
          this.props.authedUser.favorites.map(recipe => {
            if (this.props.recipes[recipe] === undefined){
              dispatch(handleRemoveUserFavorite(recipe))
            }
          })
        }, 1000)
        
      })
    })
  }

  render() {
    return (
      <BrowserRouter >
        <Fragment>
          <LoadingBar style={{ backgroundColor: 'blue', height: '5px', zIndex: 12, position: 'absolute', top: 0}} />

          <Header />

          <div className="container">

            <Login />

            {!this.props.loading && <Fragment>
                <Switch>
                  <Route exact path='/' render ={() => (
                      <Home />
                      )} />

                  <Route path='/add' render ={() => (
                    <NewRecipe />
                  )} /> 

                  <Route path='/profile' render ={() => (
                    <Profile />
                  )} />

                <Route path='/recipes/:recipe_id' component={RecipePage}/>
                <Route component={NotFound} />
              </Switch>
            </Fragment>}
          </div>
        </Fragment>
      </BrowserRouter>
    )
  }
}

function mapStateToProps ({ authedUser, recipes }) {
  return {
    loading: Object.keys(recipes).length === 0,
    loggedin: authedUser !== null,
    authedUser,
    recipes
  }
}

export default connect(mapStateToProps)(App);