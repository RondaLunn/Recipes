import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as firebase from "firebase/app"
import "firebase/auth"

import { setAuthedUser } from '../actions/authedUser'
import { handleNewUser } from '../actions/users'
import { handleInitialData } from '../actions/shared'

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
        let email = e.target.parentNode.childNodes[0].value
        let name = e.target.parentNode.childNodes[1].value
        let password = e.target.parentNode.childNodes[2].value
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
            message = 'Successfully Registered. Please sign in.'
            this.toggleLogin()
            this.setState({message: message})
            this.sendEmailVerification()
            const user = firebase.auth().currentUser
            const uid = user.uid
            user.updateProfile({
              displayName: name
            })
            dispatch(handleNewUser({uid, name, recipes: []}))
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
        let email = e.target.parentNode.childNodes[0].value
        let password = e.target.parentNode.childNodes[1].value
        // let checked = e.target.parentNode.childNodes[2].childNodes[0].checked
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
        .then(response => {
            console.log(response)
            message = 'Successfully signed in.'
            this.setState({message: message})
            const user = firebase.auth().currentUser.uid
            dispatch(setAuthedUser(user))
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

    sendEmailVerification = () => {
        firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          let message = 'Email Verification Sent!'
          this.setState({message: message})
        })
    }

    sendPasswordReset = (e) => {
        const email = e.target.parentNode.childNodes[0].value
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

    logout = () => {
      let message = ''
      firebase.auth().signOut()
      .then(() => {
        message = "Successfully logged out."
      }).catch(function(error) {
        message = "Error Logging out. Please try again. Error: " + error
      })
      this.setState({message: message})
    }
    
    render() {
        return (
            <div className="recipe">
                <h3 className='center'>{this.state.type === 'login' ? 'Log in' : 'Register'}</h3>
                <button onClick={this.toggleLogin}>{this.state.type === 'login' ? 'New to Recipes? Click here to Register.' : 'Already have an account? Click here to Log In'}</button>
                <div className="recipe-info">{this.state.message}</div>
                <div className="recipe-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="recipe-input"
                />
                {this.state.type === 'register' 
                && <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="recipe-input"
                />}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="recipe-input"
                />
                {/* {this.state.type === 'login' 
                && <div>
                  <input 
                    type='checkbox'
                    name='remember'
                  />
                  <label for="remember">Keep me signed in (Do not use on a public device)</label>
                </div>} */}
                {this.state.type === 'login' 
                ? <button className="btn" name="login" onClick={this.login}>Log In</button>
                : <button className="btn" name="register" onClick={this.register}>Register</button>}
                <button onClick={this.sendPasswordReset}>Forgot Password?</button>
                </div>
            </div>
        )
    }
}

export default connect()(Login)