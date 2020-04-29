import React from 'react'
import { Link } from 'react-router-dom'

const Space = ({ message, btn, small, link }) => {
  return (
    <div className='space'>
      <div className='overlay'>
        <div className='container'>
          <div className='space-items'>
            <h1 className='space-title title'>{message}</h1>
            <div className='space-items__bottom'>
              <small className='space-items__bottom-small'>{small}</small>
              <Link to={link}>
                <button className='btn'>{btn}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Space
