import axios from 'axios'
import router from '../router'
import store from '@/store'
import swal from 'sweetalert'

const DOMAIN = 'http://localhost:9194'
const UNAUTHORIZED = 401
const NOT_FOUND = 404
const FOUND = 302
const PRECONDITION_FAILED = 412

/** Exception Handler */
const onUnauthrorized = () => {
  store.state.userInfo = null
  console.log('catch 401!' + store.state.userInfo)
}
const onRedirect = (redirectUri) => {
  window.location.href = redirectUri
}
const onNotFound = () => { router.push({ name: 'main' }) }
const onPreconditionFaild = () => {
  swal({
    title: '취소되었습니다.',
    icon: 'success'
  })
    .then(() => {
      location.href = '/userRecord'
    })
}

/** Get Request */
const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    params: data,
    withCredentials: true
  }).then(result => {
    console.log(method + url + ' axios result : ')
    console.log(result)
    console.log(typeof result)
    console.log(result.data)
    console.log(typeof result.data)
    console.log(result.data.response)
    console.log(typeof result.data.response)
    console.log(result.data.response.content)
    console.log(typeof result.data.response.content)
    console.log(result.data.response.content[0])
    console.log(typeof result.data.response.content[0])
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
      } else if (status === PRECONDITION_FAILED) {
        return onPreconditionFaild()
      } else {
        console.log('error->' + status)
        return onNotFound()
      }
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
        console.log('error->' + status)
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

export const restful = {
  fetch (method, url, data) {
    return request(method, url, data)
  },
  dataFetch (method, url, data) {
    return requestData(method, url, data)
  },
  fetchWithoutData (method, url, data) {
    return requestNoData(method, url, data)
  }
}
