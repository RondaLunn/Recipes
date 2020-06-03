import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import RecipeThumb from './RecipeThumb'

class Home extends Component {
    componentDidMount() {
        if(this.props.location) {
            if(this.props.location.toTop){
                window.scrollTo(0,0)
            }
        }
    }

    render () {
        const { recipeIds } = this.props

        return (
            <div className='recipe'>
                <button style={{margin: 'auto'}}><Link to="/add" className='center'>Add New Recipe</Link></button>
                <ul className='dashboard'>
                    {recipeIds.map(id => (
                        <li key={id}>
                            <RecipeThumb id={id} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps( { recipes } ){
    return { 
        recipeIds: Object.keys(recipes)
        .sort((a,b) => recipes[b].timestamp - recipes[a].timestamp)
    }
  }

export default withRouter(connect(mapStateToProps)(Home))