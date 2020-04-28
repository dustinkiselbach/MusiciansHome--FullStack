import React from 'react'

const Pagination = ({ item, searchListings, currentSearch }) => {
  let count = item + 1
  const onChangePage = e => {
    e.preventDefault()
    searchListings(count, currentSearch)
  }
  return (
    <div className='page-item' onClick={onChangePage}>
      <a href='#/'>{count}</a>
    </div>
  )
}

export default Pagination
