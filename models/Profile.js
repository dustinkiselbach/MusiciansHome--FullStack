const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  listings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'listings'
    }
  ],
  birthday: {
    type: Date
  },
  lookingfor: {
    type: String
  },
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: 'listings'
    }
  ]
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
