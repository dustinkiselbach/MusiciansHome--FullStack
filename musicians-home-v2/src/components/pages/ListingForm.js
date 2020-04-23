import React, { useState, useContext, useEffect } from 'react'
import ListingsContext from '../../context/listings/listingsContext'
import TextFieldGroupNew from '../common/TextFieldGroupNew'
import { Link } from 'react-router-dom'

const ListingForm = props => {
  const listingsContext = useContext(ListingsContext)

  const {
    addListing,
    updateListing,
    clearCurrent,
    current,
    errors,
    loading
  } = listingsContext

  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (!loading && Object.keys(errors).length === 0 && redirect) {
      props.history.push('/listings')
    }
  })

  useEffect(() => {
    if (current !== null) {
      setListing(current)
    } else {
      setListing({
        title: '',
        description: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        price: ''
      })
    }
  }, [current])

  const [listing, setListing] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    price: ''
  })

  const { title, description, address, city, state, zipcode, price } = listing

  const onChange = e =>
    setListing({ ...listing, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if (current === null) {
      addListing(listing)
      setRedirect(true)
    } else {
      updateListing(listing)
      setRedirect(true)
    }
    if (!errors) {
      clearCurrent()
    }
  }

  const clearAll = e => {
    e.preventDefault()
    clearCurrent()
  }

  // errorMSG

  let errorMsg

  if (errors === 'Unauthorized') {
    errorMsg = (
      <div className='is-invalid' style={{ textAlign: 'center' }}>
        You need to be logged in to add a listing
        {/* <Link to='/login'> Login</Link> */}
      </div>
    )
  }

  return (
    <div className='listing-form-all'>
      <div className='overlay'>
        <div className='container'>
          <section className='listing-form'>
            <form onSubmit={onSubmit}>
              <h2 className='listing-form__title title'>
                {current ? 'Edit Listing' : 'Add Listing'}
              </h2>
              {errorMsg}
              <div className='listing-form__form-area'>
                <TextFieldGroupNew
                  type='text'
                  placeholder='title'
                  name='title'
                  value={title}
                  onChange={onChange}
                  // className='input-error'
                  error={errors.title}
                />

                <TextFieldGroupNew
                  type='text'
                  placeholder='price'
                  name='price'
                  value={price}
                  onChange={onChange}
                  // className='input-error'
                  error={errors.price}
                />

                <TextFieldGroupNew
                  type='text'
                  placeholder='description'
                  name='description'
                  value={description}
                  onChange={onChange}
                  // className='input-error'
                  error={errors.description}
                />

                <TextFieldGroupNew
                  type='text'
                  placeholder='city'
                  name='city'
                  value={city}
                  onChange={onChange}
                  // className='input-error'
                  error={errors.city}
                />

                <TextFieldGroupNew
                  type='text'
                  placeholder='address'
                  name='address'
                  value={address}
                  onChange={onChange}
                  // className='input-error'
                  error={errors.address}
                />

                <TextFieldGroupNew
                  type='text'
                  placeholder='state'
                  name='state'
                  value={state}
                  onChange={onChange}
                  // className='input-error'
                  error={errors.state}
                />
                <TextFieldGroupNew
                  type='text'
                  placeholder='zipcode'
                  name='zipcode'
                  value={zipcode}
                  onChange={onChange}
                  // className='input-error'
                  error={errors.zipcode}
                />
                <button className='btn'>
                  {current ? 'Update Listing' : 'Add Listing'}
                </button>
                {current && (
                  <button onClick={clearAll} className='btn'>
                    Clear
                  </button>
                )}
              </div>
            </form>
            <div className='listing-form__img'></div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ListingForm
