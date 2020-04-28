import {
  GET_USER_PROFILE,
  GET_USER_LISTINGS,
  PROFILE_ERROR,
  PROFILE_LOADING,
  UNSAVE_LISTING,
  CLEAR_ERRORS,
  DELETE_LISTING
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        loading: false
      }
    case GET_USER_LISTINGS:
      return {
        ...state,
        userListings: action.payload
      }
    case PROFILE_ERROR:
      return {
        ...state,
        errors: action.payload,
        loading: false
      }
    case UNSAVE_LISTING:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          saved: state.userProfile.saved.filter(
            item => item._id !== action.payload
          )
        }
      }
    case DELETE_LISTING:
      return {
        ...state,
        userListings: state.userListings.filter(
          listing => listing._id !== action.payload
        )
      }
    case PROFILE_LOADING:
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
