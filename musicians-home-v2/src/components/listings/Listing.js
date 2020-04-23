import React, { useContext, useEffect } from 'react'
import ListingsContext from '../../context/listings/listingsContext'
import ListingMedia from './ListingMedia'
import ListingInfo from './ListingInfo'
import ListingSidebar from './ListingSidebar'

const Listing = ({ match }) => {
  const contactContext = useContext(ListingsContext)
  const { listing, getListing, clearListing } = contactContext

  useEffect(() => {
    getListing(match.params.id)

    return () => {
      clearListing()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [])

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
                <span className='material-icons'>save_alt</span>save
              </li>
              <li className='listing-detail__nav--linkitems'>
                <span className='material-icons'>share</span>share
              </li>
            </ul>
          </div>
          <ListingMedia listing={listing} />

          <div className='listing-detail__secondary'>
            <ListingInfo />

            <ListingSidebar />
          </div>
        </div>
      </div>
    )
  }
  return <div>fart</div>
}

export default Listing
