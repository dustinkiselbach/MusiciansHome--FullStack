import React, { useEffect, useState, useContext, Fragment } from 'react'
import ProfileContext from '../../context/profile/profileContext'
import UsersContext from '../../context/users/usersContext'
import Spinner from '../layout/Spinner'
import ProfileSavedListings from './ProfileSavedListings'
import ProfileUserListings from './ProfileUserListings'
import ProfileDetails from './ProfileDetails'
import { Link } from 'react-router-dom'

const Profile = props => {
  const profileContext = useContext(ProfileContext)
  const usersContext = useContext(UsersContext)

  const {
    getUserProfile,
    getUserListings,
    userProfile,
    userListings,
    loading,
    errors
  } = profileContext

  const { user } = usersContext

  useEffect(() => {
    getUserProfile()
    getUserListings()
  }, [])

  let profileStuff

  if (userProfile) {
    profileStuff = (
      <Fragment>
        <ProfileDetails userProfile={userProfile} />
        <div className='profile-saved'>
          <h2 className='profile-saved--title title-secondary'>
            Your Saved listings:
          </h2>
          {userProfile.saved.length > 0 ? (
            userProfile.saved.map(item => (
              <ProfileSavedListings item={item} key={item._id} />
            ))
          ) : (
            <Fragment>
              <h3 className='title-tertiary'>No Listings Saved</h3>
              <p className='lead'>
                <Link to='/listings' className='profile-link'>
                  Go to listings
                </Link>
              </p>
            </Fragment>
          )}
        </div>
      </Fragment>
    )
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <section className='profile'>
      <div className='container'>
        <div className='profile-all'>
          <h1 className='profile-header title'>Welcome {user.name}</h1>
          {userProfile ? (
            profileStuff
          ) : (
            <div className='lead'>
              <Link to='/profile/form' className='profile-link'>
                Create profile
              </Link>{' '}
              so you can save a sublet you like, or list your own
            </div>
          )}
          <div className='dark-line'></div>
          {userListings && userListings.length > 0 ? (
            <ProfileUserListings
              userListings={userListings}
              history={props.history}
            />
          ) : (
            <div>NO USER LISTINGS</div>
          )}
        </div>
        <div className='dark-line'></div>
      </div>
    </section>
  )
}

export default Profile
