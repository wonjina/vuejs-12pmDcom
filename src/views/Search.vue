<template>
  <v-container fluid>
    <v-layout class="browser-height">
      <v-flex
        sm6
        xs12
        md6
        lg5
        class="scroll"
      >
        <material-card
          flat
          full-width
          paging-btn
          @update="updateData"
        >
          <div
            v-if="loading"
            class="loading"
          >
            Loading...
          </div>
          <div v-if="status">
            <Res-list
              link-btn
              :items="restaurantList"
            />    <!-- Add restaurant table.vue  -->
          </div>
        </material-card>
      </v-flex>
      <div class="custom-width">
        <google-map
          :restaurant-info="restaurantList"
        />  <!-- Add Map.vue -->
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import GoogleMap from '@/components/local/GoogleMap.vue'
import ResList from '@/components/local/list/RestaurantList.vue'
import { restful } from '../api'
import { urls } from '../api/requestUrl.js'

export default {
  components: {
    'google-map': GoogleMap,
    'Res-list': ResList
  },
  props: {
    keyword: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      restaurantList: [],
      resListLinks: [],
      loading: false,
      status: false
    }
  },
  created () {
    if (this.$route.query.restaurantName !== '' && this.$route.query.restaurantName !== undefined) {
      urls.restaurants.data.name = this.$route.query.restaurantName
    }
    this.loading = true
    this.fetchData()
    this.loading = false
    this.status = true
  },
  methods: {
    fetchData () {
      restful
        .fetch(urls.restaurants.method, urls.restaurants.path, urls.restaurants.data)
        .then(data => {
          console.log('res data ::!@#!@#')
          console.log(data)
          console.log(data.content)
          this.restaurantList = data.content
          this.resListLinks = data.links
        })
        .finally(() => {
          urls.restaurants.data.name = null
        })
    },
    updateData (link) {
      for (let i = 0; i < this.resListLinks.length; ++i) {
        if (this.resListLinks[i].rel === link) {
          restful
            .fetchWithoutData(urls.restaurants.method, this.resListLinks[i].href, '')
            .then(data => {
              this.restaurantList = data.content
              this.resListLinks = data.links
            })
          break
        }
      }
    }
  }
}
</script>

<style>
.mapouter {
  text-align:right;
  height:95%;
  width:100%;
  position: absolute;
}
.gmap_canvas {
  overflow:hidden;
  background:none!important;
  height:100%;
  width:100%;
}
.browser-height {
  height: 90vh;
}
.scroll {
  overflow:scroll;
}
.text-center {
  text-align: center!important;
}
.custom-width {
    width: 100%;
}
</style>
