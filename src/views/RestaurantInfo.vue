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
        <restaurant-detail-info
          :restaurant-info="restaurant"
        />  <!-- Add restaurant detail info vue -->
      </v-flex>
      <div class="custom-width">
        <google-map
          :restaurant-info="[ restaurant ]"
        />          <!-- Add Naver-map vue -->
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import GoogleMap from '@/components/local/GoogleMap.vue'
import RestaurantDetailInfo from '@/components/local/RestaurantDetailInfo.vue'
import { restful } from '../api'
import { urls } from '../api/requestUrl.js'

export default {
  components: {
    'google-map': GoogleMap,
    'restaurant-detail-info': RestaurantDetailInfo
  },
  data () {
    return {
      restaurant: {
        type: Object,
        default: []
      }
    }
  },
  created () {
    if (this.$route.params.restaurantInfo !== null && this.$route.params.restaurantInfo !== undefined) {
      this.restaurant = this.$route.params.restaurantInfo
    } else if (this.$route.params.id === undefined || this.$route.params.id === null) {
      this.$router.go(-1)
    } else {
      this.fetchData()
    }
  },
  methods: {
    fetchData () {
      restful
        .fetch(urls.restaurantInfo.method, urls.restaurantInfo.path + '/' + this.$route.params.id)
        .then(data => {
          console.log('res info->' + this.$route.params.id)
          console.log(data)
          this.restaurant = data
        })
        .finally(() => { })
    }
  }
}
</script>
<style>
.v-card-profile, .custom-grid-12{
  width: 100%;
}
.mapouter {
  text-align:right;
  height:100%;
  width:100%;
  position: absolute;
}
.gmap_canvas {
  overflow:hidden;
  background:none!important;
  height:100%;
  width:100%;
}
.content_align {
  line-height:130px;
}
.slick-slider {
  position: relative;
}
.scroll {
  overflow:scroll;
}
.browser-height {
  height: 90vh;
}
.custom-width {
    width: 100%;
}
</style>
