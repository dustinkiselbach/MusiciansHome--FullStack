import React, { useContext, useEffect } from 'react'
import ListingsContext from '../../context/listings/listingsContext'
import ProfileContext from '../../context/profile/profileContext'
import ListingMedia from './ListingMedia'
import ListingInfo from './ListingInfo'
import ListingSidebar from './ListingSidebar'
import ListingSocial from './ListingSocial'
import Spinner from '../layout/Spinner'

const Listing = ({ match }) => {
  const listingContext = useContext(ListingsContext)
  const { listing, getListing, clearListing } = listingContext

  const profileContext = useContext(ProfileContext)

  const { saveListing } = profileContext

  useEffect(() => {
    getListing(match.params.id)

    return () => {
      clearListing()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [])

  const onClickSave = e => {
    e.preventDefault()
    saveListing(listing._id)
  }

  if (listing) {
    return (
      <div className='listing-detail'>
        <div className='container'>
          <h1 className='listing-detail__title title'>{listing.title}</h1>
          <div className='listing-detail__nav'>
            <h3 className='listing-detail__nav--city'>
              {listing.city}, {listing.state}
            </h3>
            <ul className='listing-detail__nav--links'>
              <li className='listing-detail__nav--linkitems'>
                <a href='/#' onClick={onClickSave}>
                  <span className='material-icons'>save_alt</span>save
                </a>
              </li>
              <li className='listing-detail__nav--linkitems'>
                <ListingSocial />
              </li>
            </ul>
          </div>
          <ListingMedia listing={listing} />

          <div className='listing-detail__secondary'>
            <ListingInfo listing={listing} />

            <ListingSidebar listing={listing} />
          </div>
        </div>
      </div>
    )
  }
  return <Spinner />
}

export default Listing
