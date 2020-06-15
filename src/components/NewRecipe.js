import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddRecipe, handleUpdateRecipe } from '../actions/recipes'
import { withRouter } from 'react-router-dom'

import { categories } from '../utils/api'

import LineItem from './LineItem'
import LineImage from './LineImage'

class NewRecipe extends Component {
    state = {
        header: 'Add a New Recipe',
        edit: false,
        title: '',
        category: 'category',
        prepTime: '',
        cookTime: '',
        servings: '',
        ingredients: [],
        instructions: [],
        notes: '',
        tags: [],
        images: [],
        cookbooks: [],
        favorites: [],
        ratings: [],
        comments: []
    }

    handleChange = (e, field) => {
        this.setState({ [field]: e.target.value })
    }

    handleAddLine = (e, field) => {
        e.preventDefault()
        const input = e.target.parentNode.childNodes[0].value
        if (input) {
            const list = this.state[field]
            list.push(input)
            this.setState({ [field]: list })
            e.target.parentNode.childNodes[0].value = ''
        }
    }

    handleChangeLine = (e, field) => {
        e.preventDefault()
        const input = e.target.parentNode.childNodes[0].value
        if (input) {
            const list = this.state[field]
            const oldValue = e.target.parentNode.parentNode.id
            const itemId = list.indexOf(oldValue)
            list[itemId] = input
            
            this.setState(() => ({
                [field]: list
            }))
        }
    }

    handleRemoveLine = (e, field) => {
        e.preventDefault()
        const list = this.state[field]
        const deleteItem = e.target.parentNode.childNodes[0].childNodes[0].value
        const newList = list.filter(item => item !== deleteItem)
        this.setState({ [field]: newList })
    }

    handleAddImage = e => {
        e.preventDefault()
        const imageURL = document.getElementById('recipeImage').value
        const imageCaption = document.getElementById('recipeImageCaption').value
        if (imageURL && imageCaption) {
            const image = {url: imageURL, caption: imageCaption}
            const imageList = this.state.images
            imageList.push(image)
            this.setState({images: imageList})
            document.getElementById('recipeImage').value = ''
            document.getElementById('recipeImageCaption').value = ''
        } else {
            alert('Please enter an image URL and caption')
        }
    } 

    handleChangeImage = e => {
        e.preventDefault()
        const imageURL = e.target.parentNode.childNodes[0].value
        const imageCaption = e.target.parentNode.childNodes[1].value
        if (imageURL && imageCaption) {
            const imageList = this.state.images
            const oldValue = e.target.parentNode.parentNode.id
            const imageId = imageList.findIndex(image => image.url === oldValue)
            imageList[imageId] = {url: imageURL, caption: imageCaption}
            
            this.setState(() => ({
                images: imageList
            }))
        }
    }

    handleRemoveImage = e => {
        e.preventDefault()
        const imageList = this.state.images
        const deleteImage = e.target.parentNode.childNodes[0].childNodes[0].value
        const newList = imageList.filter(image => image.url !== deleteImage)
        this.setState({ images: newList })
    }

    keyPressed = (e, field) => {
        if (e.key === 'Enter') {
            this.handleAddLine(e, field)
        }
    }

    imageKeyPressed = e => {
        if (e.key === 'Enter') {
            this.handleAddImage(e)
        }
    }

    handleDrag = e => {
        e.dataTransfer.setData('text', e.target.id)
    }

    allowDrop = e => {
        e.preventDefault()
    }

    handleDrop = (e, field) => {
        e.preventDefault()
        const movedItem = e.dataTransfer.getData('text')
        const targetItem = e.target.parentNode.parentNode.id

        if (movedItem !== targetItem) {
            const list = this.state[field]
            const movedId = field === 'images' ? list.findIndex(image => image.url === movedItem) : list.indexOf(movedItem)
            const removedItem = list.splice(movedId, 1)
            const targetId = field === 'images' ? list.findIndex(image => image.url === targetItem) : list.indexOf(targetItem)

            if (targetId < movedId) {
                list.splice(targetId, 0, removedItem[0])
            } else {
                list.splice(targetId + 1, 0, removedItem[0])
            }
            this.setState({[field]: list})
        }
    }

    checkComplete () {
        if (this.state.title === '') {
            alert('Please enter a recipe title.')
            return false
        }
        if (this.state.category === 'category') {
            alert('Please choose a category.')
            return false
        }
        if (this.state.prepTime === '') {
            alert('Please enter a prep time.')
            return false
        }
        if (this.state.cookTime === '') {
            alert('Please enter a cook time.')
            return false
        }
        if (this.state.servings === '') {
            alert('Please enter number of servings.')
            return false
        }
        if (this.state.ingredients.length === 0) {
            alert('Please add at least one ingredient.')
            return false
        }
        if (this.state.instructions.length === 0) {
            alert('Please add at least one instruction.')
            return false
        }
        return true
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.checkComplete()) {
            const { title, category, prepTime, cookTime, servings, ingredients, instructions, notes, tags, images, cookbooks, favorites, ratings, comments } = this.state
            
            const { dispatch } = this.props

            const recipeText = {
                title,
                category, 
                prepTime,
                cookTime,
                servings,
                ingredients,
                instructions, 
                notes,
                tags,
                images,
                cookbooks, 
                favorites, 
                ratings, 
                comments 
            }

            if (this.state.edit) {
                const { author, uid, id, timestamp } = this.props.recipeInfo
                dispatch(handleUpdateRecipe({
                    recipeText,
                    author,
                    uid,
                    id,
                    timestamp 
                }))
                this.props.closeModal()
            } else {
                dispatch(handleAddRecipe(recipeText))
                .then(() => {
                    this.setState(() => ({
                    title: '',
                    category: 'category',
                    prepTime: '',
                    cookTime: '',
                    servings: '',
                    ingredients: [],
                    instructions: [],
                    notes: '',
                    tags: [],
                    images: [],
                    cookbooks: [],
                    favorites: [],
                    ratings: [],
                    comments: []
                }))
                    this.props.history.push({pathname: '/', toTop: true})})
            }
        }     
    }

    componentDidMount() {
        window.scrollTo(0,0)
        
        if(this.props.recipeInfo) {
            const { title, category, prepTime, cookTime, servings, ingredients, instructions, notes, tags, images, cookbooks, favorites, ratings, comments } = this.props.recipeInfo.recipeText
            this.setState(() => ({
                header: 'Edit Recipe',
                edit: true,
                title: title,
                category: category,
                prepTime: prepTime,
                cookTime: cookTime,
                servings: servings,
                ingredients: ingredients,
                instructions: instructions,
                notes: notes,
                tags: tags,
                images: images,
                cookbooks: cookbooks,
                favorites: favorites,
                ratings: ratings,
                comments: comments
            }))
        }
    }

    render() {
        return (
            <div className="recipe">
                <h3 className='center'>{this.state.header}</h3>
                <div className='recipe-form-container'>
                    <form className='recipe-form' onSubmit={this.handleSubmit}>
                        <label htmlFor="recipeTitle">Recipe Title:</label>
                        <input 
                        id='recipeTitle'
                        name='recipeTitle'
                        type='text'
                        className='recipe-input'
                        placeholder='Title' 
                        value={this.state.title}
                        onChange={e => this.handleChange(e, 'title')}/>

                        <label htmlFor="categories">Category:</label>
                        <select name='categories' className='recipe-select' value={this.state.category} onChange={e => this.handleChange(e, 'category')}>
                            <option value='category' disabled>Category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>

                        <label htmlFor="recipePrepTime">Prep Time:</label>
                        <input 
                        id='recipePrepTime'
                        name='recipePrepTime'
                        type='text'
                        className='recipe-input'
                        placeholder='Prep Time' 
                        value={this.state.prepTime}
                        onChange={e => this.handleChange(e, 'prepTime')}/>

                        <label htmlFor="recipeCookTime">Cook Time:</label>
                        <input 
                        id='recipeCookTime'
                        name='recipeCookTime'
                        type='text'
                        className='recipe-input'
                        placeholder='Cook Time' 
                        value={this.state.cookTime}
                        onChange={e => this.handleChange(e, 'cookTime')}/>                        

                        <label htmlFor="recipeServings">Servings:</label>
                        <input 
                        id='recipeServings'
                        name='recipeServings'
                        type='number'
                        className='recipe-input'
                        placeholder='Number of Servings' 
                        value={this.state.servings}
                        onChange={e => this.handleChange(e, 'servings')}/>

                        <label htmlFor="recipeIngredients">Ingredients:</label>
                        <div>
                            <div className='line-input'>
                            <input 
                            id='recipeIngredients'
                            name='recipeIngredients'
                            type='text'
                            className='recipe-input'
                            placeholder='Ingredient' 
                            onKeyPress={e => this.keyPressed(e, 'ingredients')}
                            />
                            <button className='add-btn' onKeyPress={this.keyPressed} onClick={e => this.handleAddLine(e, 'ingredients')}>+</button>
                            </div>
                            <div>
                            {this.state.ingredients.map(ingredient => (
                                <div key={ingredient}>
                                    <LineItem item={ingredient} field ='ingredients' updateLine={this.handleChangeLine} deleteLine={this.handleRemoveLine} handleDrag={this.handleDrag} allowDrop={this.allowDrop} handleDrop={this.handleDrop} />
                                </div>
                            ))}</div>
                        </div>

                        <label htmlFor="recipeInstructions">Instructions:</label>
                        <div>
                            <div className='line-input'>
                            <textarea 
                            id='recipeInstructions'
                            name='recipeInstructions'
                            type='text'
                            rows='5'
                            className='recipe-input-box'
                            placeholder='Step' 
                            onKeyPress={e => this.keyPressed(e, 'instructions')}
                            />
                            <button className='add-btn' onClick={e => this.handleAddLine(e, 'instructions')}>+</button>
                            </div><div>
                            {this.state.instructions.map(step => (
                                <div key={step}>
                                    <LineItem item={step} field ='instructions' updateLine={this.handleChangeLine} deleteLine={this.handleRemoveLine} handleDrag={this.handleDrag} allowDrop={this.allowDrop} handleDrop={this.handleDrop} />
                                </div>
                            ))}</div>
                        </div>

                        <label htmlFor="recipeNotes">Notes:</label>
                        <textarea 
                        id='recipeNotes'
                        name='recipeNotes'
                        type='text'
                        rows='5'
                        className='recipe-input-box'
                        placeholder='Notes' 
                        value={this.state.notes}
                        onChange={e => this.handleChange(e, 'notes')}/>

                        <label htmlFor="recipeImages">Images:</label>
                        <div>
                            <div className='line-input'>
                            <div className='recipe-image-input'>
                                <input 
                                id='recipeImage'
                                name='recipeImage'
                                type='text'
                                className='recipe-input'
                                placeholder='Image URL' 
                                onKeyPress={this.imageKeyPressed}
                                />
                                <input 
                                id='recipeImageCaption'
                                name='recipeImageCaption'
                                type='text'
                                className='recipe-input'
                                placeholder='Image Caption' 
                                onKeyPress={this.imageKeyPressed}
                                />
                            </div>
                            <button className='add-btn' onClick={e => this.handleAddImage(e)}>+</button>
                            </div><div>
                            {this.state.images.map(image => (
                                <div key={image.url}>
                                    <LineImage imageURL={image.url} imageCaption={image.caption} field ='images' updateLine={this.handleChangeImage} deleteLine={this.handleRemoveImage} handleDrag={this.handleDrag} allowDrop={this.allowDrop} handleDrop={this.handleDrop}/>
                                </div>
                            ))}</div>
                        </div>

                        <label htmlFor="recipeTags">Tags:</label>
                        <div>
                            <div className='line-input'>
                            <input 
                            id='recipeTags'
                            name='recipeTags'
                            type='text'
                            className='recipe-input'
                            placeholder='chicken, gluten-free, vegan, etc.' 
                            onKeyPress={e => this.keyPressed(e, 'tags')} 
                            />
                            <button className='add-btn' onClick={e => this.handleAddLine(e, 'tags')}>+</button>
                        </div><div>
                        {this.state.tags.map(tag => (
                            <div key={tag}>
                                <LineItem item={tag} field ='tags' updateLine={this.handleChangeLine} deleteLine={this.handleRemoveLine} handleDrag={this.handleDrag} allowDrop={this.allowDrop} handleDrop={this.handleDrop} />
                            </div>
                        ))}</div>
                        </div>

                        <button 
                        className='btn' 
                        >Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(NewRecipe))