import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from './types'

import { backendAPI } from '../config/config'

const backendApi = `${backendAPI}/auth`

// Register User
export const registerUser = (userData, history) => dispatch => {
  return axios
    .post(`${backendApi}/signup`, userData)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS
      })
      history.push('/auth/login')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      if (err.response) {
        return err.response
      }
    })
}

// Login - Get User Token
export const loginUser = userData => dispatch => {
  return axios
    .post(`${backendApi}/login`, userData)
    .then(res => {
      // Save to localStorage
      const token = res.data.token
      // Set token to ls
      localStorage.setItem('hodJwtToken', token)
      // Set token to Auth header
      setAuthToken(token)
      // Decode token to get user data
      const decoded = jwt_decode(token)
      // Set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      if (err.response) {
        return err.response
      }
    })
}

//Update profile
export const updateProfile = (userData, history) => dispatch => {
  return axios
    .put(`${backendApi}/update`, userData)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS
      })
      history.push('/admin/profile')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      if (err.response) {
        return err.response
      }
    })
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken')
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
  //redirect user to login page
  window.location.href = '/auth/login'
}

export const postUpdateProfilePic = (profilePicBody, history) => dispatch => {
  return axios
    .post(`${backendApi}/updateprofilepic`, profilePicBody)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}
