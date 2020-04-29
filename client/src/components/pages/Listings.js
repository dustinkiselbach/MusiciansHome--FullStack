import React, { Fragment, useContext, useEffect } from 'react'
import ListingsList from '../listings/ListingsList'
import ListingsHeader from '../layout/ListingsHeader'
import ListingsContext from '../../context/listings/listingsContext'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import Pagination from '../common/Pagination'

const Listings = () => {
  const listingsContext = useContext(ListingsContext)

  const {
    listings,
    clearCurrent,
    getListings,
    searchResults,
    searchListings,
    clearSearch,
    setCurrentSearch,
    currentSearch,
    loading
  } = listingsContext

  useEffect(() => {
    return () => {
      clearSearch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [])

  useEffect(() => {
    getListings()

    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [searchResults])

  const onClick = () => {
    clearCurrent()

    setCurrentSearch()
  }

  if (listings && !loading) {
    return (
      <Fragment>
        <ListingsHeader />
        <div className='container'>
          <section className='listing-section'>
            {searchResults !== null
              ? searchResults.listings.map(listing => (
                  <ListingsList listing={listing} key={listing._id} />
                ))
              : listings.map(listing => (
                  <ListingsList listing={listing} key={listing._id} />
                ))}
          </section>

          <div className='dark-line'></div>
          {searchResults !== null ? (
            <div className='listing-section__pages'>
              <small className='listing-section__pages-small'>pages:</small>
              {Array.from({ length: searchResults.pages }, (x, i) => i).map(
                item => (
                  <div key={item}>
                    <Pagination
                      currentSearch={currentSearch}
                      searchListings={searchListings}
                      item={item}
                    />
                  </div>
                )
              )}
            </div>
          ) : (
            <div />
          )}
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
