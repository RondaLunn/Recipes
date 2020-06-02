import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    handleUserLogin = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const name = e.target.value

        dispatch(setAuthedUser({name, uid: name}))
    }

    render() {
        const { userIDs } = this.props
        return (
            <div className='recipe-login'>
                <h3 className='center'>Log in</h3>
                <form className='recipe-info'>
                <select 
                name="users"
                onChange={this.handleUserLogin}>
                    <option value='none'>Select User</option>
                    {userIDs.map(user => (
                        <option key={user} value={user}>{user}</option>
                    ))}
                    </select>
                </form>
            </div>
        )
    }
}
 
function mapStateToProps ({ users }) {
    const userIDs = Object.keys(users)
    return {
        userIDs
    }

}

export default connect(mapStateToProps)(Login)