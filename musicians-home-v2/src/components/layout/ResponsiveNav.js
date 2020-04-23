import React from 'react'
import classnames from 'classnames'

const ResponsiveNav = ({ onToggle, toggleBool }) => {
  return (
    <div onClick={onToggle} className='responsive-nav'>
      <div
        className={classnames('hamburger', { hamburgertoggled: toggleBool })}
      >
        <div></div>
      </div>
    </div>
  )
}

export default ResponsiveNav
