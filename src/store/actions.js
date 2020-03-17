// https://vuex.vuejs.org/en/actions.html

import { restful } from '../api'
import { urls } from '../api/requestUrl.js'

export default {
  GET_USER_INFO ({ state }) {
    return restful.getRequest(urls.hiworksUser.method, urls.DOMAIN + urls.hiworksUser.path)
      .then(result => {
        state.userInfo = result.data.response
      }).catch(result => {
      })
  //  return restful
  //    .fetch(urls.hiworksUser.method, urls.hiworksUser.path)
  //    .then(data => {
  //      state.userInfo = data
  // localStorage.setItem('userInfo', data)
  // onsole.log(localStorage.getItem('userInfo'))
  //    })
  //    .finally(() => { })
  }
}
