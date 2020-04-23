import React, { useState, useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'
import ResponsiveNav from './ResponsiveNav'
import UsersContext from '../../context/users/usersContext'
import classnames from 'classnames'

const Navbar = () => {
  const usersContext = useContext(UsersContext)
  const { logoutUser, isAuthenticated } = usersContext

  const [toggled, setToggled] = useState('none')
  const [toggleBool, setToggleBool] = useState(false)

  const onLogoutClick = e => {
    e.preventDefault()
    logoutUser()
  }

  const onToggle = () => {
    if (!toggleBool) {
      setToggled('block')
      setToggleBool(!toggleBool)
    } else {
      setToggled('none')
      setToggleBool(!toggleBool)
    }
  }

  const guestLinks = (
    <Fragment>
      <Link to='/listings'>
        <li>Rent</li>
      </Link>
      <li>Sublet</li>
      <Link to='/register'>
        <li>Register</li>
      </Link>
      <Link to='/login'>
        <li>Login</li>
      </Link>
    </Fragment>
  )

  const authLinks = (
    <Fragment>
      <Link to='/listings'>
        <li>Rent</li>
      </Link>
      <li>Sublet</li>
      <a href='/#' onClick={onLogoutClick}>
        Logout
      </a>
    </Fragment>
  )

  return (
    <nav
      className={classnames('navbar bg-dark', {
        toggled: toggleBool
      })}
    >
      <div className='left-side'>
        <Link to='/'>
          <h1>
            <span className='material-icons'> apartment </span>Musician's Home
          </h1>
        </Link>
        {/* Small Screen Nav */}
        <ul className='left-side__nav' style={{ display: toggled }}>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
      {/* Normal Screen Nav */}
      <ul className='right-side__nav'>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
      {/* Hamburger  */}
      <ResponsiveNav onToggle={onToggle} toggleBool={toggleBool} />
    </nav>
  )
}

export default Navbar
