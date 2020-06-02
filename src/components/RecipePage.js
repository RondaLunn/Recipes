import React, { Component } from 'react'
import { connect } from 'react-redux'
import Recipe from './Recipe'

class RecipePage extends Component {
    render() {
        const { recipe_id } = this.props

        return (
            <Recipe id={recipe_id} />
        )
    }
}

function mapStateToProps ({ recipes }, props) {
    const { recipe_id } = props.match.params

    return {
        recipe_id, 
        recipeIds: Object.keys(recipes),
    }
}

export default connect(mapStateToProps)(RecipePage)