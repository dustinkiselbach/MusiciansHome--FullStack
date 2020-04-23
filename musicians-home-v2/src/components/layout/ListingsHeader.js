import React from 'react'
import Search from '../listings/Search'

const ListingsHeader = () => {
  return (
    <div className='heading-secondary'>
      <div className='overlay'>
        <div className='heading-secondary__inner'>
          <Search />
          <h2 className='title-secondary'>Sublet or Rent</h2>
        </div>
      </div>
    </div>
  )
}

export default ListingsHeader
