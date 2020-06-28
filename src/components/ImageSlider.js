import React, { Component, Fragment } from 'react'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

class ImageSlider extends Component {
    state = {
        currentImage: 0,
        dragged: false,
        dragStartX: null,
        direction: null,
    }

    goLeft = () => {
        if (this.state.currentImage === 0) {
            this.setState({ currentImage: this.props.imageList.length - 1}) 
        } else {
            this.setState((prevState) => ({
                currentImage: prevState.currentImage - 1
            }))
        }
    }

    goRight = () => {
        if (this.state.currentImage === this.props.imageList.length - 1) {
            this.setState({ currentImage: 0 }) 
        } else {
            this.setState((prevState) => ({
                currentImage: prevState.currentImage + 1
            }))
        }
    }

    onDragStartMouse = (e) => {
        this.onDragStart(e.clientX)
        window.addEventListener("mousemove", this.onMouseMove)
        window.addEventListener("mouseup", this.onDragEndMouse)
      }
      
      onDragStartTouch = (e) => {
        const touch = e.targetTouches[0]
        this.onDragStart(touch.clientX)
        window.addEventListener("touchmove", this.onTouchMove)
        window.addEventListener("touchend", this.onDragEndTouch)
      }

      onDragStart = (clientX) => {
        this.setState({
          dragged: true,
          dragStartX: clientX
        })
      }

      onMouseMove= (e) => {
        const distance = e.clientX - this.state.dragStartX
        if (distance !== 0) {
          const direction = distance < 0 ? 'left' : 'right'
          this.setState({direction: direction})
        }
      }
      
      onTouchMove = (e) => {
        const touch = e.targetTouches[0]
        const distance = touch.clientX - this.state.dragStartX
        if (distance !== 0) {
          const direction = distance < 0 ? 'left' : 'right'
          this.setState({direction: direction})
        }
      }

      onDragEndMouse = () => {
        window.removeEventListener("mousemove", this.onMouseMove)
        window.removeEventListener("touchend", this.onDragEndTouch)
        this.onDragEnd()
      }
      
      onDragEndTouch = () => {
        window.removeEventListener("touchmove", this.onTouchMove)
        window.removeEventListener("touchend", this.onDragEndTouch)
        this.onDragEnd()
      }

      onDragEnd = () => {
        const direction = this.state.direction
        if (this.state.dragged) {        
          if (direction === 'left'){
            this.goLeft()
          } else if(direction === 'right') {
            this.goRight()
          }
          this.setState({ 
            dragged: false,
            dragStartX: null,
            direction: null,
           })
        }
      }

    render() {
        const { imageList } = this.props
        const image = imageList[this.state.currentImage]

        return (
            <Fragment>
                {imageList.length > 0 &&
                <div className='image-container'>
                    {imageList.length > 1 &&<button title="Go left" onClick={this.goLeft}><ChevronLeftIcon/></button>}
                    <div onMouseDown={this.onDragStartMouse} onTouchStart={this.onDragStartTouch}>
                        <img src={image.url} alt={image.caption} className='recipe-image' draggable='false'/>
                        <p className='center'>{image.caption}</p>
                    </div>
                    {imageList.length >1 && <button title="Go Right" onClick={this.goRight}><ChevronRightIcon/></button>}
                </div>
                }
            </Fragment>
        )
    }
}

export default ImageSlider