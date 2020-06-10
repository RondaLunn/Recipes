import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import * as firebase from "firebase/app"
import axios from 'axios'
import "firebase/auth"

import { handleInitialData } from '../actions/shared'

import LoadingBar from 'react-redux-loading-bar'

import Header from './Header'
import Navigation from './Navigation'
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
    })
  }

  render() {
    return (
      <BrowserRouter >
        <Fragment>
          <LoadingBar style={{ backgroundColor: 'blue', height: '5px' }} />

          <Header />

          <Navigation />          

          {!this.props.loggedin && <Login />}

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
        </Fragment>
      </BrowserRouter>
    )
  }
}

function mapStateToProps ({ authedUser, recipes }) {
  return {
    loading: Object.keys(recipes).length === 0,
    loggedin: authedUser !== null
  }
}

export default connect(mapStateToProps)(App);