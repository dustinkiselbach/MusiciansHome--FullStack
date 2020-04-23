import React, { Fragment, useContext, useEffect } from 'react'
import ListingsList from '../listings/ListingsList'
import ListingsHeader from '../layout/ListingsHeader'
import ListingsContext from '../../context/listings/listingsContext'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

const Listings = () => {
  const listingsContext = useContext(ListingsContext)

  useEffect(() => {
    getListings()
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [])

  const {
    listings,
    clearCurrent,
    getListings,
    filtered,
    clearFilter,
    setCurrentSearch,
    loading
  } = listingsContext

  const onClick = () => {
    clearCurrent()
    clearFilter()
    setCurrentSearch()
  }

  if (listings && !loading) {
    return (
      <Fragment>
        <ListingsHeader />
        <div className='container'>
          <section className='listing-section'>
            {filtered !== null
              ? filtered.map(listing => (
                  <ListingsList listing={listing} key={listing._id} />
                ))
              : listings.map(listing => (
                  <ListingsList listing={listing} key={listing._id} />
                ))}
          </section>

          <div className='dark-line'></div>
          <div className='listing-section__links'>
            <Link
              onClick={onClick}
              className='btn btn-light'
              to='/listings/form'
            >
              Add A listing
            </Link>
          </div>
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <Spinner />
      </Fragment>
    )
  }
}

export default Listings
