import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import RecipeThumb from './RecipeThumb'

class Home extends Component {
    
    render () {
        const { recipeIds } = this.props

        return (
            <div className='recipe'>
                <Link to="/add" className='center'>Add New Recipe</Link>
                <ul className='dashboard'>
                    {recipeIds.map((id) => (
                        <li key={id}>
                            <RecipeThumb id={id} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps( { authedUser, users, recipes } ){
    const user = users[authedUser]
    return { 
        user,
        recipeIds: Object.keys(recipes)
        .sort((a,b) => recipes[b].timestamp - recipes[a].timestamp)
    }
  }

export default connect(mapStateToProps)(Home)