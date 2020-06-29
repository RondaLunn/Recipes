import React from 'react'
import { connect } from 'react-redux'

import RecipeList from './RecipeList'

const Author = (props) => {
    return (
        <div>
            <h3 className='center'>{`${props.author}'s Recipes`}</h3>
            <RecipeList recipeIds={props.recipeIds} />
        </div>
    )
}

function mapStateToProps( { recipes }, props ){
    const { author_id } = props.match.params
    const recipeIds = Object.keys(recipes).filter(recipe => recipes[recipe].uid === author_id)
    const author = recipes[recipeIds[0]].author
    return { 
        recipeIds,
        recipes,
        author_id,
        author
    }
  }

export default connect(mapStateToProps)(Author)