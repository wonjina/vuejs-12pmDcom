import axios from 'axios'

/** 수정후 */
/** Get Request */
const getRequest = (method, url, data) => {
  console.log('axios->')
  console.log(url)
  console.log(data)
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

axios.defaults.withCredentials = true

export const restful = {
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
