import React, { useState, useContext, Fragment } from 'react'
import { Dialog } from '@reach/dialog'
import ListingsContext from '../../context/listings/listingsContext'

const ListingEmail = ({ listing }) => {
  const listingsContext = useContext(ListingsContext)

  const [show, setShow] = useState(false)

  const [fields, setFields] = useState({
    email: listing.user.email,
    subject: '',
    text: ''
  })

  const onChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }
  const onClick = e => {
    e.preventDefault()
    console.log(fields)
    listingsContext.sendEmail(fields)
    setShow(false)
  }
  return (
    <Fragment>
      <button onClick={() => setShow(true)} className='btn'>
        Check Availablity
      </button>
      <Dialog
        aria-label='Social Media'
        isOpen={show}
        onDismiss={() => setShow(false)}
        className='email'
      >
        <h1 className='lead'>
          Send a quick Email to enquire about this sublet, include your email in
          the body
        </h1>
        <form className='email__form'>
          <input
            type='text'
            placeholder='subject'
            name='subject'
            onChange={onChange}
          />
          <textarea
            type='text'
            placeholder='text'
            name='text'
            onChange={onChange}
          />
          <button onClick={onClick} className='btn'>
            Send
          </button>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default ListingEmail
