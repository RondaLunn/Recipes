import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

import ImageSlider from './ImageSlider'
import AdminPanel from './AdminPanel'

import { handleUserFavorite, handleRemoveUserFavorite } from '../actions/users'
import { handleUpdateRecipe } from '../actions/recipes'

class Recipe extends Component {
    state = {
        favorite: false
    }

    handleFavorite = () => {
        const { dispatch, id, recipe, authedUser } = this.props
        this.setState({favorite: true})
        const favoritesList = recipe.recipeText.favorites.concat(authedUser.uid)
        const recipeText = recipe.recipeText
        const updatedRecipe = {
            ...recipe,
            recipeText: {
                ...recipeText,
                favorites: favoritesList
            }
        }
        dispatch(handleUpdateRecipe(updatedRecipe))
        .then(() => {
            dispatch(handleUserFavorite(id))
        }) 
        .catch(() => {
            this.setState({favorite: false})
        })
    }

    handleRemoveFavorite = () => {
        const { dispatch, id, recipe, authedUser } = this.props
        this.setState({favorite: false})
        const favoritesList = recipe.recipeText.favorites.filter(favorite => favorite !== authedUser.uid)
        const recipeText = recipe.recipeText
        const updatedRecipe = {
            ...recipe,
            recipeText: {
                ...recipeText,
                favorites: favoritesList
            }
        }
        dispatch(handleUpdateRecipe(updatedRecipe))
        .then(() => {
            dispatch(handleRemoveUserFavorite(id))
        })
        .catch(() => {
            this.setState({favorite: true})
        })
    }

    componentDidMount() {
        window.scrollTo(0,0)
        const { recipe, authedUser } = this.props
        if (authedUser && recipe){
            const favorite = recipe.recipeText.favorites.includes(authedUser.uid)
            this.setState({favorite})
        }
    }

    render() {
        const { authedUser, recipe, author, uid } = this.props
        const user = authedUser ? authedUser.uid : null
        const favorite = this.state.favorite

        if (recipe === null) {
            return <p className='center'>Error 404: This recipe does not exist</p>
        }

        const { recipeText } = recipe
        const images = recipeText.images

        return (
            <div className="recipe">
                <div className='recipe-title'><h2 className='center'>{recipeText.title}</h2>
                {authedUser && 
                <Fragment>{favorite ? <FavoriteIcon alt='Add to Favorites' onClick={this.handleRemoveFavorite} /> : <FavoriteBorderIcon onClick={this.handleFavorite}/>}</Fragment>
                }</div>
                <p className='center'>Added by <Link to={`/author/${uid}`}>{author}</Link></p>
                {user === uid && <AdminPanel id={this.props.id}/>}
                
                <div className='recipe-info'>
                    <div>
                        {images.length > 0 && <ImageSlider imageList={images}/>}
                    </div>
                    <div className='recipe-text'>
                        <p>Prep Time: {recipeText.prepTime}</p>
                        <p>Cook Time: {recipeText.cookTime}</p>
                        <p>Servings: {recipeText.servings}</p>

                        <h3>Ingredients:</h3>
                        <ul>
                        {recipeText.ingredients.map(ingredient => (
                            <li key={ingredient}>{ingredient}</li>
                        ))}
                        </ul>

                        <h3>Instructions:</h3>
                        <ol>
                        {recipeText.instructions.map(step => (
                            <li key={step}>{step}</li>
                        ))}
                        </ol>
                        
                        {recipeText.notes && <div><h3>Notes</h3><p>{recipeText.notes}</p></div>}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, recipes}, {id}) {
    const recipe = recipes[id] ? recipes[id] : null
    const author = recipe ? recipe.author : null
    const uid = recipe ? recipe.uid : null

    return {
        authedUser,
        recipe: recipe,
        author: author,
        uid: uid,
    }

}

export default withRouter(connect(mapStateToProps)(Recipe))