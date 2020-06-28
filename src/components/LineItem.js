import React,  { Component } from 'react'

class LineItem extends Component {
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

      keyPressed = (e, field) => {
        if (e.key === 'Enter') {
          this.changeItem(e, field)
        }
      }
    
    render() {
        const { item, field } = this.props
        return (
            <div id={item} className='line-item' draggable="true" onDragStart={this.props.handleDrag}>
                <div style={{display:this.state.inputDisplay}}>
                    <input defaultValue={item} onKeyPress={e => {this.keyPressed(e, field)}}/>
                    <button title="Update line item" onClick={e => this.changeItem(e, field)}>Update</button>
                </div>
                
                <div style={{display:this.state.itemDisplay}}>
                    <div style={{width: '10rem', padding: '0.5rem'}} onDragOver={this.props.allowDrop} onDrop={e => this.props.handleDrop(e, field)}>{item}</div>
                    <button title="Edit line item" onClick={e => this.toggleInput(e)}>Edit</button>
                </div>
                
                <button title="Delete line item" onClick={e => this.props.deleteLine(e, field)}>Delete</button>
            </div>
        )
    }
}

export default LineItem