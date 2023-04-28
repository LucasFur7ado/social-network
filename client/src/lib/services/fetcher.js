import axios from 'axios'
import Cookies from 'js-cookie'

const apiUrl = 'http://localhost:5000'

const client = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
})

const getToken = () => {
  return Cookies.get('access-token') ?
    JSON.parse(Cookies.get('access-token')) : null
}

class Fetcher {
  static get(path = '') {
    return client({
      method: 'GET',
      url: path,
      headers: {
        authorization: `Bearer ` + getToken()
      }
    })
  }
  static post(path = '', data = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      headers: {
        authorization: 'Bearer ' + getToken()
      }
    })
  }
}

export { Fetcher }