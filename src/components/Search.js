import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

class Search extends Component {
    state = {
        query: '',
        search: false
    }

    handleChange = (e) => {
        const query = e.target.value
        this.setState({query})
        if (query === '') {
            this.props.search(this.props.recipeIds)
            this.setState({search: false})
        }
    }

    handleSearch = () => {
        const { query } = this.state
        const { recipes, recipeIds } = this.props

        if (query) {
            const recipeList = recipeIds.filter(recipe => {
                if(recipes[recipe].recipeText.title.toLowerCase().includes(query.toLowerCase())){
                    return true
                }
                if(recipes[recipe].recipeText.ingredients.includes(query.toLowerCase())){
                    return true
                }
                if(recipes[recipe].recipeText.ingredients.some(ingredient => {
                    if (ingredient.toLowerCase().includes(query.toLowerCase())) {
                        return true
                    } else {
                        return false
                    }
                    })
                ){
                    return true
                }
                if(recipes[recipe].recipeText.tags.includes(query.toLowerCase())){
                    return true
                }
                if(recipes[recipe].recipeText.tags.some(tag => {
                    if (tag.toLowerCase().includes(query.toLowerCase())) {
                        return true
                    } else {
                        return false
                    }
                    })
                ){
                    return true
                }
                if(recipes[recipe].author.toLowerCase().includes(query.toLowerCase())){
                    return true
                }
                return false
            })
            this.props.search(recipeList)
            this.setState({search: true})
        } else {
            this.props.search(recipeIds)
        }
    }

    cancelSearch = () => {
        this.props.search(this.props.recipeIds)
        this.setState({query: '', search: false})
    }

    keyPressed = (e) => {
        if (e.key === 'Enter') {
            this.handleSearch()
        }
    }

    render() {
        return (
            <div className='search-bar'>
                <label>
                <input title='Query' placeholder='Search' className='search-input' onChange={this.handleChange} onKeyPress={this.keyPressed} name='query' value={this.state.query}/>
                </label>
                <button title='Search' onClick={this.handleSearch}><SearchIcon/></button>
                {this.state.search && <button title='Clear search query' onClick={this.cancelSearch}><CloseIcon/></button>}
            </div>
        )
    }
}

function mapStateToProps( { recipes, authedUser } ){
    return { 
        authedUser,
        recipeIds: Object.keys(recipes),
        recipes,
    }
  }

export default withRouter(connect(mapStateToProps)(Search))