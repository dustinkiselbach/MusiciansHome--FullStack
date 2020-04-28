import React from 'react'

const FileUploadImgItem = ({ img, listingId, deleteImage }) => {
  const onDeleteClick = e => {
    e.preventDefault()
    deleteImage(listingId, img._id)
  }
  return (
    <div className='fileupload__imgitem'>
      <img className='fileupload__imgitem-img' src={img.url} alt='' />
      <a href='/#' onClick={onDeleteClick}>
        <span className='material-icons'>delete</span>
      </a>
    </div>
  )
}

export default FileUploadImgItem
