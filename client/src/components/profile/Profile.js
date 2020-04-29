import React, { useEffect, useContext, Fragment } from 'react'
import ProfileContext from '../../context/profile/profileContext'
import UsersContext from '../../context/users/usersContext'
import Spinner from '../layout/Spinner'
import ProfileSavedListings from './ProfileSavedListings'
import ProfileUserListings from './ProfileUserListings'
import ProfileDetails from './ProfileDetails'
import Space from '../common/Space'
import { Link } from 'react-router-dom'

const Profile = props => {
  const profileContext = useContext(ProfileContext)
  const usersContext = useContext(UsersContext)

  const {
    getUserProfile,
    getUserListings,
    userProfile,
    userListings,
    loading
  } = profileContext

  const { user } = usersContext

  useEffect(() => {
    getUserProfile()
    getUserListings()
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [])

  let noUserStyles

  let profileStuff

  if (userProfile) {
    profileStuff = (
      <Fragment>
        <ProfileDetails userProfile={userProfile} />
        <div className='profile-saved'>
          <h2 className='profile-saved--title title-secondary'>Saved:</h2>
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

  if (!userProfile) {
    noUserStyles = {
      display: 'flex',
      flexDirection: 'column'
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <section className='profile'>
      <div className='container'>
        <div className='profile-all' style={noUserStyles}>
          <h1 className='profile-header title'>Welcome {user.name}</h1>
          {userProfile ? (
            profileStuff
          ) : (
            <div className='profile-header-p lead'>
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
              loading={loading}
            />
          ) : (
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              If you decide to list a sublet, you will see it here
            </div>
          )}
        </div>
        <div className='dark-line'></div>
      </div>
      {!userProfile ? (
        <Space
          link='/profile/form'
          small='If you would like to sublet or list your sublet'
          btn='Create Profile'
          message='Please Create a profile'
        />
      ) : (
        <Space
          link='/listings'
          small='If you would like to check out all sublets'
          btn='Click here'
          message='Your Profile'
        />
      )}
    </section>
  )
}

export default Profile
