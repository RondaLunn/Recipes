import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { handleRemoveRecipe } from '../actions/recipes'

import NewRecipe from './NewRecipe'

class AdminPanel extends Component {

    state = {
        modal: null
    }

    deleteRecipe = () => {
        const { dispatch } = this.props
        dispatch(handleRemoveRecipe(this.props.id))
        .then(() => {
            this.props.history.replace({pathname: '/', toTop: true})
        })
    }

    editRecipe = () => {
        const { recipe } = this.props
        this.setState({
        modal: <NewRecipe recipeInfo={recipe} closeModal={this.cancelEdit}/>
        })
    }

    cancelEdit = () => {
        this.setState({
            modal: null
        })
    }
     
    render() {
        return (
            <div>
                <div className="recipe-admin">
                    {this.state.modal 
                    ? <button title="Close edit form" onClick={this.cancelEdit}>Close</button>
                    : <button title="Edit Recipe" onClick={this.editRecipe}>Edit Recipe</button>}
                    <button title="Delete Recipe" onClick={this.deleteRecipe}>Delete Recipe</button>
                </div>
                <div className="recipe-modal">
                    {this.state.modal}
                    {this.state.modal && <button title="Close edit form" onClick={this.cancelEdit} className="btn">Cancel</button>}
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
        uid: uid
    }
}

export default withRouter(connect(mapStateToProps)(AdminPanel))