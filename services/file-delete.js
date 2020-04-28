const aws = require('aws-sdk')

const s3 = new aws.S3()

// TODO move secret keys
aws.config.update({
  secretAccessKey: '+OKgbGod6o+VdF4Wr56tj8vMinqilvyN6kPCuoWy',
  accessKeyId: 'AKIAIYC7HCJP2JDQJD4Q',
  region: 'us-east-2'
})

/* The following example deletes an object from a non-versioned bucket. */
const deleteImg = async params => {
  try {
    await s3.headObject(params).promise()
    console.log('File found in S3')
    try {
      await s3.deleteObject(params).promise()
      console.log('file deleted successfully')
    } catch (err) {
      console.log('Error in file deleting')
    }
  } catch (err) {
    console.log('file not found')
  }
}

// const params = {
//   Bucket: 'ExampleBucket',
//   Key: 'HappyFace.jpg'
// }

module.exports = deleteImg
