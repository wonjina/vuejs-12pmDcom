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
        <naver-map
          :restaurant-info="[ restaurant ]"
        />          <!-- Add Naver-map vue -->
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import NaverMap from '@/components/local/GoogleMap.vue'
import RestaurantDetailInfo from '@/components/local/RestaurantDetailInfo.vue'

export default {
  components: {
    'naver-map': NaverMap,
    'restaurant-detail-info': RestaurantDetailInfo
  },
  data () {
    return {
      restaurant: {
        type: Array,
        default: []
      }
    }
  },
  created () {
    this.restaurant = this.$route.params.restaurantInfo
    console.log('res Info page->' + typeof this.restaurant)
    console.log(this.restaurant)
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
