const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Listing model
const Listings = require('../../models/Listings')
const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route  GET api/profile/test
// @desc   Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }))

// @route  POST api/profile/
// @desc   Create profile route
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newProfile = new Profile({
      lookingfor: req.body.lookingfor,
      birthday: req.body.birthday,
      saved: req.body.saved,
      user: req.user.id
    })
    //Check if already exists
    Profile.findOne({ user: req.user.id }).then(item => {
      if (item) {
        res
          .status(400)
          .json({ alreadyprofile: 'there is already a profile for this user' })
      }
    })

    newProfile
      .save()
      .then(profile => res.json(profile))
      .catch(err => res.json({ err: 'wtf?' }))
  }
)

// @route  POST api/save/:id
// @desc   save listing
// @access Private
router.post(
  '/save/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.user.id }).then(profile => {
      Listings.findById(req.params.id)
        .then(listing => {
          if (
            profile.saved.filter(item => req.params.id === item.toString())
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadysaved: 'User already saved this listing' })
          }
          profile.saved.unshift(listing)

          profile.save().then(profile => res.json(profile))
        })
        .catch(err =>
          res.status(404).json({ listingnotfound: 'listing not found' })
        )
    })
  }
)

// @route  POST api/profile/unsave/:id
// @desc   Unsave listing
// @access Private
router.post(
  '/unsave/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (
          profile.saved.filter(item => req.params.id === item.toString())
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notsaved: 'You have not yet saved this post' })
        }

        // Get remove index
        const removeIndex = profile.saved
          .map(item => item.toString())
          .indexOf(req.params.id)

        // Splice out of array
        profile.saved.splice(removeIndex, 1)

        // save
        profile.save().then(profile => res.json(profile))
      })
      .catch(err => res.status(404).json({ notfound: 'listing not found' }))
  }
)

// @route GET api/profile
// @desc  Get current users profile
// @acess Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.user.id })
      .populate('saved')
      .populate('user', ['name', 'email'])
      .populate('listings')
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user'
          return res.status(404).json(errors)
        }
        res.json(profile)
      })
      .catch(err => res.status(404).json(err))
  }
)

module.exports = router
