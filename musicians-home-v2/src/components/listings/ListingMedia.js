import React from 'react'

const ListingMedia = ({ listing }) => {
  let smallImg

  if (listing.img.length > 1) {
    smallImg = listing.img.map(item => (
      <img
        src={item.url}
        key={item.url}
        alt=''
        className='listing-detail__media--small-1'
      />
    ))
  }

  return (
    <div className='listing-detail__media'>
      <img
        src={listing.img[0].url}
        alt=''
        className='listing-detail__media--large'
      />
      <div className='listing-detail__media--small'>{smallImg}</div>
    </div>
  )
}

export default ListingMedia
