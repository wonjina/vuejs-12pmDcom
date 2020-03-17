<template>
  <v-toolbar
    id="core-toolbar"
    app
    flat
    prominent
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <v-text-field
          v-model="restaurantName"
          class="mr-4 purple-input"
          label="Restaurant Search..."
          hide-details
          color="purple"
          @keypress.enter="moveSearchPage"
        />
        <v-btn
          slot="activator"
          class="v-btn--simple"
          color="success"
          @click="moveSearchPage"
        >
          <v-icon color="primary">
            mdi-arrow-right
          </v-icon>
        </v-btn>
        <router-link
          v-ripple
          class="toolbar-items"
          to="/"
        >
          <v-icon color="tertiary">
            mdi-view-dashboard
          </v-icon>
        </router-link>
        <v-btn
          v-if="!userInfo"
          slot="activator"
          class="v-btn--simple"
          color="success"
          @click="moveLoginPage"
        >
          로그인
        </v-btn>
        <v-btn
          v-else
          slot="activator"
          class="v-btn--simple"
          color="success"
          @click.prevent="logoutAction"
        >
          로그아웃
        </v-btn>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import {
  mapMutations,
  mapState
} from 'vuex'
import { urls } from '../../api/requestUrl.js'

export default {
  data: () => ({
    title: null,
    responsive: false,
    restaurantName: '',
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ]
  }),
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  watch: {
    '$route' (val) {
      this.title = val.name
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  created () {
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    },
    moveSearchPage () {
      this.$router.push({ name: 'SearchRestaurant', query: { restaurantName: this.restaurantName } })
    },
    moveLoginPage () {
      console.log('toobar-')
      console.log(localStorage.getItem('isRequestedLogin'))
      localStorage.setItem('isRequestedLogin', true)
      console.log(localStorage.getItem('isRequestedLogin'))
      window.location.href = urls.hiworksLogin.path
    },
    logoutAction () {
      localStorage.setItem('isRequestedLogin', false)
      this.$store.commit('LOGOUT')
    }
  }
}
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
