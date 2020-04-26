import React from 'react'
import Search from '../listings/Search'
import { Link } from 'react-router-dom'

const ListingsHeader = () => {
  return (
    <div className='heading-secondary'>
      <div className='overlay'>
        <div className='heading-secondary__inner'>
          <Search />
          <h2 className='title-secondary'>
            Sublet or <Link to='/listings/form'>List your own</Link>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default ListingsHeader
