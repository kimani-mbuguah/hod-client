import axios from 'axios'
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_FUNDS_DATA,
  GET_FUNDS_LIST
} from './types'

import { backendAPI } from '../config/config'

const backendApi = `${backendAPI}/money`

export const postFundsIn = (fundsInData, history) => dispatch => {
  return axios
    .post(`${backendApi}/in`, fundsInData)
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: CLEAR_ERRORS
        })
      } else if (res.status == 401) {
        history.push('/auth/login')
      }

      return res
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

export const postFundsOut = (fundsOutData, history) => dispatch => {
  return axios
    .post(`${backendApi}/out`, fundsOutData)
    .then(res => {
      if (res.status == 200) {
        dispatch({
          type: CLEAR_ERRORS
        })
      } else if (res.status == 401) {
        history.push('/auth/login')
      }

      return res
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

export const getFundsData = history => dispatch => {
  return axios
    .get(`${backendApi}/data`)
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: GET_FUNDS_DATA,
          payload: res.data
        })
      } else {
        history.push('/auth/login')
      }
    })
    .catch(err => {
      history.push('/auth/login')
    })
}

export const getFundsList = history => dispatch => {
  return axios
    .get(`${backendApi}/list`)
    .then(res => {
      console.log(res.data)
      if (res.status === 200) {
        if (res.status == 200) {
          dispatch({
            type: GET_FUNDS_LIST,
            payload: res.data
          })
        } else if (res.status == 403) {
          history.push('/admin/dashboard')
        }
      } else {
        history.push('/auth/login')
      }
    })
    .catch(err => {
      history.push('/auth/login')
    })
}
