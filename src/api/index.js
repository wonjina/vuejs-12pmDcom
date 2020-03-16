import axios from 'axios'
import router from '../router'
import store from '@/store'

const DOMAIN = 'http://api.12pm.com:9194'
const UNAUTHORIZED = 401
const NOT_FOUND = 404
const FOUND = 302

/** Exception Handler */
const onUnauthrorized = () => {
  store.state.userInfo = null
}
const onRedirect = (redirectUri) => {
  window.location.href = redirectUri
}
const onNotFound = () => { router.push({ name: 'main' }) }

/** 수정후 */
/** Get Request */
const getRequest = (method, url, data) => {
  return axios({
    method,
    url: url,
    params: data,
    withCredentials: true
  })
}
const postRequest = (method, url, data) => {
  return axios({
    method,
    url: url,
    data: data,
    withCredentials: true
  })
}

/** 수정전 */
const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    params: data,
    withCredentials: true
  })
}

/** Post Request */
const requestData = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data: data,
    withCredentials: true
  }).then(result => result.data.response)
    .catch(result => {
      const status = result.response.data.code
      if (status === UNAUTHORIZED) {
        return onUnauthrorized()
      } else if (status === FOUND) {
        return onRedirect(result.response.data.message)
      } else {
      }
    })
}

/** No Paramer Request */
const requestNoData = (method, url, data) => {
  return axios({
    method,
    url: url,
    data: data,
    withCredentials: true
  }).then(result => {
    return result.data.response
  })
    .catch(result => {
      const status = result.response.data.code

      if (status === UNAUTHORIZED) {
        return onUnauthrorized()
      } else if (status === FOUND) {
        return onRedirect(result.response.data.message)
      } else if (status === NOT_FOUND) {
        return onNotFound()
      } else {
        return onNotFound()
      }
    })
}

axios.defaults.withCredentials = true

export const restful = {
  fetch (method, url, data) {
    return request(method, url, data)
  },
  dataFetch (method, url, data) {
    return requestData(method, url, data)
  },
  fetchWithoutData (method, url, data) {
    return requestNoData(method, url, data)
  },

  /**
 * 수정 된 axios
 */
  getRequest (method, url, data) {
    return getRequest(method, url, data)
  },
  postRequest (method, url, data) {
    return postRequest(method, url, data)
  }
}
