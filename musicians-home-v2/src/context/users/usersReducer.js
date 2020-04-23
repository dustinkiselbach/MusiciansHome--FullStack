import { REGISTER_USER, USER_ERROR, SET_CURRENT_USER } from '../types'
import isEmpty from '../../utils/isEmpty'

export default (state, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case USER_ERROR:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state
  }
}
