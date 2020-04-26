import React, { useState } from 'react'
import Moment from 'react-moment'

const ListingSidebar = ({ listing }) => {
  const [toggler, setToggler] = useState(false)
  const [toggler2, setToggler2] = useState(false)

  let toggleMoveIn

  if (toggler) {
    toggleMoveIn = (
      <div className='listing-detail__sidebar--card-toggler'>
        <Moment format='MM/DD/YYYY'>{listing.movein}</Moment>
      </div>
    )
  }

  if (toggler2) {
    toggleMoveIn = (
      <div className='listing-detail__sidebar--card-toggler'>
        <Moment format='MM/DD/YYYY'>{listing.moveout}</Moment>
      </div>
    )
  }

  const onClickDisplay = e => {
    e.preventDefault()
    setToggler(true)
    setTimeout(() => {
      setToggler(false)
    }, 5000)
  }

  const onClickDisplay2 = e => {
    e.preventDefault()
    setToggler2(true)
    setTimeout(() => {
      setToggler2(false)
    }, 5000)
  }

  return (
    <div className='listing-detail__sidebar'>
      <div className='listing-detail__sidebar--card'>
        <div className='listing-detail__sidebar--card-title'>
          <h1>{listing.price}$/mo</h1>
        </div>
        <div className='listing-detail__sidebar--card-movein'>
          <button onClick={onClickDisplay} className='btn btn-light'>
            Move in
          </button>
          <button onClick={onClickDisplay2} className='btn btn-light'>
            Move out
          </button>
        </div>
        {toggleMoveIn}
        <div className='listing-detail__sidebar--card-bottombtn'>
          <button className='btn'>Check Availablity</button>
        </div>
      </div>
    </div>
  )
}

export default ListingSidebar
