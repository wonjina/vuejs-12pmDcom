<template>
  <v-container fluid>
    <v-layout>
      <v-flex
        sm6
        xs12
        md6
        lg5
        class="scroll"
      >
        <restaurant-detail-info />  <!-- Add restaurant detail info vue -->
      </v-flex>
      <div class="custom-width">
        <naver-map />          <!-- Add Naver-map vue -->
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import NaverMap from '@/components/local/NaverMap.vue'
import RestaurantDetailInfo from '@/components/local/RestaurantDetailInfo.vue'

// position: relative;
export default {
  components: {
    'naver-map': NaverMap,
    'restaurant-detail-info': RestaurantDetailInfo
  },
  data: () => ({
    settings: [
      {
        'centerMode': true,
        'centerPadding': '20px',
        'focusOnSelect': true,
        'infinite': true,
        'slidesToShow': 3,
        'speed': 500
      }
    ]
  })
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
    width: 75%;
}
</style>
