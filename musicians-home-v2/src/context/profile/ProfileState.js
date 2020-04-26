import React, { useReducer } from 'react'
import ProfileContext from './profileContext'
import profileReducer from './profileReducer'
import axios from 'axios'
import {
  GET_USER_PROFILE,
  PROFILE_ERROR,
  UNSAVE_LISTING,
  PROFILE_LOADING
} from '../types'

const ProfileState = props => {
  const initialState = {
    userProfile: null,
    loading: null,
    errors: {}
  }

  const [state, dispatch] = useReducer(profileReducer, initialState)

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
    } catch (err) {
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
  // Clear Profile
  const clearUserProfile = () => {
    dispatch({ type: GET_USER_PROFILE, payload: null })
  }

  // Set loading
  const setProfileLoading = () => {
    dispatch({ type: PROFILE_LOADING })
  }

  return (
    <ProfileContext.Provider
      value={{
        userProfile: state.userProfile,
        loading: state.loading,
        errors: state.errors,
        getUserProfile,
        createUserProfile,
        clearUserProfile,
        saveListing,
        unsaveListing
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  )
}

export default ProfileState
