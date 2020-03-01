<template>
  <v-container fluid>
    <v-layout class="browser-height">
      <material-card
        flat
        full-width
        paging-btn
      >
        <div
          v-if="loading"
          class="loading"
        >
          Loading...
        </div>
        <div v-if="status">
          <Restaurant-list
            link-btn
            :items="restaurantList"
          />    <!-- Add restaurant table.vue  -->
        </div>
      </material-card>
      <div class="custom-width">
        <naver-map
          :restaurant-info="restaurantList"
        />  <!-- Add Map.vue -->
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import NaverMap from '@/components/local/NaverMap.vue'
import RestaurantList from '@/components/local/list/RestaurantList.vue'
import { restful } from '../api'
import { urls } from '../api/requestUrl.js'
export default {
  components: {
    'naver-map': NaverMap,
    'Restaurant-list': RestaurantList
  },
  props: {
    keyword: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      restaurantList: {
        type: Array,
        default: []
      },
      loading: false,
      status: false
    }
  },
  created () {
    if (this.$route.query.restaurantName !== '' && this.$route.query.restaurantName !== undefined) {
      urls.restaurantList.data.name = this.$route.query.restaurantName
    }
    if (this.$route.query.restaurantCategory !== '' && this.$route.query.restaurantCategory !== undefined) {
      urls.restaurantList.data.category = this.$route.query.restaurantCategory
    }
    this.loading = true
    this.fetchData()
    this.loading = false
    this.status = true
  },
  methods: {
    fetchData () {
      restful
        .fetch(urls.restaurantList.method, urls.restaurantList.path, urls.restaurantList.data)
        .then(data => {
          this.restaurantList = data
        })
        .finally(() => {
          urls.restaurantList.data.category = null
          urls.restaurantList.data.name = null
        })
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
