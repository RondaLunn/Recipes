import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import RecipeList from './RecipeList'

class Profile extends Component {
    state = {
        recipes: true,
        favorites: true
    }

    toggleRecipes = () => {
        const recipes = this.state.recipes ? false : true
        this.setState({recipes})
    }

    toggleFavorites = () => {
        const favorites = this.state.favorites ? false : true
        this.setState({favorites})
    }

    componentDidMount() {
        window.scrollTo(0,0)
    }

    render () {
        const { authedUser, recipes } = this.props
        const userRecipes = authedUser && authedUser.recipes ? authedUser.recipes.filter(recipe => recipes[recipe] !== undefined) : []
        const userFavorites = authedUser && authedUser.favorites ? authedUser.favorites.filter(favorite => recipes[favorite] !== undefined) : []
        return (
            <div className='recipe'>
                {authedUser  
                ? <div className="user">
                    <h2>Profile</h2>
                    <div className="user-info">
                        <p>{authedUser.name}</p>
                        <p>{authedUser.email}</p>
                    </div>
                    <div className='dashboard'>
                        <div className='list-toggle' onClick={this.toggleRecipes}>
                            <h3 className="center">My Recipes</h3>
                            {this.state.recipes ? <ExpandLess /> : <ExpandMore />}
                        </div>
                        {authedUser && <button style={{margin: '1rem auto'}}><Link to="/add" className='center'>Add New Recipe</Link></button>}
                        
                        {this.state.recipes &&
                        <Fragment>
                        {userRecipes.length > 0
                        ? <RecipeList recipeIds={userRecipes.sort((a,b) => recipes[b].timestamp - recipes[a].timestamp)} />
                        : <p className="center">You have not created any recipes yet.</p>}
                        </Fragment>}
                    </div>

                    <div className='dashboard'>
                        <div className='list-toggle' onClick={this.toggleFavorites}>
                            <h3 className="center">My Favorite Recipes</h3>
                            {this.state.favorites ? <ExpandLess /> : <ExpandMore />}
                        </div>
                        {this.state.favorites &&
                        <Fragment>
                        {userFavorites.length > 0
                        ? <RecipeList recipeIds={userFavorites.sort((a,b) => recipes[b].timestamp - recipes[a].timestamp)} favorites={true} />
                        : <p className="center">You have not added any recipes to your favorites.</p>}
                        </Fragment>}
                    </div>

                </div>
                
                : <p className="center">Please log in to view your profile.</p>
                }
            </div>
        )
    }
}

function mapStateToProps( { recipes, authedUser } ){
    return { 
        authedUser,
        recipes
    }
  }

export default withRouter(connect(mapStateToProps)(Profile))