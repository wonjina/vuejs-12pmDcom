<template>
  <GmapMap
    :options="mapOptions"
    :center="{lat:37, lng:127}"
    :zoom="14"
    map-type-id="terrain"
    class="custom-width"
  >
    <GmapMarker
      v-for="(restaurant, index) in restaurantInfo"
      :key="restaurant.name+index"
      :position="{lat:restaurant.location_x, lng:restaurant.location_y}"
      :clickable="true"
      :draggable="true"
    />
  </GmapMap>
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
      mapOptions: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      }
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
  }
}
</script>
<style>
.custom-width {
  height: 100%;
  width: 100%;
}
</style>
