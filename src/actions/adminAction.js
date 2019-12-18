import axios from "axios"
import { GET_ERRORS, GET_ADMINS, GET_ADMIN } from "./types"
const backendApi = "https://morning-forest-96780.herokuapp.com/admin"

//Get all admins
export const listAdmins = history => dispatch => {
  axios
    .get(`${backendApi}/list`)
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: GET_ADMINS,
          payload: res.data
        })
      } else if (res.status === 403) {
        history.push("/admin/dashboard")
      } else {
        history.push("/auth/login")
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ADMINS,
        payload: {}
      })
      history.push("/auth/login")
    })
}

// Get one admin
export const listAdmin = (email, history) => dispatch => {
  return axios
    .get(`${backendApi}/list/${email}`)
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: GET_ADMIN,
          payload: res.data.user
        })
        history.push("/admin/admin-profile")
      } else if (res.status === 403) {
        history.push("/admin/dashboard")
      } else {
        history.push("/auth/login")
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ADMIN,
        payload: null
      })
      history.push("/auth/login")
    })
}

export const getActiveUser = (email, history) => dispatch => {
  return axios
    .get(`${backendApi}/list/${email}`)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}
export const postUpdateAuth = (authBody, history) => dispatch => {
  return axios
    .post(`${backendApi}/updateauth`, authBody)
    .then(res => {
      if (res.status === 200) {
        return res
      } else if (res.status === 403) {
        history.push("/admin/dashboard")
      } else {
        history.push("/auth/login")
      }
    })
    .catch(err => {
      history.push("/auth/login")
    })
}
