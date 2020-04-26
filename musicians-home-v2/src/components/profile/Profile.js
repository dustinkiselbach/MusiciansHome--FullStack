import React, { useEffect, useState, useContext } from 'react'
import ProfileContext from '../../context/profile/profileContext'
import UsersContext from '../../context/users/usersContext'
import Spinner from '../layout/Spinner'
import ProfileSavedListings from './ProfileSavedListings'
import { Link } from 'react-router-dom'

const Profile = () => {
  const profileContext = useContext(ProfileContext)
  const usersContext = useContext(UsersContext)

  const { getUserProfile, userProfile, loading, errors } = profileContext

  console.log(userProfile)

  const { user } = usersContext

  useEffect(() => {
    getUserProfile()
  }, [])

  let profileStuff

  if (userProfile) {
    profileStuff = (
      <div>
        <h1>{userProfile.user.email}</h1>
        <h2>{userProfile.user.name}</h2>
        <h2>Birthday {userProfile.birthday}</h2>
        <h2>Looking For: {userProfile.lookingfor}</h2>
        <div>
          {userProfile.saved.map(item => (
            <ProfileSavedListings item={item} key={item._id} />
          ))}
        </div>
      </div>
    )
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <section className='profile' style={{ marginTop: '10rem' }}>
      <div className='container'>
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
      </div>
    </section>
  )
}

export default Profile
