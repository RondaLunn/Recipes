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
                ? <img src={images[0].url} alt={recipeText.title} loading='lazy' width='120px' height='120px' className='recipe-image-thumb'/>
                : <img src={require('../logo192.png')} alt={recipeText.title} loading='lazy' width='120px' height='120px' className='recipe-image-thumb'/>
                }

                <div className='recipe-thumb-info'>
                    <h3>{recipeText.title}</h3>
                    <p>Added by {author}</p>
                </div>
            </Link>
        )
    }
}

function mapStateToProps ({recipes}, {id}) {
    const recipe = recipes[id] ? recipes[id] : null
    const author = recipe ? recipe.author : null

    return {
        recipe: recipe,
        author: author
    }

}

export default withRouter(connect(mapStateToProps)(RecipeThumb))