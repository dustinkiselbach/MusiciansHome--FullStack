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

  let largeImg

  if (listing.img.length > 0) {
    largeImg = `${listing.img[0].url}`
  } else {
    largeImg = 'https://picsum.photos/500'
  }

  return (
    <div className='listing-detail__media'>
      {/* TODO FIX LOADING IF IMAGE IS NOT FROM USER */}
      <img src={largeImg} alt='' className='listing-detail__media--large' />
      <div className='listing-detail__media--small'>{smallImg}</div>
    </div>
  )
}

export default ListingMedia
