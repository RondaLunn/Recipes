import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import * as firebase from "firebase/app"
import "firebase/auth"

class Navigation extends Component {

    handleLogOut = (e) => {
        e.preventDefault()
        //let message = ''
        firebase.auth().signOut()
        .then(() => {
            //message = "Successfully logged out."
            //document.cookie = "loggedin=false; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
            const { dispatch } = this.props
            dispatch(setAuthedUser(null))
        }).catch((error) => {
            alert(`Error Logging out. Please try again. Error: ${error}`)
        })
        //this.setState({message: message})
    }

    render(){
    let { authedUser } = this.props

    return (
        <nav className='nav'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/add'>New Recipe</Link></li>
            </ul>
            {authedUser &&(
            <div className="authedUser-info">
                <div>Logged in as {authedUser.name} </div>
                <button className='logout-btn' onClick={this.handleLogOut}>Log out</button>
            </div>
            )}
        </nav>
    )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Navigation)