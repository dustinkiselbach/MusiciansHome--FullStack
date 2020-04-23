const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ListingsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  dateposted: {
    type: Date,
    default: Date.now
  },
  img: [
    {
      url: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      featured: {
        type: Boolean,
        default: false
      }
    }
  ]
})

module.exports = Listings = mongoose.model('listings', ListingsSchema)
