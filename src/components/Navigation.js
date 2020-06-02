import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import * as firebase from "firebase/app"
import "firebase/auth"

class Navigation extends Component {
    state = {
        message: ''
    }

    handleLogOut = (e) => {
        e.preventDefault()
        let message = ''
        firebase.auth().signOut()
        .then(() => {
            message = "Successfully logged out."
            const { dispatch } = this.props
            dispatch(setAuthedUser(null))
        }).catch((error) => {
            message =`Error Logging out. Please try again. Error: ${error}`
        })
        this.setState({message: message})
    }

    render(){
    let { authedUser } = this.props

    return (
        <Fragment>
            <nav className='nav'>
                <ul className='nav-list'>
                    <li className='nav-link'><Link to='/'>Home</Link></li>
                    <li className='nav-link'><Link to='/add'>New Recipe</Link></li>
                </ul>
                {authedUser &&(
                <div className="authedUser-info">
                    <p>Logged in as {authedUser.name} </p>
                    <button className='logout-btn' onClick={this.handleLogOut}>Log out</button>
                </div>
                )}
            </nav>
            {this.state.message !== '' && <p>{this.state.message}</p>}
        </Fragment>
    )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Navigation)