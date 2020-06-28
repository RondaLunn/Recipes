import React from 'react'
import { connect } from 'react-redux'

import RecipeList from './RecipeList'

const Author = (props) => {
    return (
        <div>
            <h3 className='center'>{`${props.author.replace(/_/g, " ")}'s Recipes`}</h3>
            <RecipeList recipeIds={props.recipeIds ? props.recipeIds.filter(recipe => props.recipes[recipe].author.replace(/[\W_]+/g, '_') === props.author) : []} />
        </div>
    )
}

function mapStateToProps( { recipes }, props ){
    const { author } = props.match.params
    return { 
        recipeIds: Object.keys(recipes),
        recipes,
        author
    }
  }

export default connect(mapStateToProps)(Author)