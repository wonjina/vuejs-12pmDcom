<template>
  <naver-maps
    class="custom-width"
    :map-options="mapOptions"
  >
    <naver-info-window
      class="info-window"
      :is-open="info"
      @load="onWindowLoad"
    >
      <div class="info-window-container">
        <h1>
          Test
        </h1>
      </div>
    </naver-info-window>
    <naver-marker
      v-for="(link, index) in links"
      :key="link.name+index"
      :lat="link.lat"
      :lng="link.lng"
      @click="onMarkerClicked"
      @load="onMarkerLoaded"
    />
  </naver-maps>
</template>

<script>
export default {
  data () {
    return {
      links: [
        {
          lat: 37.001,
          lng: 127
        },
        {
          lat: 37.05,
          lng: 127
        },
        {
          lat: 37.1,
          lng: 127
        }
      ],
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
      vue.marker.setDraggable(false).setCursor('aa').setClickable(true).setAnimation('BOUNCE')
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
