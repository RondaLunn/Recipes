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

      changeItem = (e) => {
        this.props.updateLine(e)
        this.toggleInput(e)
      }

      keyPressed = (e) => {
        if (e.key === 'Enter') {
          this.changeItem(e)
        }
      }
    
    render() {
        const { imageURL, imageCaption } = this.props
        return (
            <div id={imageURL} className='line-item' draggable="true" onDragStart={this.props.handleDrag}>
                <div style={{display:this.state.inputDisplay, flexDirection:"column"}}>
                    <input defaultValue={imageURL} onKeyPress={e => {this.keyPressed(e)}} />
                    <input defaultValue={imageCaption} onKeyPress={e => {this.keyPressed(e)}} />
                    <button onClick={e => this.changeItem(e)}>Update</button>
                </div>
                
                <div style={{display:this.state.itemDisplay}}>
                    <img src={imageURL} alt={imageCaption} className='recipe-image-thumb-input' draggable='false' onDragOver={this.props.allowDrop} onDrop={e => this.props.handleDrop(e, 'images')}/>
                    <div className='recipe-image-caption-input'>{imageCaption}</div>
                    <button onClick={e => this.toggleInput(e)}>Edit</button>
                </div>
                
                <button onClick={e => this.props.deleteLine(e)}>Delete</button>
            </div>
        )
    }
}

export default LineImage