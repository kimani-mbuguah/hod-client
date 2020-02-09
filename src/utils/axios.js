// import axios from 'axios'

// export default axios.create({
//   baseURL: `http://localhost:5002`
// })

var axios = require('axios')

var axiosInstance = axios.create({
  baseURL: `http://localhost:5002`
  /* other custom settings */
})

module.exports = axiosInstance
