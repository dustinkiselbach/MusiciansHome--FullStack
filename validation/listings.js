const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateListingsInput (data) {
  let errors = {}

  data.description = !isEmpty(data.description) ? data.description : ''
  data.title = !isEmpty(data.title) ? data.title : ''
  data.price = !isEmpty(data.price) ? data.price : ''
  data.address = !isEmpty(data.address) ? data.address : ''
  data.city = !isEmpty(data.city) ? data.city : ''
  data.state = !isEmpty(data.state) ? data.state : ''
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : ''
  data.movein = !isEmpty(data.movein) ? data.movein : ''
  data.moveout = !isEmpty(data.moveout) ? data.moveout : ''

  if (!Validator.isLength(data.description, { min: 6, max: 500 })) {
    errors.description = 'Description must be between 6 and 500 characters'
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'description field is required'
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'title field is required'
  }
  if (Validator.isEmpty(data.price)) {
    errors.price = 'price field is required'
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = 'address field is required'
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = 'city field is required'
  }
  if (Validator.isEmpty(data.state)) {
    errors.state = 'state field is required'
  }
  if (Validator.isEmpty(data.zipcode)) {
    errors.zipcode = 'zipcode field is required'
  }
  if (Validator.isEmpty(data.movein)) {
    errors.movein = 'move in field is required'
  }
  if (Validator.isEmpty(data.moveout)) {
    errors.moveout = 'moveout field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
