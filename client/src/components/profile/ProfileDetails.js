import React from 'react'
import Moment from 'react-moment'

const ProfileDetails = ({ userProfile }) => {
  return (
    <div className='profile-details'>
      <h2 className='profile-details--title title-secondary'>Details:</h2>
      <h3 className='profile-details--fields title-tertiary'>
        {userProfile.user.email}
      </h3>
      <h3 className='profile-details--fields title-tertiary'>
        <span> Birthday:</span>{' '}
        <Moment format='MM/DD/YYYY'>{userProfile.birthday}</Moment>
      </h3>
      <h3 className='profile-details--fields title-tertiary'>
        <span>Looking For:</span> {userProfile.lookingfor}
      </h3>
    </div>
  )
}

export default ProfileDetails
