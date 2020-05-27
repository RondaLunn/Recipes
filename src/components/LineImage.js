import React,  { Component } from 'react'

class LineImage extends Component {
    state = {
        inputDisplay: "none",
        itemDisplay: "flex"
    }

    toggleInput = (e) => {
        e.preventDefault()
        if (this.state.inputDisplay === 'none') {
          this.setState({ itemDisplay: 'none' })
          this.setState({ inputDisplay: 'flex' })
        } else {
          this.setState({ itemDisplay: 'flex' })
          this.setState({ inputDisplay: 'none' })
        }
      }

      changeItem = (e, field) => {
        this.props.updateLine(e, field)
        this.toggleInput(e)
      }
    
    render() {
        const { imageURL, imageCaption } = this.props
        return (
            <div id={imageURL} className='line-item' draggable="true" onDragStart={this.props.handleDrag}>
                <div style={{display:this.state.inputDisplay}}>
                    <input defaultValue={imageURL}/>
                    <input defaultValue={imageCaption}/>
                    <button onClick={e => this.changeItem(e)}>Update</button>
                </div>
                
                <div style={{display:this.state.itemDisplay}}>
                    <img src={imageURL} alt={imageCaption} className='recipe-image-thumb' draggable='false' onDragOver={this.props.allowDrop} onDrop={e => this.props.handleDrop(e, 'images')}/>
                    <div style={{width: '10rem', padding: '0.5rem'}}>{imageCaption}</div>
                    <button onClick={e => this.toggleInput(e)}>Edit</button>
                </div>
                
                <button onClick={e => this.props.deleteLine(e)}>Delete</button>
            </div>
        )
    }
}

export default LineImage