import React from 'react'
import Moment from 'react-moment'

const ListingInfo = ({ listing }) => {
  // for formatting date
  let moveIn = new Date(listing.movein)
  let moveOut = new Date(listing.moveout)

  return (
    <div className='listing-detail__info'>
      <div className='listing-detail__info--content'>
        <div className='listing-detail__info--content-bullets'>
          <h2 className='listing-detail__info--content-title'>
            {listing.roommates ? listing.roommates : 'No'} roommates
          </h2>
          <div className='dark-line-0m'></div>
          <div className='info'>
            <span className='material-icons'>king_bed</span>
            <div className='info-text'>
              <h3>
                Up to <Moment duration={moveIn} date={moveOut} />
              </h3>
              <small>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
                incidunt perspiciatis doloribus.
              </small>
            </div>
          </div>
          <div className='info'>
            <span className='material-icons'>perm_identity</span>
            <div className='info-text'>
              <h3>Up to 6 months</h3>
              <small>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
                incidunt perspiciatis doloribus.
              </small>
            </div>
          </div>
          <div className='info'>
            <span className='material-icons'>apartment</span>
            <div className='info-text'>
              <h3>Up to 6 months</h3>
              <small>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
                incidunt perspiciatis doloribus.
              </small>
            </div>
          </div>
          <div className='dark-line-0m'></div>
        </div>
      </div>
      <p className='listing-detail__info--content-p'>{listing.description}</p>
    </div>
  )
}

export default ListingInfo
