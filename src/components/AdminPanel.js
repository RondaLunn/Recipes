import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { handleRemoveRecipe } from '../actions/recipes'

class AdminPanel extends Component {
    deleteRecipe = () => {
        const { dispatch } = this.props
        dispatch(handleRemoveRecipe(this.props.id))
        this.props.history.push('/')  
    }

    editRecipe = () => {

    }
     
    render() {
        return (
            <div className="recipe-admin">
                <button onClick={this.editRecipe}>Edit Recipe</button>
                <button onClick={this.deleteRecipe}>Delete Recipe</button>
            </div>
        )
    }
}

export default withRouter(connect()(AdminPanel))