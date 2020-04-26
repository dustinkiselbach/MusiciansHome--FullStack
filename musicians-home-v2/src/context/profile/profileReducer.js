import {
  GET_USER_PROFILE,
  PROFILE_ERROR,
  PROFILE_LOADING,
  UNSAVE_LISTING
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        loading: false
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
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
