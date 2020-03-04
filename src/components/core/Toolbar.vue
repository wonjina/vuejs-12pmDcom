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
        <v-text-field
          v-model="restaurantCategory"
          class="mr-4 purple-input"
          label="Category Search..."
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
          slot="activator"
          class="v-btn--simple"
          color="success"
          @click="moveLoginPage"
        >
          <v-icon color="tertiary">
            mdi-account
          </v-icon>
        </v-btn>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import {
  mapMutations
} from 'vuex'
import { urls } from '../../api/requestUrl.js'
import { restful } from '../../api'

export default {
  data: () => ({
    title: null,
    responsive: false,
    restaurantName: '',
    restaurantCategory: ''
  }),

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
      console.log('toobar page->')
      console.log(this.keyword)
      console.log(this.$route)
      console.log(this.$route.fullPath)
      console.log(this.restaurantName + this.restaurantCategory)
      this.$router.push({ name: 'SearchRestaurant', query: { restaurantName: this.restaurantName, restaurantCategory: this.restaurantCategory } })
    },
    moveLoginPage () {
      restful
        .fetch(urls.hiworksLogin.method, urls.hiworksLogin.path)
        .then(data => {
          console.log('hiworksLogin->')
          console.log(data)
          this.$router.push({ name: 'main' })
        })
        .finally(() => {
          urls.reviews.data.restaurantId = null
        })
    }
  }
}
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
