<template>
  <div class="custom-width">
    <naver-maps
      :height="900"
      :map-options="mapOptions"
    >
      <naver-marker
        id="maker"
        :lat="37"
        :lng="127"
        @click="onMarkerClicked"
        @load="onMarkerLoaded"
      />
      <naver-info-window
        class="info-window"
        :marker="marker"
        :is-open="info"
        @load="onWindowLoad"
      >
        <div class="info-window-container">
          <h1>
            Test
          </h1>
        </div>
      </naver-info-window>
    </naver-maps>
  </div>
</template>

<script>
export default {
  data () {
    return {
      info: true,
      mapOptions: {
        lat: 37,
        lng: 127,
        zoom: 12,
        zoomControl: true,
        zoomControlOptions: { position: 'TOP_RIGHT' },
        mapTypeControl: true
      }
    }
  },
  computed: {
  },
  mounted () {
    setInterval(() => this.count++, 1000)
  },
  methods: {
    onMarkerLoaded (vue) {
      vue.marker.setDraggable(true).setCursor('').setClickable(true)
    },
    onMarkerClicked (event) {
      console.log(event)
    },
    onLoad (vue) {
    },
    onWindowLoad (that) {
    }
  }
}
</script>
<style scoped>
.custom-width {
    width: 75%;
}
.info-window-container {
    padding: 10px;
    width: 300px;
    height: 100px;
}
</style>
