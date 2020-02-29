/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

import { Provider } from 'react-redux'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'

import AuthLayout from 'layouts/Auth.jsx'
import AdminLayout from 'layouts/Admin.jsx'

import 'assets/scss/material-dashboard-pro-react.scss?v=1.7.0'

import store from './store'

const hist = createBrowserHistory()

// Check for token
if (localStorage.hodJwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.hodJwtToken)
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.hodJwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())
    // Clear current Profile
    store.dispatch(clearCurrentProfile())
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/auth" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Redirect from="/" to="/auth/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
