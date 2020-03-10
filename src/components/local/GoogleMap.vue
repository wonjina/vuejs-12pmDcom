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
      @click="toggleInfoWindow(restaurant,index)"
    />
    <GmapInfoWindow
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen=false"
    >
      <material-card class="v-card-profile">
        <v-flex>
          <h2>{{ infoContent.name }}</h2>
        </v-flex>
        <v-card-text>
          <h4 class="card-title font-weight-light">
            {{ infoContent.load_address }}
          </h4>
          <p class="card-description font-weight-light">
            <span>평점 : {{ infoContent.rating }}</span>
          </p>
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
      }
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos.lat = marker.location_x
      this.infoWindowPos.lng = marker.location_y
      this.infoContent = marker
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
