import React, { useReducer } from 'react'
import ListingsContext from './listingsContext'
import listingsReducer from './listingsReducer'
import axios from 'axios'
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
  CLEAR_LISTING,
  LISTING_ERROR,
  LISTING_LOADING,
  CLEAR_ERRORS
} from '../types'

const ListingsState = props => {
  const initialState = {
    listings: null,
    current: null,
    filtered: null,
    currentSearch: '',
    listing: null,
    errors: {},
    loading: false,
    addedId: null
  }

  const [state, dispatch] = useReducer(listingsReducer, initialState)
  // Get Test Listings
  const getListings = async () => {
    setListingLoading()
    try {
      const res = await axios.get('/api/listings')

      dispatch({ type: GET_LISTINGS, payload: res.data })
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.data
      })
    }
  }

  // Add Listing
  const addListing = async listing => {
    clearErrors()
    setListingLoading()

    try {
      const res = await axios.post('/api/listings', listing)
      dispatch({ type: ADD_LISTING, payload: res.data })
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.data
      })
    }
    // loading
  }

  // Delete Listing
  const deleteListing = async id => {
    if (window.confirm('Are you sure? This can Not be undone!')) {
      try {
        await axios.delete(`/api/listings/${id}`)
        dispatch({ type: DELETE_LISTING, payload: id })
      } catch (err) {
        dispatch({
          type: LISTING_ERROR,
          payload: err.response.data
        })
      }
    }
  }

  // Set Current Listing
  const setCurrent = listing => {
    dispatch({ type: SET_CURRENT, payload: listing })
  }

  // Clear Current Listing
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Update Listing
  const updateListing = async listing => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.put(
        `/api/listings/${listing._id}`,
        listing,
        config
      )

      dispatch({
        type: UPDATE_LISTING,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response
      })
    }
  }

  // Get single listing
  const getListing = async id => {
    try {
      const res = await axios.get(`/api/listings/${id}`)
      dispatch({ type: GET_LISTING, payload: res.data })
      clearCurrent()
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.data.errors
      })
    }
  }

  // // Update Listing
  // const updateListing = listing => {
  //   dispatch({ type: UPDATE_LISTING, payload: listing })
  // }
  // Filter Listing
  const filterListings = text => {
    dispatch({ type: FILTER_LISTINGS, payload: text })
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  // Set current search
  const setCurrentSearch = search => {
    dispatch({ type: SET_CURRENT_SEARCH, payload: search })
  }

  // Clear single listing
  const clearListing = () => {
    dispatch({ type: CLEAR_LISTING })
  }
  // Set loading
  const setListingLoading = () => {
    dispatch({ type: LISTING_LOADING })
  }
  // Clear errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS })
  }

  // Add Image
  const addImage = async (img, id) => {
    // clearErrors()
    // setListingLoading()
    try {
      const res = await axios.post(`/api/files/listings/${id}`, img)
      // dispatch({ type: ADD_LISTING, payload: res.data })
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.data
      })
    }
    // loading
  }

  return (
    <ListingsContext.Provider
      value={{
        listings: state.listings,
        listing: state.listing,
        current: state.current,
        testListings: state.testListings,
        filtered: state.filtered,
        currentSearch: state.currentSearch,
        errors: state.errors,
        loading: state.loading,
        submitted: state.submitted,
        addedId: state.addedId,
        addListing,
        deleteListing,
        setCurrent,
        clearCurrent,
        updateListing,
        getListings,
        getListing,
        filterListings,
        clearFilter,
        setCurrentSearch,
        clearListing,
        addImage
      }}
    >
      {props.children}
    </ListingsContext.Provider>
  )
}

export default ListingsState
