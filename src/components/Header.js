import React from 'react'
import { Link } from 'react-router-dom'

import Navigation from './Navigation'

const Header = () => {
    return (
        <div className='header'>
            <Link to='/'>
                <div className='header-title'>
                    <img src={require('../logo192.png')} alt='Recipes logo' className='recipe-logo'/>
                    <h1>Recipes</h1>
                </div>
            </Link>
            
            <Navigation />  

        </div>
    )
}

export default Header