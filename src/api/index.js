import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:9194'
const UNAUTHORIZED = 401
const FOUND = 302
const onUnauthrorized = () => {
  router.push({ name: 'main' })
}
const onRedirect = (redirectUri) => {
  window.location.href = redirectUri
}

const request = (method, url, data) => {
  console.log('axios->')
  console.log(data)
  return axios({
    method,
    url: DOMAIN + url,
    params: data
  }).then(result => {
    console.log('Get header : ')
    console.log(result)
    return result.data.response
  })
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
  }
}
