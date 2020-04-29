import React, { useState, useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'
import ResponsiveNav from './ResponsiveNav'
import UsersContext from '../../context/users/usersContext'
import ProfileContext from '../../context/profile/profileContext'
import classnames from 'classnames'

const Navbar = () => {
  const usersContext = useContext(UsersContext)
  const { logoutUser, isAuthenticated } = usersContext

  const profileContext = useContext(ProfileContext)
  const { clearUserProfile } = profileContext

  const [toggled, setToggled] = useState('none')
  const [toggleBool, setToggleBool] = useState(false)

  const onLogoutClick = e => {
    e.preventDefault()
    clearUserProfile()
    console.log(clearUserProfile)
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

  const onLinkClick = () => {
    setToggled('none')
    setToggleBool(false)
  }

  const guestLinks = (
    <Fragment>
      <Link onClick={onLinkClick} to='/listings'>
        <li>Sublet</li>
      </Link>
      <Link onClick={onLinkClick} to='/register'>
        <li>Register</li>
      </Link>
      <Link onClick={onLinkClick} to='/login'>
        <li>Login</li>
      </Link>
    </Fragment>
  )

  const authLinks = (
    <Fragment>
      <Link onClick={onLinkClick} to='/listings'>
        <li>Sublet</li>
      </Link>
      <Link onClick={onLinkClick} to='/listings/form'>
        <li>List</li>
      </Link>
      <Link onClick={onLinkClick} to='/profile'>
        <li>Profile</li>
      </Link>
      <a href='/#' onClick={onLogoutClick}>
        <li>Logout</li>
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
