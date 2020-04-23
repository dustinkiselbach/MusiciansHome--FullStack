import React, { useContext, useCallback } from 'react'
import ListingContext from '../../context/listings/listingsContext'
import { useDropzone } from 'react-dropzone'

const FileUploadForm = ({ match }) => {
  const listingContext = useContext(ListingContext)

  const { addImage } = listingContext

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

  return (
    <div style={{ marginTop: '10rem' }}>
      {/* <form onSubmit={onSubmit}>
        <input type='file' name='myImage' onChange={onChange} />
        <button type='submit'>Upload</button> */}
      {/* reactdropzone */}
      <section className='container'>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>
            Drag 'n' drop some images for your listing here, or click to select
            files
          </p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
      {/* </form> */}
    </div>
  )
}

export default FileUploadForm
