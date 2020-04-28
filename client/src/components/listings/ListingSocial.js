import React, { Fragment, useState } from 'react'
import { Dialog } from '@reach/dialog'
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

const ListingSocial = props => {
  const [show, setShow] = useState(false)

  const open = e => {
    e.preventDefault()
    setShow(true)
  }

  const close = e => {
    setShow(false)
  }

  // TODO get final url and set so it can share the page properly
  let currentUrl = 'www.reddit.com/r/reactjs'

  return (
    <Fragment>
      <a href='/#' onClick={open}>
        <span className='material-icons'>share</span>share
      </a>
      <Dialog
        aria-label='Social Media'
        isOpen={show}
        onDismiss={close}
        className='modal'
      >
        <button className='close-btn' onClick={close}>
          <span aria-hidden>×</span>
        </button>
        <h2 className='title-secondary'>Share</h2>
        <div className='dark-line-0m'></div>
        <div className='modal__social-item'>
          <FacebookShareButton url={currentUrl} className='modal__social-btn'>
            <FacebookIcon></FacebookIcon>
            <span>Facebook</span>
          </FacebookShareButton>
        </div>
        <div className='modal__social-item'>
          <RedditShareButton url={currentUrl} className='modal__social-btn'>
            <RedditIcon></RedditIcon>
            <span>Reddit</span>
          </RedditShareButton>
        </div>
        <div className='modal__social-item'>
          <TwitterShareButton url={currentUrl} className='modal__social-btn'>
            <TwitterIcon></TwitterIcon>
            <span>Twitter</span>
          </TwitterShareButton>
        </div>
        <div className='modal__social-item'>
          <EmailShareButton url={currentUrl} className='modal__social-btn'>
            <EmailIcon></EmailIcon>
            <span>Email</span>
          </EmailShareButton>
        </div>
      </Dialog>
    </Fragment>
  )
}

export default ListingSocial
