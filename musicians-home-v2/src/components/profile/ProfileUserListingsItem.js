import React, { useContext } from 'react'
import ListingsContext from '../../context/listings/listingsContext'
import ProfileContext from '../../context/profile/profileContext'
import { Link } from 'react-router-dom'

const ProfileUserListingsItem = ({ item, history }) => {
  const listingsContext = useContext(ListingsContext)

  const { deleteListing, setCurrent } = listingsContext

  const profileContext = useContext(ProfileContext)

  const { deleteUserListing } = profileContext

  const onDeleteClick = e => {
    e.preventDefault()
    deleteListing(item._id)
    deleteUserListing(item._id)
  }

  const onUpdateClick = e => {
    e.preventDefault()
    setCurrent(item)
    history.push('/listings/form')
  }
  return (
    <div className='profile-userlistings__item'>
      <div className='profile-userlistings__item-imgarea'>
        {item.img.length > 0 ? (
          <img
            className='profile-userlistings__item-img'
            src={item.img[0].url}
            alt=''
          />
        ) : (
          <img
            className='profile-userlistings__item-img'
            src='https://q-cf.bstatic.com/images/hotel/max1024x768/174/174011538.jpg'
            alt=''
          />
        )}
        <Link to={`listings/form/${item._id}`}>
          <span class='material-icons'>edit</span>
        </Link>
      </div>
      <div className='profile-userlistings__item-text'>
        <h3 className='profile-userlistings__item-title title-tertiary'>
          {item.title}
        </h3>
        <p className='profile-userlistings__item-details'>
          {item.city}, {item.state}
        </p>
      </div>
      <div className='profile-userlistings__item-btns'>
        <button onClick={onUpdateClick} className='btn btn-ifno'>
          Update
        </button>
        <button onClick={onDeleteClick} className='btn btn-danger'>
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProfileUserListingsItem
