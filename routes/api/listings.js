const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Listing model
const Listings = require('../../models/Listings')
const User = require('../../models/User')

// Validation
const validateListingsInput = require('../../validation/listings')

// @route  GET api/listings/test
// @desc   Tests post route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'listings Works' }))

// @route  GET api/listings/
// @desc   GET Listing
// @access Public
router.get('/', (req, res) => {
  Listings.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ nolistingsfound: 'No listings found' })
    )
})

// @route  GET api/listings/:id
// @desc   GET Listing by id
// @access Public
router.get('/:id', (req, res) => {
  Listings.findById(req.params.id)
    .populate('user', ['name'])
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nolistingfound: 'No post found with that ID' })
    )
})

// @route  post api/listings/
// @desc   Create Listing
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateListingsInput(req.body)

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors)
    }

    const newListing = new Listings({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      datepost: req.body.dateposted,
      roommates: req.body.roommates,
      movein: req.body.movein,
      moveout: req.body.moveout,

      user: req.user.id
    })

    newListing.save().then(listing => res.json(listing))
  }
)

// @route  GET api/listings/user-listings
// @desc   DELETE Listing
// @access Private
router.get(
  '/user-listings/fart',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Listings.find({ user: req.user.id }).then(listings => {
      console.log(listings)
    })
  }
)

// @route  DELETE api/listings/:id
// @desc   DELETE Listing
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Listings.findById(req.params.id)
        .then(listing => {
          // Check for listing owner
          if (listing.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' })
          }

          // Delete
          listing.remove().then(() => res.json({ success: true }))
        })
        .catch(err =>
          res.status(404).json({ listingnotfound: 'no listing found' })
        )
    })
  }
)

// @route  put api/listings/:id
// @desc   put Listing
// @access Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Check Validation
    const { errors, isValid } = validateListingsInput(req.body)

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors)
    }

    // Get fields
    const listingFields = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      datepost: req.body.dateposted,
      roommates: req.body.roommates,
      movein: req.body.movein,
      moveout: req.body.moveout,

      user: req.user.id
    }
    User.findOne({ user: req.user.id }).then(user => {
      Listings.findById(req.params.id)
        .then(listing => {
          // Check for listing owner
          if (listing.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' })
          }

          // Update
          Listings.findOneAndUpdate(
            { user: req.user.id },
            { $set: listingFields },
            { new: true }
          ).then(listing => res.json(listing))
        })
        .catch(err =>
          res.status(404).json({ listingnotfound: 'no listing found' })
        )
    })
  }
)

module.exports = router
