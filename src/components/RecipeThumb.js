import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class RecipeThumb extends Component {

    render() {
        const { recipe, author, id } = this.props

        const { recipeText } = recipe
        const images = recipeText.images

        return (
            <Link className="recipe-thumb" to={`/recipes/${id}`}>
                {images.length > 0 
                ? <img src={images[0].url} alt={recipeText.title} className='recipe-image-thumb'/>
                : <img src={require('../logo192.png')} alt={recipeText.title} className='recipe-image-thumb'/>
                }

                <div className='recipe-thumb-info'>
                    <h3>{recipeText.title}</h3>
                    <p>Added by {author.name}</p>
                </div>
            </Link>
        )
    }
}

function mapStateToProps ({authedUser, recipes, users}, {id}) {
    const recipe = recipes[id] ? recipes[id] : null
    const author = recipe ? users[recipe.author] : null

    return {
        authedUser,
        recipe: recipe,
        author: author
    }

}

export default withRouter(connect(mapStateToProps)(RecipeThumb))