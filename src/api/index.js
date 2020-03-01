import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:8080'
const UNAUTHORIZED = 401
const onUnauthrorized = () => {
  router.push('/')
}

const request = (method, url, data) => {
  console.log('axios->')
  console.log(data)
  return axios({
    method,
    url: DOMAIN + url,
    params: data
  }).then(result => result.data.response)
    .catch(result => {
      console.log('axios result = ')
      console.log(result)
      const status = result.response
      if (status === UNAUTHORIZED) {
        return onUnauthrorized()
      }
    })
}

export const restful = {
  fetch (method, url, data) {
    return request(method, url, data)
  }
}
