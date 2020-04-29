import React, { useContext, useState, useCallback, useEffect } from 'react'
import ListingsContext from '../../context/listings/listingsContext'
import FileUploadImgItem from './FileUploadImgItem'
import FileUploadHeader from './FileUploadHeader'
import { useDropzone } from 'react-dropzone'

const FileUploadForm = ({ match, history }) => {
  const listingsContext = useContext(ListingsContext)

  const { addImage, deleteImage, getListing, listing } = listingsContext

  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    getListing(match.params.id)
  }, [])

  // making sure you can't upload more than 5
  useEffect(() => {
    if (listing !== null && listing.img.length === 4) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [listing])

  //   const [file, setFile] = useState()

  // React dropzone
  const onDrop = useCallback(acceptedFiles => {
    const newImg = new FormData()
    newImg.append('image', acceptedFiles[0])

    addImage(newImg, match.params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [])

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  })

  // Files to output in UI
  // const files = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ))

  let images

  // Images to be outputted to UI
  if (listing !== null && listing.img.length > 0) {
    images = listing.img.map(img => (
      <FileUploadImgItem
        deleteImage={deleteImage}
        key={img._id}
        img={img}
        listingId={match.params.id}
      />
    ))
  } else {
    images = <div>No images here cowboy</div>
  }

  // Normal form stuff REFERENCE IF NEEDED BUT NOT IN THIS APP

  //   const onSubmit = e => {
  //     e.preventDefault()
  //     const newImg = new FormData()
  //     newImg.append('image', file)

  //     addImage(newImg, match.params.id)
  //   }

  //   const onChange = e => {
  //     setFile(e.target.files[0])
  //   }

  //   console.log(acceptedFiles)

  const onDoneClick = e => {
    e.preventDefault()
    history.push(`/listings/${match.params.id}`)
  }

  return (
    <section className='fileupload'>
      <FileUploadHeader />
      <div className='container'>
        {/* <form onSubmit={onSubmit}>
        <input type='file' name='myImage' onChange={onChange} />
        <button type='submit'>Upload</button> */}
        {/* reactdropzone */}
        <div className='fileupload__action'>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps({ disabled })} />
            <p>
              Drag 'n' drop some images for your listing here, or click to
              select files
            </p>
          </div>
        </div>
        <div className='dark-line'></div>
        <div className='fileupload__header-secondary'>
          <h1 className='title'>Edit your images here</h1>
          <p className='lead'>The first image you upload is featured</p>
        </div>
        <div className='fileupload__items'>{images}</div>
        {/* </form> */}
      </div>
      <div className='fileupload__bottom'>
        <button onClick={onDoneClick} className='btn'>
          Done
        </button>
      </div>
    </section>
  )
}

export default FileUploadForm
