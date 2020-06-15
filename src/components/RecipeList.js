import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { categories } from '../utils/api'

import RecipeThumb from './RecipeThumb'

class RecipeList extends Component {
    state = {
        recipeList: this.props.recipeIds,
        category: 'all', 
        sort: 'none',
        favorites: false
    }

    handleAZSort = () => {
        const { recipes } = this.props
        let recipeList = this.state.recipeList.sort((a,b) => {
            let titleA = recipes[a].recipeText.title.toLowerCase()
            let titleB = recipes[b].recipeText.title.toLowerCase()
            return titleA > titleB ? 1 : -1
        })
        this.setState({recipeList, sort: 'az'})
    }

    handleRecentSort = () => {
        const { recipes } = this.props
        let recipeList = this.state.recipeList.sort((a,b) => parseInt(recipes[b].timestamp, 10) - parseInt(recipes[a].timestamp), 10)
        this.setState({recipeList, sort: 'recent'})
    }

    handlePopularSort = () => {
        const { recipes } = this.props
        let recipeList = this.state.recipeList.sort((a,b) => recipes[b].recipeText.favorites.length - recipes[a].recipeText.favorites.length)
        this.setState({recipeList, sort: 'popular'})
    }

    handleToggleFavorites = () => {
        const favorites = this.state.favorites ? false : true
        this.setState({ favorites })
    }

    handleCategoryFilter = (e) => {
        const category = e.target.value

        const { recipes, recipeIds } = this.props
        const { sort } = this.state
        let recipeList = recipeIds

        this.setState(() => {
            if (category === 'all') {
                return {recipeList, category}
            } else {
                const filteredRecipes = recipeList.filter(recipe => recipes[recipe].recipeText.category === category)
                return {recipeList: filteredRecipes, category}
            }
        }, () => {
            switch(sort) {
                case 'az':
                    this.handleAZSort()
                    break
                case 'recent': 
                    this.handleRecentSort()
                    break
                case 'popular':
                    this.handlePopularSort()
                    break
                default: 
                    break
            }}
        )
    }

    componentDidMount() {
        const { recipeIds, favorites } = this.props

        this.setState({recipeList: recipeIds, favorites})

    }

    render () {
        const { authedUser } = this.props
        const { sort, favorites } = this.state
        const recipeList = favorites 
        ? this.state.recipeList.filter(recipe => authedUser.favorites.includes(recipe))
        : this.state.recipeList
        return (
            <div className='dashboard'>
                <div className="filter-list">
                    Filter by: 
                    <button style={favorites ? {color: 'blue'} : {}} onClick={this.handleToggleFavorites}>Favorites</button>
                    <label for="category">Category: </label>
                    <select name="category" id="category" value={this.state.category} onChange={this.handleCategoryFilter}>
                        <option value='all'>Show All</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="sort-list">
                    Sort by: 
                    <button style={sort === 'az' ? {color: 'blue'} : {}} onClick={this.handleAZSort}>A-Z</button>
                    <button style={sort === 'recent' ? {color: 'blue'} : {}}onClick={this.handleRecentSort}>Recent</button>
                    <button style={sort === 'popular' ? {color: 'blue'} : {}}onClick={this.handlePopularSort}>Popular</button>
                </div>
                {recipeList.length > 0 
                ? <ul className='dashboard'>
                    {recipeList.map(id => (
                        <li key={id}>
                            <RecipeThumb id={id} />
                        </li>
                    ))}
                </ul>
                : <p className="center">There are no recipes in this category</p>}
            </div>
        )
    }
}

function mapStateToProps( { recipes, authedUser } ){
    return { 
        authedUser,
        recipes,
    }
  }

export default withRouter(connect(mapStateToProps)(RecipeList))