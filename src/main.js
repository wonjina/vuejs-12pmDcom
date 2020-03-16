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

/* eslint-disable no-new */
new Vue({
  router,
  store,
  beforeCreate () {
    console.log('main js : localStorage-')
    console.log(localStorage.getItem('isRequestedLogin'))
    if (localStorage.getItem('isRequestedLogin')) {
      console.log('main js : get!!')
      this.$store.dispatch('GET_USER_INFO')
    }
  },
  render: h => h(App)
}).$mount('#app')
