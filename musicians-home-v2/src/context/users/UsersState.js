import React, { useReducer } from 'react'
import UsersContext from './usersContext'
import usersReducer from './usersReducer'
import axios from 'axios'
import { REGISTER_USER, USER_ERROR, SET_CURRENT_USER } from '../types'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

const UsersState = props => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    errors: {}
  }

  const [state, dispatch] = useReducer(usersReducer, initialState)

  // Register User
  const registerUser = async (user, history) => {
    // TODO clearErrors()
    // TODO setListingLoading()

    try {
      const res = await axios.post('api/users/register', user)
      dispatch({ type: REGISTER_USER, payload: res.data })
      history.push('/login')
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data
      })
    }
    // loading
  }

  // Login User
  const loginUser = async userData => {
    try {
      const res = await axios.post('api/users/login', userData)
      // Save to localStorage
      const { token } = res.data
      // Set token to ls
      localStorage.setItem('jwtToken', token)
      // Set token to Autu header
      setAuthToken(token)
      // Decode token to get user data
      const decoded = jwt_decode(token)
      // Set current user
      setCurrentUser(decoded)
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data
      })
    }
  }

  // Set logged in user
  const setCurrentUser = decoded => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    })
  }

  // Log user out
  const logoutUser = () => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken')
    // Remove auth header for future request
    setAuthToken(false)
    // Set current user to {} which will set isAuthenticatred to false
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    })
  }

  return (
    <UsersContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        errors: state.errors,
        registerUser,
        loginUser,
        logoutUser
      }}
    >
      {props.children}
    </UsersContext.Provider>
  )
}

export default UsersState
