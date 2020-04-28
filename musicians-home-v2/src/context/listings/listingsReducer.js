import {
  ADD_LISTING,
  DELETE_LISTING,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LISTING,
  GET_LISTINGS,
  FILTER_LISTINGS,
  CLEAR_FILTER,
  SET_CURRENT_SEARCH,
  GET_LISTING,
  ADD_IMAGE,
  DELETE_IMAGE,
  CLEAR_LISTING,
  LISTING_ERROR,
  LISTING_LOADING,
  CLEAR_ERRORS
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_LISTINGS:
      return {
        ...state,
        listings: action.payload,
        loading: false
      }
    case GET_LISTING:
      return {
        ...state,
        listing: action.payload
      }
    case ADD_IMAGE:
      console.log(action.payload)
      return {
        ...state,
        listing: {
          ...state.listing,
          img: [action.payload, ...state.listing.img]
        }
      }
    case DELETE_IMAGE:
      return {
        ...state,
        listing: {
          ...state.listing,
          img: state.listing.img.filter(item => item._id !== action.payload)
        }
      }
    case ADD_LISTING:
      console.log('adding from-reducer', action.payload)
      return {
        ...state,
        addedId: action.payload._id,
        // listings: [action.payload, ...state.listings], DONT NEED TO DO THIS
        // FORM IS SEPERATE
        loading: false
      }
    case DELETE_LISTING:
      return {
        ...state
        // NOT GOING TO DELETE FROM LIST
        // listings: state.listings.filter(
        //   listing => listing._id !== action.payload
        // )

        // filtered: state.filtered.filter(
        //   filter => filter.id !== action.payload
        // )
      }
    case UPDATE_LISTING:
      console.log('updating from-reducer', action.payload)
      return {
        ...state,
        addedId: action.payload._id
        // WHEN UPDATED WILL RELOAD NOT NEEDED
        // listings: state.listings.map(listing =>
        //   listing._id === action.payload._id ? action.payload : listing
        // )
      }
    case FILTER_LISTINGS:
      return {
        ...state,
        filtered: state.listings.filter(listing => {
          return listing.city
            .toLowerCase()
            .match(`${action.payload.toLowerCase()}`)
        })
      }
    case SET_CURRENT_SEARCH:
      return {
        ...state,
        currentSearch: action.payload
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case CLEAR_LISTING:
      return {
        ...state,
        listing: null
      }
    case LISTING_ERROR:
      return {
        ...state,
        errors: action.payload
      }
    case LISTING_LOADING:
      return {
        ...state,
        loading: true
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      }
    default:
      return state
  }
}
