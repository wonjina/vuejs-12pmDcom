<template>
  <naver-maps
    class="custom-width"
    :map-options="mapOptions"
  >
    <naver-marker
      v-for="(restaurant, index) in restaurantInfo"
      :key="restaurant.name+index"
      :lat="restaurant.location_x"
      :lng="restaurant.location_y"
      @click="onMarkerClicked"
      @load="onMarkerLoaded"
    />
  </naver-maps>
</template>

<script>
export default {
  props: {
    restaurantInfo: {
      type: Array,
      default: () => [0]
    }
  },
  data () {
    return {
      info: true,
      mapOptions: {
        lat: 37,
        lng: 127,
        zoom: 12,
        zoomControlOptions: { position: 'TOP_RIGHT' },
        mapTypeControl: true
      }
    }
  },
  computed: {
  },
  created () {
    console.log('naver map::' + typeof this.restaurantInfo)
    console.log(this.restaurantInfo)
  },
  methods: {
    onMarkerLoaded (vue) {
    },
    onMarkerClicked (event) {
    },
    onLoad (vue) {
    },
    onWindowLoad (that) {
    }
  }
}
</script>
<style>
.info-window-container {
    padding: 10px;
    width: 300px;
    height: 100px;
}
.custom-width {
  height: 100%;
  width: 100%;
}
</style>
