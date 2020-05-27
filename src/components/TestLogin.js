import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    handleUserLogin = (e) => {
        e.preventDefault()
        const { dispatch } = this.props

        dispatch(setAuthedUser(e.target.value))
    }

    render() {
        const { userIDs } = this.props
        return (
            <div className='recipe'>
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
 
function mapStateToProps ({ authedUser, users }) {
    const userIDs = Object.keys(users)
    return {
        authedUser,
        userIDs
    }

}

export default connect(mapStateToProps)(Login)