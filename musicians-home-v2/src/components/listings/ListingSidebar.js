import React from 'react'

const ListingSidebar = () => {
  return (
    <div className='listing-detail__sidebar'>
      <div className='listing-detail__sidebar--card'>
        <div className='listing-detail__sidebar--card-title'>
          <h1>1600/mo</h1>
        </div>
        <div className='listing-detail__sidebar--card-movein'>
          <button className='btn btn-light'>Move in</button>
          <button className='btn btn-light'>Move out</button>
        </div>
        <div className='listing-detail__sidebar--card-bottombtn'>
          <button className='btn'>Check Availablity</button>
        </div>
      </div>
    </div>
  )
}

export default ListingSidebar
