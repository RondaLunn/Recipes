import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'

class Navigation extends Component {
    state = {
        message: '',
        menuOpen: false
    }

    toggleMenu = () => {
        const menuOpen = this.state.menuOpen ? false : true
        this.setState({menuOpen})
    }

    closeMenu = () => {
        setTimeout(() => {this.setState({menuOpen: false})}, 100)
    }

    render(){
        const { authedUser } = this.props
        const { menuOpen } = this.state

        return (
            <Fragment>
                <nav className='nav' onBlur={this.closeMenu}>
                    <button className='menu-btn' onClick={this.toggleMenu}>{menuOpen ? <CloseIcon style={{fontSize: 40, margin: '1rem'}}/>: <MenuIcon style={{fontSize: 40, margin: '1rem'}}/>}</button>
                    {menuOpen 
                    && <ul className='nav-list'>
                        <Link to='/'><li className='nav-link'>Home</li></Link>
                        {authedUser && <Link to='/add'><li className='nav-link'>New Recipe</li></Link>}
                        {authedUser && <Link to='/profile'><li className='nav-link'>Profile</li></Link>}
                    </ul>}
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