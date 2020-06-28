import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import RecipeList from './RecipeList'

class Home extends Component {

    componentDidMount() {
        const { location } = this.props

        if(location) {
            if(location.toTop){
                window.scrollTo(0,0)
            }
        }
    }

    render () {
        const {authedUser} = this.props
        return (
            <div className='recipe'>
                {authedUser && <button title="Add New Recipe" style={{margin: '1rem auto'}}><Link to="/add" className='center'>Add New Recipe</Link></button>}
                <RecipeList recipeIds = {this.props.recipeIds}/>
            </div>
        )
    }
}

function mapStateToProps( { authedUser, recipes } ){
    return { 
        authedUser,
        recipeIds: Object.keys(recipes)
        .sort((a,b) => parseInt(recipes[b].timestamp, 10) - parseInt(recipes[a].timestamp), 10)
    }
  }

export default withRouter(connect(mapStateToProps)(Home))