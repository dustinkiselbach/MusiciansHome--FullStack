import React from 'react'
import { Link } from 'react-router-dom'

const ListingsList = ({ listing }) => {
  const {
    title,
    // description,
    address,
    city,
    state,
    zipcode,
    price,
    user,
    _id,
    img
  } = listing

  // const onDelete = () => {
  //   deleteListing(_id)
  //   clearCurrent()
  // }

  // const onUpdate = () => {
  //   setCurrent(listing)
  //   setRedirect(true)
  // }

  let imgUrl

  if (img.length !== 0) {
    imgUrl = img[0].url
  } else {
    imgUrl = 'https://picsum.photos/500'
  }

  // console.log(img[0].url)

  return (
    <div className='listing'>
      <img className='listing__img' src={imgUrl} alt='' />
      <div className='listing__text'>
        <Link to={`listings/${_id}`}>
          <h1 className='listing__text--title'>${price}/mo</h1>
        </Link>
        <div className='listing__text--items'>
          <h2 className='listing__text--price'>{title}</h2>
          <p className='listing__text--details'>
            {city}, {state}, {zipcode}
          </p>
        </div>
        {/* <div className='listing__text--links'>
          {usersContext.user !== null &&
          user.toString() === usersContext.user.id ? (
            <Fragment>
              <button
                className='btn btn-warning'
                onClick={onUpdate}
                style={{ marginRight: '1rem' }}
              >
                update
              </button>
              <button className='btn btn-danger' onClick={onDelete}>
                delete
              </button>
              <Link to={`/listings/form/${_id}`}>upload image</Link>
            </Fragment>
          ) : (
            ''
          )} */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default ListingsList
