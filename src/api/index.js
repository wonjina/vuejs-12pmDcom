import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:8080'
const UNAUTHORIZED = 401
const onUnauthrorized = () => {
  router.push('/')
}

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data
  }).then(result => result.data.response)
    .catch(result => {
      console.log(result)
      const { status } = result.response
      if (status === UNAUTHORIZED) {
        return onUnauthrorized()
      }
    })
}

export const restful = {
  fetch (method, url) {
    return request(method, url)
  }
}
