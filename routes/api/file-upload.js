const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Listing model
const Listings = require('../../models/Listings')

const upload = require('../../services/file-upload')

const deleteImg = require('../../services/file-delete')

const singleUpload = upload.single('image')

// @route  post api/files/
// @desc   Upload Image
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let errors = {}
    singleUpload(req, res, err => {
      if (err) {
        errors.upload = err.message
        return res.status(400).json(errors)
      }

      return res.json({ imageUrl: req.file.location })
    })
  }
)

// @route  post api/files/listings/:id
// @desc   Upload Image to Listing
// @access Private
router.post(
  '/listings/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let errors = {}

    singleUpload(req, res, err => {
      if (err) {
        errors.upload = err.message
        return res.status(400).json(errors)
      }

      Listings.findById(req.params.id)
        .then(listing => {
          const newImg = {
            url: req.file.location,
            featured: req.body.featured
          }
          listing.img.push(newImg)

          listing.save().then(listing => res.json(listing))
        })
        .catch(err => res.status(404))
    })
  }
)

// @route  DELETE api/files/listings/:id/:img_id
// @desc   Upload Image to Listing
// @access Private
router.delete(
  '/listings/:id/:img_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Listings.findById(req.params.id).then(listing => {
      const filtered = listing.img.filter(
        img => img._id.toString() === req.params.img_id
      )
      console.log(filtered[0].url.split('/').slice(-1)[0])
      // try to delete this piece of shit
      const x = {
        Bucket: 'musicianshome-images',
        Key: filtered[0].url.split('/').slice(-1)[0]
      }
      deleteImg(x)
    })
    Listings.findById(req.params.id)
      .then(listing => {
        // Check to see if image exists

        if (
          listing.img.filter(img => img._id.toString() === req.params.img_id)
            .length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'listing does not exist' })
        }

        // Get remove index
        const removeIndex = listing.img
          .map(item => item._id.toString())
          .indexOf(req.params.img_id)

        // Splice comment out of array
        listing.img.splice(removeIndex, 1)

        listing.save().then(listing => res.json(listing))
      })
      .catch(err => res.status(404).json({ imgnotfound: 'no image found' }))
  }
)

module.exports = router
