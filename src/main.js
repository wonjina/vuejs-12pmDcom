// =========================================================
// * Vuetify Material Dashboard - v1.0.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licenses under MIT

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
import router from '@/router'
import store from '@/store'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueCookies from 'vue-cookies'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'

// Sync store with router
sync(store, router)

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAziq58SB1mhcBh6mffiuChyXWjKTcegWU',
    libraries: 'places'
  }
})
Vue.use(VueCookies)
Vue.use(VueMomentJS, moment)
/* eslint-disable no-new */
new Vue({
  router,
  store,
  beforeCreate () {
    if (localStorage.getItem('isRequestedLogin') === 'true') {
      this.$store.dispatch('GET_USER_INFO')
      localStorage.setItem('isRequestedLogin', false)
    } else if ((this.$store.state.userInfo === null || this.$store.state.userInfo === undefined) &&
                    sessionStorage.getItem('userInfo')) {
      this.$store.state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }
  },
  render: h => h(App)
}).$mount('#app')
