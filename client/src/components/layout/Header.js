import React from 'react'
import Search from '../listings/Search'

const Header = () => {
  return (
    <div className='header'>
      <div className='overlay'>
        <div className='header__inner'>
          <h1 className='title header__title'>Find Your home</h1>
          <Search />
        </div>
      </div>
    </div>
  )
}

export default Header
