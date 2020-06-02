import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

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

  login = (e) => {
    let d = new Date()
    d.setTime(d.getTime() + (30*24*60*60*1000))
    let expires = "expires="+ d.toUTCString()
    let message = ''
    const { dispatch } = this.props

    let username = e.target.parentNode.childNodes[0].value
    document.cookie=`username=${username}; expires=${expires}`
    let password = e.target.parentNode.childNodes[1].value

    let formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    axios({
      method: 'post',
      url: '/api/login.php',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data'}}
    })
    .then(response => {
      if (response.data === "Authenticated"){
        document.cookie = `loggedin=true; expires=${expires}` 
        message = `Hi ${username}!`
        dispatch(setAuthedUser(username))
        dispatch(handleInitialData())
      } else {
        message = "Invalid Username or Password!"
      }
      this.setState({message: message});
    })
    .catch(() => {
      message = "Invalid Username or Password"
      this.setState({message: message})
    })
}

    checkUsername = (username) => {
        const { userIDs } = this.props
        return userIDs.find(name => name.toLowerCase() === username.toLowerCase())
    }

    register = (e) => {
        let username = e.target.parentNode.childNodes[0].value
        let name = e.target.parentNode.childNodes[1].value
        let password = e.target.parentNode.childNodes[2].value
        let message = ""
        const { dispatch } = this.props

        if(this.checkUsername(username)) {
            message = "Username is already in use. Please create a unique username"
            this.setState({ message })
        } else {
            let formData = new FormData()
            formData.append('username', username)
            formData.append('name', name)
            formData.append('password', password)
            axios({
                method: 'post',
                url: '/api/register.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data'}}
            })
            .then(response => {
              console.log(response.data)
                if (response.data === "Success"){
                    message = "Successfully Registered. Please Log in."
                    this.setState({ message, type: 'login'})
                    dispatch(handleNewUser({username, name, recipes: []}))
                } else {
                    message = "Error Registering: Please try again"
                    console.log(response.data)
                    this.setState({ message })
                }
            })
            .catch(response => {
                message = "Error Registering: Please try again"
                console.log(response.data)
                this.setState({ message })
            })
        }
    }

    loadUsername = (cookieList) => {
      let username = cookieList.find(item => item.includes('username'))
      return username.split("=")[1]
    }

    componentDidMount() {
      const cookieList = document.cookie.split(';')
      if (cookieList.filter(item => item.includes('loggedin=true')).length) {
        const { dispatch } = this.props
        const username = this.loadUsername(cookieList)
        this.setState({message: `Hi ${username}!`})
        dispatch(setAuthedUser(username))
      }
    }

  render() {
    return (
      <div className="recipe-login">
        <h3 className='center'>{this.state.type === 'login' ? 'Log in' : 'Register'}</h3>
        <button onClick={this.toggleLogin}>{this.state.type === 'login' ? 'New to Recipes? Click here to Register.' : 'Already have an account? Click here to Log In'}</button>
        <div className="recipe-info">{this.state.message}</div>
        <div className="recipe-form">
          <input
            type="text"
            name="userName"
            placeholder="Username"
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
          {this.state.type === 'login' 
          ? <button className="btn" name="login" onClick={this.login}>Log In</button>
          : <button className="btn" name="register" onClick={this.register}>Register</button>}
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ users }) {
    const userIDs = Object.keys(users)
    return {
        userIDs
    }

}

export default connect(mapStateToProps)(Login)