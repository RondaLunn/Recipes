import React from 'react'

const Header = () => {
    return (
        <div className='header'>
            <img src={require('../logo192.png')} alt='Recipes logo' className='recipe-logo'/>
            <h1 className='header-title'>Recipes</h1>
        </div>
    )
}

export default Header