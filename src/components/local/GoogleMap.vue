<template>
  <GmapMap
    :options="mapOptions"
    :center="center"
    :zoom="17"
    map-type-id="roadmap"
    class="custom-width"
  >
    <GmapMarker
      v-for="(restaurant, index) in restaurantInfo"
      :key="restaurant.name+index"
      :position="{lat:restaurant.location_x, lng:restaurant.location_y}"
      :clickable="true"
      :draggable="true"
      @mouseover="toggleInfoWindow(restaurant,index)"
      @mouseout="infoWinOpen=false"
    />
    <GmapInfoWindow
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen=false"
    >
      <material-card class="v-card-profile">
        <v-flex>
          <h4>{{ infoContent.name }}</h4>
        </v-flex>
        <v-card-text>
          <h4 class="card-title font-weight-light">
            {{ infoContent.load_address }}
          </h4>
          <h6>평점 : {{ infoContent.rating }}</h6>
        </v-card-text>
      </material-card>
    </GmapInfoWindow>
  </GmapMap>
</template>

<script>
export default {
  props: {
    restaurantInfo: {
      type: Array,
      default: null
    },
    infoWindowIndex: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      mapOptions: {
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      },
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      center: {
        lat: 37.394955,
        lng: 127.111196
      }
    }
  },
  watch: {
    infoWindowIndex: function (val) {
      if (val === null || val === undefined) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.toggleInfoWindow(val, val.restaurant_id)
      }
    }
  },
  created () {
  },
  methods: {
    toggleInfoWindow: function (restaurantMarker, idx) {
      this.infoWindowPos.lat = restaurantMarker.location_x
      this.infoWindowPos.lng = restaurantMarker.location_y
      this.center.lat = restaurantMarker.location_x
      this.center.lng = restaurantMarker.location_y
      this.infoContent = restaurantMarker
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    }
  }
}
</script>
<style>

.custom-width {
  height: 100%;
  width: 100%;
}
</style>
