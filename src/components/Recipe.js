import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ImageSlider from './ImageSlider'

class Recipe extends Component {

    render() {
        const { recipe, author } = this.props

        if (recipe === null) {
            return <p className='center'>Error 404: This recipe does not exist</p>
        }

        const { recipeText } = recipe
        const images = recipeText.images

        return (
            <div className="recipe">
                <h3 className='center'>{recipeText.title}</h3>
                <p className='center'>Added by {author.name}</p>
                
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

function mapStateToProps ({authedUser, recipes, users}, {id}) {
    const recipe = recipes[id] ? recipes[id] : null
    const author = recipe ? users[recipe.author] : null

    return {
        authedUser,
        recipe: recipe,
        author: author
    }

}

export default withRouter(connect(mapStateToProps)(Recipe))