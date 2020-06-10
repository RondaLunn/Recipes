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
        const { authedUser, user } = this.props
        const userRecipes = user.recipes
        const userFavorites = user.favorites
        return (
            <div className='recipe'>
                {Object.keys(user).length > 0  
                ? <div className="user">
                    <h2>Profile</h2>
                    <div className="user-info">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                    <div className='dashboard'>
                        <div className='list-toggle'>
                            <h3 className="center">My Recipes</h3>
                            <button onClick={this.toggleRecipes}>{this.state.recipes ? <ExpandLess /> : <ExpandMore />}</button>
                        </div>
                        {authedUser && <button style={{margin: '1rem auto'}}><Link to="/add" className='center'>Add New Recipe</Link></button>}
                        
                        {this.state.recipes &&
                        <Fragment>
                        {userRecipes.length > 0
                        ? <RecipeList recipeIds={userRecipes} />
                        : <p className="center">You have not created any recipes yet.</p>}
                        </Fragment>}
                    </div>

                    <div className='dashboard'>
                        <div className='list-toggle'>
                            <h3 className="center">My Favorite Recipes</h3>
                            <button onClick={this.toggleFavorites}>{this.state.favorites ? <ExpandLess /> : <ExpandMore />}</button>
                        </div>
                        {this.state.favorites &&
                        <Fragment>
                        {userFavorites.length > 0
                        ? <RecipeList recipeIds={userFavorites} favorites={true} />
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

function mapStateToProps( { recipes, authedUser, users } ){
    return { 
        authedUser,
        user: users,
        recipeIds: Object.keys(recipes)
        .sort((a,b) => recipes[b].timestamp - recipes[a].timestamp)
    }
  }

export default withRouter(connect(mapStateToProps)(Profile))