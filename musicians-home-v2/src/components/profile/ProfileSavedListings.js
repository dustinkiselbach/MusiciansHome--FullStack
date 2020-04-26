import React, { useContext } from 'react'
import ProfileContext from '../../context/profile/profileContext'

const ProfileSavedListings = ({ item }) => {
  const profileContext = useContext(ProfileContext)

  const { unsaveListing } = profileContext

  const onDeleteClick = e => {
    e.preventDefault()
    unsaveListing(item._id)
  }

  return (
    <div>
      <p>{item.title}</p>
      <button onClick={onDeleteClick}>delete</button>
    </div>
  )
}

export default ProfileSavedListings
