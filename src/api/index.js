import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://api.12pm.com:9194'
const UNAUTHORIZED = 401
const NOT_FOUND = 404
const FOUND = 302
const onUnauthrorized = ({ state }) => {
  // delete localStorage.userInfo
  state.userInfo = null
  router.push({ name: 'main' })
}
const onRedirect = (redirectUri) => {
  window.location.href = redirectUri
}
const onNotFound = () => { router.push({ name: 'main' }) }

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    params: data,
    withCredentials: true
  }).then(result => {
    console.log(method + url + ' axios result : ')
    console.log(result)
    return result.data.response
  })
    .catch(result => {
      console.log(method + url + ' axios catch = ')
      console.log(result)
      const status = result.response.data.code
      if (status === UNAUTHORIZED) {
        return onUnauthrorized()
      } else if (status === FOUND) {
        return onRedirect(result.response.data.message)
      } else if (status === NOT_FOUND) {
        return onNotFound()
      } else {
        console.log('error->' + status)
        return onNotFound()
      }
    })
}

const requestData = (method, url, data) => {
  console.log('axios->')
  console.log(data)
  return axios({
    method,
    url: DOMAIN + url,
    data: data
  }).then(result => result.data.response)
    .catch(result => {
      console.log('axios catch = ')
      console.log(result)
      console.log(result.response)
      const status = result.response.data.code
      if (status === UNAUTHORIZED) {
        return onUnauthrorized()
      } else if (status === FOUND) {
        return onRedirect(result.response.data.message)
      } else {
        console.log('error->' + status)
      }
    })
}

export const restful = {
  fetch (method, url, data) {
    return request(method, url, data)
  },
  dataFetch (method, url, data) {
    return requestData(method, url, data)
  }
}
