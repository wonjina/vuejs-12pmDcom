// https://vuex.vuejs.org/en/actions.html

import { restful } from '../api'
import { urls } from '../api/requestUrl.js'

export default {
  GET_USER_INFO ({ state }) {
    return restful.getRequest(urls.hiworksUser.method, urls.DOMAIN + urls.hiworksUser.path)
      .then(result => {
        sessionStorage.setItem('userInfo', JSON.stringify(result.data.response))
        state.userInfo = result.data.response
        console.log('get user info')
        console.log(JSON.parse(sessionStorage.getItem('userInfo')))
        console.log(state.userInfo)
      }).catch(result => {
        sessionStorage.setItem('userInfo', null)
        state.userInfo = null
      })
  }
}
