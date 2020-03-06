import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://api.12pm.com:9194'
const UNAUTHORIZED = 401
const FOUND = 302
const onUnauthrorized = () => {
  router.push({ name: 'main' })
}
const onRedirect = (redirectUri) => {
  window.location.href = redirectUri
}

const request = (method, url, data) => {
  console.log('axios->' + url)
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
      } else {
        console.log('error->' + status)
      }
    })
}

export const restful = {
  fetch (method, url, data) {
    return request(method, url, data)
  }
}
