import React from 'react'
import ProfileUserListingsItem from './ProfileUserListingsItem'

const ProfileUserListings = ({ userListings, history }) => {
  console.log(userListings)
  return (
    <div className='profile-userlistings'>
      <h1 className='profile-userlistings__title title'>
        Manage Your Listings:
      </h1>
      <div className='profile-userlistings-items'>
        {userListings.map(item => (
          <ProfileUserListingsItem
            key={item._id}
            item={item}
            history={history}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileUserListings
