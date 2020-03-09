// https://vuex.vuejs.org/en/getters.html

export default {
  isAuth (state) {
    return !state.userInfo
  }
}
