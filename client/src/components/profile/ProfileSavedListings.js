import React, { useContext } from 'react'
import ProfileContext from '../../context/profile/profileContext'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'

const ProfileSavedListings = ({ item }) => {
  const profileContext = useContext(ProfileContext)

  const { unsaveListing } = profileContext

  const alert = useAlert()

  const onDeleteClick = e => {
    e.preventDefault()
    alert.info(`${item.title} no longer saved`)
    unsaveListing(item._id)
  }

  return (
    <div className='profile-saved__item'>
      <Link to={`/listings/${item._id}`}>
        <h3 className='profile-saved__item-title profile-link title-tertiary'>
          {item.title}, {item.city}, {item.state}
        </h3>
      </Link>
      <button
        style={{ margin: '0' }}
        className='btn btn-danger'
        onClick={onDeleteClick}
      >
        <span className='material-icons'>clear</span>
      </button>
    </div>
  )
}

export default ProfileSavedListings
