<template>
  <v-flex>
    <v-layout class="custom-margin">
      <v-flex
        class="custom-padding"
        sm6
        xs12
        md6
        lg4
      >
        <material-card
          :active-class="color"
          flat
          full-width
          refresh
          title="Top Review 5"
          @fetchData="fetchData"
        >
          <div
            v-if="loading"
            class="loading"
          >
            Loading...
          </div>
          <div v-if="status">
            <restaurant-list
              link-btn
              :items="restaurants"
            />    <!-- Add restaurant table.vue -->
          </div>
        </material-card>
      </v-flex>
      <v-flex
        class="custom-padding"
        sm6
        xs12
        md6
        lg4
      >
        <material-card
          :active-class="color"
          flat
          full-width
          refresh
          title="Top Review 5"
          @fetchData="fetchData"
        >
          <div
            v-if="loading"
            class="loading"
          >
            Loading...
          </div>
          <div v-if="status">
            <restaurant-list
              link-btn
              :items="restaurants"
            />    <!-- Add restaurant table.vue -->
          </div>
        </material-card>
      </v-flex>
      <v-flex
        class="custom-padding"
        sm6
        xs12
        md6
        lg4
      >
        <material-card
          :active-class="color"
          flat
          title="Top Review 5"
        />
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
import RestaurantList from '@/components/local/list/RestaurantList.vue'
import { restful } from '../../../api'
import { urls } from '../../../api/requestUrl.js'
import {
  mapState
} from 'vuex'
export default {
  components: {
    'restaurant-list': RestaurantList
  },
  data () {
    return {
      restaurants: {
        type: Array,
        default: []
      },
      loading: false,
      status: false
    }
  },
  computed: {
    ...mapState('app', ['color']),
    color () {
      return this.$store.state.app.color
    }
  },
  created () {
    this.loading = true
    this.fetchData()
    this.loading = false
    this.status = true
  },
  methods: {
    fetchData () {
      console.log('fetchData start...')
      restful
        .fetch(urls.restaurantList.method, urls.restaurantList.path, null)
        .then(data => {
          console.log('mainpage ->')
          console.log(data)
          this.restaurants = data
          console.log(typeof this.restaurants)
          console.log(this.restaurants)
        })
        .finally(() => { })
    }
  }
}
</script>
<style>
.custom-margin {
    margin: 35px!important;
}
</style>
