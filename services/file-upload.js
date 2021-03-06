const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const secretkey = require('../config/keys').AWSAccessKeyId
const secretid = require('../config/keys').AWSSecretKey

// TODO move secret keys
aws.config.update({
  secretAccessKey: secretid,
  accessKeyId: secretkey,
  region: 'us-east-2'
})

const s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Inavlid Mime Type, only JPEG and PNG'), false)
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'musicianshome-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'TESTING_META_DATA!' })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload
