import React, { useReducer } from 'react'
import ProfileContext from './profileContext'
import profileReducer from './profileReducer'
import { useAlert } from 'react-alert'
import axios from 'axios'
import {
  GET_USER_PROFILE,
  GET_USER_LISTINGS,
  PROFILE_ERROR,
  UNSAVE_LISTING,
  PROFILE_LOADING,
  CLEAR_ERRORS,
  DELETE_LISTING
} from '../types'

const ProfileState = props => {
  const initialState = {
    userProfile: null,
    userListings: null,
    loading: null,
    errors: {}
  }

  const [state, dispatch] = useReducer(profileReducer, initialState)

  const alert = useAlert()

  // get user profile
  const getUserProfile = async () => {
    // TODO clearErrors()
    setProfileLoading()

    try {
      const res = await axios.get('/api/profile/')
      dispatch({ type: GET_USER_PROFILE, payload: res.data })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response.data
      })
    }
    // loading
  }

  // get user listings
  const getUserListings = async () => {
    // TODO clearErrors()
    // setProfileLoading()

    try {
      const res = await axios.get('/api/listings/user-listings/list')
      dispatch({ type: GET_USER_LISTINGS, payload: res.data })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response.data
      })
    }
    // loading
  }

  // create user profile
  const createUserProfile = async profile => {
    try {
      await axios.post('/api/profile', profile)
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response.data
      })
    }
  }

  // save listing to profile
  const saveListing = async listingid => {
    try {
      await axios.post(`/api/profile/save/${listingid}`)
      alert.success('listing saved')
    } catch (err) {
      alert.error(
        'you have already saved this listing or you are not signed in'
      )
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response.data
      })
    }
  }

  // unsave listing to profile
  // TODO REFLECT IN UI
  const unsaveListing = async listingid => {
    try {
      await axios.post(`/api/profile/unsave/${listingid}`)
      dispatch({
        type: UNSAVE_LISTING,
        payload: listingid
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response.data
      })
    }
  }
  // Delete listing WILL ALSO NEED TO BE CALLED IN LISTINGSTATE
  const deleteUserListing = id => {
    dispatch({ type: DELETE_LISTING, payload: id })
  }
  // Clear Profile
  const clearUserProfile = () => {
    dispatch({ type: GET_USER_PROFILE, payload: null })
  }

  // Set loading
  const setProfileLoading = () => {
    dispatch({ type: PROFILE_LOADING })
  }

  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS })
  }

  return (
    <ProfileContext.Provider
      value={{
        userProfile: state.userProfile,
        userListings: state.userListings,
        loading: state.loading,
        errors: state.errors,
        getUserProfile,
        getUserListings,
        createUserProfile,
        clearUserProfile,
        saveListing,
        unsaveListing,
        deleteUserListing,
        clearErrors
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  )
}

export default ProfileState
