import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  Profiler
} from 'react'
import ListingsContext from '../../context/listings/listingsContext'
import FileUploadImgItem from './FileUploadImgItem'
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
    if (listing !== null && listing.img.length === 5) {
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
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

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
      {/* <form onSubmit={onSubmit}>
        <input type='file' name='myImage' onChange={onChange} />
        <button type='submit'>Upload</button> */}
      {/* reactdropzone */}
      <div className='container'>
        <h1 className='title'>You can remove your images</h1>
        {images}
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps({ disabled })} />
          <p>
            Drag 'n' drop some images for your listing here, or click to select
            files
          </p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </div>
      <button onClick={onDoneClick} className='btn'>
        Done
      </button>
      {/* </form> */}
    </section>
  )
}

export default FileUploadForm
