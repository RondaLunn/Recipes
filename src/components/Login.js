import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import * as firebase from "firebase/app"
import "firebase/auth"

import { handleNewUser } from '../actions/users'
import { handleInitialData } from '../actions/shared'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    state = {
        message: '',
        type: 'login'
    }
    
    toggleLogin = () => {
        let { type } = this.state
        type = type === 'login' ? 'register' : 'login'
        this.setState({type})
    }

    register = (e) => {
        let email = document.getElementById('email').value
        let name = document.getElementById('name').value
        let password = document.getElementById('password').value
        let message = ''

        if (email.length < 4) {
            message='Please enter a valid email address.'
            this.setState({message: message})
            return
        }

        if (name.length < 3) {
            message='Please enter your full name.'
            this.setState({message: message})
            return
        }

        if (password.length < 4) {
            message = 'Please enter a valid password.'
            this.setState({message: message})
            return
        }
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            message = 'Successfully Registered.'
            this.toggleLogin()
            this.setState({message: message})
            this.sendEmailVerification()
            const user = firebase.auth().currentUser
            const uid = user.uid
            const  { dispatch } = this.props
            user.updateProfile({
              displayName: name
            })
            dispatch(handleNewUser({uid, name, email, recipes: [], favorites: [], cookbooks: [], activity: []}))
            dispatch(handleInitialData())
        })
        .catch(error => {
            var errorCode = error.code
            var errorMessage = error.message
            
            if (errorCode === 'auth/weak-password') {
               message = 'The password is too weak. Please create a stronger password'
              } else if (errorCode === 'auth/email-already-in-use') {
                message = 'Email address is already in use. Please sign in or use a different email address.'
                this.toggleLogin()
              } else {
                message = errorMessage
              }
              this.setState({message: message})
        })
    }

    login = (e) => {
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        // let checked = document.getElementById('remember').value
        // let persistence = checked ? 'LOCAL' : 'SESSION'
        let message = ''
        const { dispatch } = this.props

        if (email.length < 4) {
            message = 'Please enter a valid email address.'
            this.setState({message: message})
            return
          }
          if (password.length < 4) {
            message = 'Please enter a valid password.'
            this.setState({message: message})
            return
          }

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            message = 'Successfully signed in.'
            this.setState({message: message})
            dispatch(handleInitialData())
        })
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            
            if (errorCode === 'auth/wrong-password') {
                message = 'Incorrect password.'
              } else if (errorCode === 'auth/user-not-found') {
                message = 'There is no user associated with this email address. Please register or sign in with a different email address.'
                this.toggleLogin()
              } else {
                message = errorMessage
              }
            this.setState({message: message})
        })
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

    sendEmailVerification = () => {
        firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          let message = 'Email Verification Sent!'
          this.setState({message: message})
        })
    }

    sendPasswordReset = (e) => {
        const email = document.getElementById('email').value
        let message = ''

        if (email.length < 4) {
            message='Please enter a valid email address.'
            this.setState({message: message})
            return
        }

        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          message = 'Password Reset Email Sent!'
          this.setState({message: message})
        }).catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/invalid-email') {
            message = 'Please enter a valid email address'
          } else if (errorCode === 'auth/user-not-found') {
            message = 'There is no user associated with this email address. Please register or sign in with a different email address.'
          } else {
            message = errorMessage
          }
          this.setState({message: message})
        });
      }
    
    render() {
      const { authedUser } = this.props
        return (
          <Fragment>
            {authedUser
             ? <div className="authedUser-info">
                <p>Logged in as {authedUser.name} </p>
                <button className='logout-btn' onClick={this.handleLogOut}>Log out</button>
            </div>
            : <div className="recipe-login">
                <h3 className='center'>{this.state.type === 'login' ? 'Log in' : 'Register'}</h3>
                <button onClick={this.toggleLogin}>{this.state.type === 'login' ? 'New to Recipes? Click here to Register.' : 'Already have an account? Click here to Log In'}</button>
                <div className="recipe-info">{this.state.message}</div>
                <div className="recipe-login-form">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    className="recipe-input"
                />
                {this.state.type === 'register' 
                && <Fragment><label htmlFor="name">Name:</label><input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    className="recipe-input"
                /></Fragment>}
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="recipe-input"
                />
                {/* {this.state.type === 'login' 
                && <div>
                  <input 
                    type='checkbox'
                    id='remember'
                    name='remember'
                  />
                  <label for="remember">Keep me signed in (Do not use on a public device)</label>
                </div>} */}
                {this.state.type === 'login' 
                ? <button className="btn" name="login" onClick={this.login}>Log In</button>
                : <button className="btn" name="register" onClick={this.register}>Register</button>}
                <button onClick={this.sendPasswordReset}><p>Forgot Password?</p></button>
                </div>
            </div>
          }
          </Fragment>
        )
    }
}

function mapStateToProps({ authedUser }) {
  return {
      authedUser
  }
}

export default connect(mapStateToProps)(Login)