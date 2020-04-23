import React, { Fragment, useContext, useState } from 'react'
import ListingsContext from '../../context/listings/listingsContext'
import { Redirect } from 'react-router-dom'

const Search = () => {
  const [redirect, setRedirect] = useState(false)

  const listingsContext = useContext(ListingsContext)
  const {
    filterListings,
    // filtered,
    currentSearch,
    setCurrentSearch
  } = listingsContext

  const onChange = e => {
    filterListings(e.target.value)
    setCurrentSearch(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()
    setRedirect(true)
  }
  if (redirect) {
    return <Redirect to='/listings' />
  }

  return (
    <Fragment>
      <form action='#' className='home-search' onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type='text'
          placeholder='search'
          className='home-search__text'
          value={currentSearch}
        />
        <button type='submit' className='home-search__btn'>
          <span className='material-icons'>search</span>
        </button>
      </form>
    </Fragment>
  )
}

export default Search
