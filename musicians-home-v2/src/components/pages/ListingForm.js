import React, { useState, useContext, useEffect } from 'react'
import ListingsContext from '../../context/listings/listingsContext'
import TextFieldGroupNew from '../common/TextFieldGroupNew'
import TextAreaFieldGroup from '../../components/common/TextAreaFieldGroup'
import SelectListGroup from '../../components/common/SelectListGroup'

const ListingForm = props => {
  const listingsContext = useContext(ListingsContext)

  const {
    addListing,
    updateListing,
    clearCurrent,
    current,
    errors,
    loading,
    addedId
  } = listingsContext

  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (
      !loading &&
      Object.keys(errors).length === 0 &&
      redirect &&
      addedId !== null
    ) {
      props.history.push(`/listings/form/${addedId}`)
      console.log(addedId)
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
        price: '',
        roommates: '',
        movein: '',
        moveout: ''
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
    price: '',
    roommates: '',
    movein: '',
    moveout: ''
  })

  const {
    title,
    description,
    address,
    city,
    state,
    zipcode,
    price,
    roommates,
    movein,
    moveout
  } = listing

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

  // Select options
  const options = [
    { label: '* Number of Roommates', value: 0 },
    { label: 'one', value: 1 },
    { label: 'two', value: 2 },
    { label: 'three', value: 3 }
  ]

  return (
    <div className='listing-form-all'>
      <div className='overlay'>
        <div className='container'>
          <section className='listing-form'>
            <form onSubmit={onSubmit}>
              <h2 className='listing-form__title title'>
                {current ? 'Edit Listing' : 'List your Sublet'}
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

                <TextAreaFieldGroup
                  type='text'
                  placeholder='description'
                  name='description'
                  value={description}
                  onChange={onChange}
                  // className='input-error'
                  error={errors.description}
                  info='Describe your sublet. Over 6 Characters Please!'
                />

                <SelectListGroup
                  type='text'
                  placeholder='roommates'
                  name='roommates'
                  options={options}
                  value={roommates}
                  onChange={onChange}
                  // className='input-error'
                  error={errors.roommates}
                />

                <TextFieldGroupNew
                  type='date'
                  placeholder='movein'
                  name='movein'
                  value={movein}
                  onChange={onChange}
                  // className='input-error'
                  error={errors.movein}
                />

                <TextFieldGroupNew
                  type='date'
                  placeholder='moveout'
                  name='moveout'
                  value={moveout}
                  onChange={onChange}
                  // className='input-error'
                  error={errors.moveout}
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
                  placeholder='city'
                  name='city'
                  value={city}
                  onChange={onChange}
                  // className='input-error'
                  error={errors.city}
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
