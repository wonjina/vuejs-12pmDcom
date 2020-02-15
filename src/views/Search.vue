<template>
  <v-container fluid>
    <v-layout class="browser-height">
      <material-card
        flat
        full-width
        paging-btn
      >
        <table-list />    <!-- Add restaurant table.vue  -->
      </material-card>
      <div class="custom-width">
        <naver-map />  <!-- Add Map.vue -->
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import NaverMap from '@/components/local/NaverMap.vue'
import TableList from '@/components/local/list/TableList.vue'

export default {
  components: {
    'naver-map': NaverMap,
    'table-list': TableList
  },
  data () {
    return {
      page: 1
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
    width: 75%;
}
</style>
